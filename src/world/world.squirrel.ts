import * as Matter from "matter-js"

import ISceneNode from "../scene/scene.i-scene-node"
import IWorkerNode from "../scene/scene.i-worker-node"
import IPhysicsNode from "../scene/scene.i-physics-node"

import ISceneWorker from "../scene/worker/scene.worker.i-scene-worker"
import AnimateTextureWorker from "../scene/worker/scene.worker.animate-texture"
import MovementControlWorker from "../scene/worker/scene.worker.movement-control"
import UpdatePhysicsSceneWorker from "../scene/worker/scene.worker.update-physics-scene"

import TextureSwitcher from "../render/render.texture-switcher"
import TextureAnimator from "../render/render.texture-animator"

import ResourceManager from "../meta/meta.resource-manager"
import { ResourceType } from "../meta/meta.consts"

import ControlState from "../game/game.control-state"

import InputManager from "../game/game.input-manager"

/**
 * The core game actor class.
 * 
 */
class Squirrel 
    implements ISceneNode, IWorkerNode, IPhysicsNode
{
    private _sceneNode : THREE.Object3D;
    private _textureSwitcher : TextureSwitcher;

    // IWorkerNode.workers
    workers : Array<ISceneWorker> = [];

    // IPhysicsNode.physicsBody
    physicsBody : Matter.Body;

    constructor () {
        this._buildSceneNode();
    }

    private _buildSceneNode () {
        this._sceneNode = new THREE.Group();

        var sprite = new THREE.Sprite(new THREE.SpriteMaterial({
            color: 0xffffff
        }));
        sprite.scale.set(80, 80, 1);
        sprite.position.y = 30;

        var collisionGeom = new THREE.PlaneGeometry(15, 20);
        var collisionGuide = new THREE.Mesh(collisionGeom, new THREE.MeshBasicMaterial({
                color: 0x555555,
                side: THREE.DoubleSide
            }
        ));
        

        this._sceneNode.position.y = 10;
        this.physicsBody = Matter.Bodies.rectangle(0, 0, 15, 20, {isStatic: false, inertia: Infinity, density: 0.05});
        
        this._textureSwitcher = new TextureSwitcher(sprite);

        ResourceManager.getRepository(ResourceType.texture)
            .require([
                "assets/squirrel_idle.png",
                "assets/squirrel_run.png",
                "assets/squirrel_fly.png",
            ])
            .then(([idle, run, fly]) => {
                let idleTexture : THREE.Texture = idle.value;
                let runTexture : THREE.Texture = run.value;
                let flyTexture : THREE.Texture = fly.value;

                // Nearest for subsampling pixel-graphics. TODO: default in loader?
                idleTexture.magFilter = THREE.NearestFilter;
                runTexture.magFilter = THREE.NearestFilter;
                flyTexture.magFilter = THREE.NearestFilter;

                // Create an animator to work with the textures.
                var idleAnimator = new TextureAnimator(idleTexture, 1, Infinity);
                var runAnimator = new TextureAnimator(runTexture, 5, 0.06);
                var flyAnimator = new TextureAnimator(flyTexture, 1, Infinity);

                // Register the animations with the texture switcher.
                // TODO: action names could be done with enums?
                this._textureSwitcher.addTexture("idle", idleAnimator);
                this._textureSwitcher.addTexture("run", runAnimator);
                this._textureSwitcher.addTexture("fly", flyAnimator);

                // Start on idle animation.
                this._textureSwitcher.switchTexture("idle");

                // Add a scene worker to run the animation and update every frame.
                this.workers.push(new AnimateTextureWorker(runAnimator));
                // Add a scene worker to control the movement of the player based on the changing input state.
                this.workers.push(new MovementControlWorker(this, InputManager.playerControlState, this._textureSwitcher));
                this.workers.push(UpdatePhysicsSceneWorker.fromSceneNode(this));

                // Push the sprite as a child of this ISceneNode.
                this._sceneNode.add(sprite);
                //this._sceneNode.add(collisionGuide);
            });
    }

    getNode () {
        return this._sceneNode;
    }
}

export default Squirrel;
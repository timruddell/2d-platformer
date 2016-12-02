import * as Matter from "matter-js"

import { View } from "../render/render.consts"

import IWorkerNode from "../scene/scene.i-worker-node"
import Squirrel from "../world/world.squirrel"

import UpdatePhysicsSceneWorker from "./worker/scene.worker.update-physics-scene"


/**
 * Singleton - manages the game scenes.
 * 
 */
class SceneManager {

    physicsEngine : Matter.Engine;

    private _scene : THREE.Scene;
    private _backgroundScene : THREE.Scene;

    private _workerNodes : Array<IWorkerNode> = [];

    constructor () {
        this.physicsEngine = Matter.Engine.create();
        this.physicsEngine.world.gravity.y *= -1;

        this._scene = new THREE.Scene();
        this._backgroundScene = new THREE.Scene();
    }

    get gameScene () {
        return this._scene;
    }

    get backgroundScene () {
        return this._backgroundScene;
    }

    runWorkers (delta : number) {

        this._workerNodes.forEach ( n => {
            n.workers.forEach ( w => w.update(delta) );
        });
    }

    initializeScene () {

        // Build the background scene. 45degree rectangle hills and trees.

        var hills = new THREE.Group(); 
        var trees = new THREE.Group(); 
        this._backgroundScene.add(new THREE.HemisphereLight(0xffffff, 0x303030, 0.5));
        this._backgroundScene.add(hills);
        this._backgroundScene.add(trees);

        var hillGeom = new THREE.PlaneGeometry(500, 500, 1, 1);
        var hill = new THREE.Mesh(hillGeom, new THREE.MeshBasicMaterial({
            color: 0x5a6757
        }));

        hill.rotateZ(0.79);
        hill.position.set(0, -200, -100);

        for (let i = -(View.width); i <= View.width; ) {
            let t = hill.clone();

            var height = 30 + 200*Math.random();

            t.position.x = i;
            t.position.y += height;
            hills.add(t);

            i = i += Math.random() * 350 + 50;
        }

        var treeGeom = new THREE.PlaneGeometry(500, 500, 1, 1);
        var tree = new THREE.Mesh(treeGeom, new THREE.MeshBasicMaterial({
            color: 0x415e3b
        }));

        tree.rotateZ(0.79);
        tree.position.set(0, -500, -95);

        trees.scale.x = 0.55;

        for (let i = -(View.width); i <= View.width; i+=200) {
            let t = tree.clone();

            var height = 30 + 200*Math.random();

            t.position.x = i;
            t.position.y += height;

            trees.add(t);
        }


        // Build the game scene, a simple platform and some other physics objects.

        var platformBody = Matter.Bodies.rectangle(0, -50, 500, 20, {isStatic: true});

        var platformGeom = new THREE.PlaneGeometry(500, 20);
        var platform = new THREE.Mesh(platformGeom, new THREE.MeshBasicMaterial({
                color: 0x5f574c
            }
        ));


        platform.position.y = -50;

        this._scene.add(new THREE.HemisphereLight(0xffffff, 0x303030, 10));
        this._scene.add(platform);

        var player = new Squirrel();
        this._scene.add(player.getNode());
        this._workerNodes.push(player);

        let bodies : Array<Matter.Body> = [];
        // A few world items to jump on and push around.
        for (let i = -200; i <= 200; i += 100) {
            if (i === 0) continue;

            // TODO: temp block to push around.
            var geom = new THREE.CircleGeometry(25, 50);
            var item = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
                    color: 0x770000
                }
            ));

            var body = Matter.Bodies.circle(i, 350, 25, {restitution: 0.3, inertia: Infinity, density: 0.4});
            player.workers.push(new UpdatePhysicsSceneWorker(item, body));
            this._scene.add(item);
            bodies.push(body);
        }

        Matter.World.add(this.physicsEngine.world, [...bodies, platformBody, player.physicsBody]);
        Matter.Engine.run(this.physicsEngine);
    }
}

let singleton = new SceneManager();
export default singleton;
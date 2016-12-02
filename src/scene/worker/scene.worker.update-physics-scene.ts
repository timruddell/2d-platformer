import * as Matter from "matter-js"

import ISceneWorker from "./scene.worker.i-scene-worker"
import ISceneNode from "../scene.i-scene-node"
import IPhysicsNode from "../scene.i-physics-node"

/**
 * Handles updating the scene from the physics simulation.
 * 
 */
class UpdatePhysicsSceneWorker 
    implements ISceneWorker 
{
    private _sceneObject : THREE.Object3D;
    private _physicsBody : Matter.Body;

    constructor (object : THREE.Object3D, body : Matter.Body) {
        this._sceneObject = object;
        this._physicsBody = body;
    }

    static fromSceneNode (node : ISceneNode & IPhysicsNode) {
        return new UpdatePhysicsSceneWorker(node.getNode(), node.physicsBody);
    }

    update (delta : number) {
        var physBody = this._physicsBody;
        var sceneNode = this._sceneObject;

        sceneNode.position.set(physBody.position.x, physBody.position.y, sceneNode.position.z);
    }
}

export default UpdatePhysicsSceneWorker;
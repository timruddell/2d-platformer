import ISceneWorker from "./scene.worker.i-scene-worker"
import ISceneNode from "../scene.i-scene-node"
import IPhysicsNode from "../scene.i-physics-node"

import ControlState from "../../game/game.control-state"
import TextureSwitcher from "../../render/render.texture-switcher"

/**
 * Handles movement in scene from updates to control state.
 * 
 *  - Currently also handles texture switching
 * 
 */
class MovementControlWorker
    implements ISceneWorker
{
    private _node : ISceneNode & IPhysicsNode;
    private _state : ControlState;
    private _textureSwitcher : TextureSwitcher;

    constructor (node : ISceneNode & IPhysicsNode, state : ControlState, textureSwitcher : TextureSwitcher) {
        this._node = node;
        this._state = state;
        this._textureSwitcher = textureSwitcher;
    }

    update (delta : number) {
        const speed = 1 * delta;
        const airSpeed = 0.1 * delta;

        var actualSpeed = speed;
        
        var node = this._node.getNode();
        var physBody = this._node.physicsBody;

        var isAirborne = Math.abs(physBody.velocity.y) > 0.0001;

        if (isAirborne) {
            actualSpeed = airSpeed;
        }

        if (this._textureSwitcher) {
            if (isAirborne) {
                this._textureSwitcher.switchTexture("fly");
            } else if (this._state.isMoving) {
                this._textureSwitcher.switchTexture("run");
            } else {
                this._textureSwitcher.switchTexture("idle");
            }
        }

        if (!isAirborne && this._state.isJumping) {
            physBody.force.y = 0.35;
        }
        
        if (this._state.isMovingLeft) {
            this._node.physicsBody.force.x += -actualSpeed;
            node.scale.x = -Math.abs(node.scale.x);
        } else if (this._state.isMovingRight) {
            this._node.physicsBody.force.x += actualSpeed;
            node.scale.x = Math.abs(node.scale.x);
        }
    }
}

export default MovementControlWorker;
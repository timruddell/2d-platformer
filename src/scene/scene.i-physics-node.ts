import * as Matter from "matter-js"

/**
 * Defines a node that represents a physical body.
 * 
 */
interface IPhysicsNode {
    physicsBody : Matter.Body;
}

export default IPhysicsNode;
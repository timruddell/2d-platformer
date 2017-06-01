import * as THREE from "three"

/**
 * Defines a node that can be involved in a game scene.
 * 
 */
interface ISceneNode {
    getNode () : THREE.Object3D;
}

export default ISceneNode;
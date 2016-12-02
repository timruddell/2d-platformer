import ISceneWorker from "./worker/scene.worker.i-scene-worker"

/**
 * Defines a node that should be updated when participating in a game scene. 
 * 
 */
interface IWorkerNode {
    workers : Array<ISceneWorker>;
}

export default IWorkerNode;
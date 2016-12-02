/**
 * Defines a worker that updates its current scene. 
 * 
 */
interface ISceneWorker {
    
    /**
     * Do work.
     */
    update (delta : number) : void;
}

export default ISceneWorker;
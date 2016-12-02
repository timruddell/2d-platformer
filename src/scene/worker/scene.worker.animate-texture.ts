import ISceneWorker from "./scene.worker.i-scene-worker"

import TextureAnimator from "../../render/render.texture-animator"

/**
 * Handles animating a texture from frame updates.
 * 
 */
class AnimateTextureWorker 
    implements ISceneWorker 
{
    private _animator : TextureAnimator;

    constructor (animator : TextureAnimator) {
        this._animator = animator;
    }

    update (delta : number) {
        this._animator.update(delta);
    }
}

export default AnimateTextureWorker;
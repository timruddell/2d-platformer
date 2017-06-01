import * as THREE from "three"

/**
 * Handles iteration over an animation spritesheet to animate textures.
 * 
 *  - supports single row frame strip
 *  - assumes sqaure frames
 * 
 */
class TextureAnimator {

    private _texture : THREE.Texture;

    get texture () : THREE.Texture {
        return this._texture;
    }

    // TODO: initial frame offset for bundled animations.

    /// Usable frames in the texture strip.
    private _frameCount : number;

    /// Durations (seconds) of each frame.
    private _duration : number;

    /// Total number of square frames in the texture.
    private _totalFrameCount : number;

    private _elapsed : number;
    private _frameOffset : number;

    constructor (
        texture : THREE.Texture,
        frameCount : number,
        duration : number
    ) {
        this._texture = texture;
        this._frameCount = frameCount;
        this._duration = duration;

        // The total frame count assumes all frames are square.
        this._totalFrameCount = texture.image.width / texture.image.height;

        if (this._totalFrameCount === 0 || this._totalFrameCount === Infinity) {
            throw Error("TextureAnimator: cannot determine animation frame count");
        }

        this._elapsed = 0;
        this._frameOffset = 0;

        this._initialize();
    }

    private _initialize() {
        this._texture.wrapS = THREE.RepeatWrapping;
        this._texture.wrapT = THREE.RepeatWrapping;

        this._texture.repeat.set(1/this._totalFrameCount, 1);
    }

    start () {
        // TODO:
    }

    /**
     * Updates the texture to the correct frame. Keeps track of passing time - should 
     * be called every frame.
     * 
     */
    update (delta : number) {
        // For static textures, since they're currently all run through this object.
        if (this._totalFrameCount === 1) {
            return;
        }

        this._elapsed += delta;

        if (this._elapsed >= this._duration) {
            this._elapsed = 0;

            this._frameOffset++;

            if (this._frameOffset === this._frameCount) {
                this._frameOffset = 0;
            }

            // Apply an offset to the texture based on which frame should show.
            this._texture.offset.x = 1/this._totalFrameCount * this._frameOffset;
        }
    }

    pause () {
        // TODO: 
    }

    reset () {
        this._frameOffset = 0;
        this._elapsed = 0;
    }
}

export default TextureAnimator;
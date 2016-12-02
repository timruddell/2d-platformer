import TextureAnimator from "./render.texture-animator"

/**
 * Handles switching textures on a sprite object.
 * 
 */
class TextureSwitcher {

    private _sprite : THREE.Sprite;
    private _textures : { [name: string] : TextureAnimator };
    private _currentTexture : string;

    constructor (sprite : THREE.Sprite) {
        this._sprite = sprite;
        this._textures = { };
    }

    /**
     * Register a new texture animation with the switcher. 
     * 
     *  - regisetered textures activated through switchTexture()
     * 
     */
    addTexture (textureName : string, texture : TextureAnimator) {
        this._textures[textureName] = texture;
    }

    /**
     * Change the applied texture.
     * 
     */
    switchTexture (textureName : string) {
        var animator = this._textures[textureName];

        if (!animator) {
            throw new Error("Cannot switch texture - no texture found with name '" + textureName + "'.");
        }

        if (textureName === this._currentTexture) {
            return;
        }

        this._currentTexture = textureName;

        animator.reset();
        this._sprite.material.map = animator.texture;
        this._sprite.material.needsUpdate = true;
    }
}

export default TextureSwitcher;
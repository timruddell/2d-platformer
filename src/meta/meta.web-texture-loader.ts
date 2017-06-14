import * as THREE from "three"

import IResource from "./meta.i-resource"
import IResourceLoader from "./meta.i-resource-loader"

/*
 * Http texture resource loader implementation.
 * 
 */
class WebTextureLoader 
    implements IResourceLoader<THREE.Texture>
{
    private _loader : THREE.TextureLoader;

    constructor () {
        this._loader = new THREE.TextureLoader();
    }

    require (resourceId : string) {
        let loader = this._loader;

        return new Promise<IResource<THREE.Texture>>(
            function (resolve, reject) {
                loader.load(
                    resourceId,
                    (texture) => {
                        resolve({
                            id: resourceId,
                            value: texture
                        });
                    }
                );
        });
    }
}

export default WebTextureLoader;
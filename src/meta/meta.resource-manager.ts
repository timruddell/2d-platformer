import * as THREE from "three"

import WebTextureLoader from "./meta.web-texture-loader"

import { ResourceType } from "./meta.consts"
import ResourceRepository from "./meta.resource-repository"


/*
 * Manages client-side resources obtained from a remote server.
 * 
 */
class ResourceManager {

    private _repositories : Array<ResourceRepository<any>> = null;

    constructor () {
        this._repositories = [
            new ResourceRepository(ResourceType.texture, new WebTextureLoader())
        ];
    }

    getRepository (resourceType : number) {
        return this._repositories.find((r) => r.getResourceType() === resourceType);
    }
}


var singleton = new ResourceManager();
export default singleton;
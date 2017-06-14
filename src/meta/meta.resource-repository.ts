import * as THREE from "three"

import IResourceLoader from "./meta.i-resource-loader"


/*
 * Encapsulates a collection of resources of a specified resource-type.
 * 
 */
class ResourceRepository<TResourceType> {

    private _resourceType : number;
    private _resourceLoader : IResourceLoader<TResourceType>;
    private _resourceRequireFunction : Function;

    // Local hashmap for obtained resources.
    private _resources : { [id : string] : any } = { };


    constructor (resourceType : number, resourceLoader : IResourceLoader<TResourceType>) {
        this._resourceType = resourceType;
        this._resourceLoader = resourceLoader;
    }

    ///
    /// Require the respository to obtain a remote resource coresponding to the passed ID array.
    ///
    require (resourceIds : Array<string>) {
        
        return Promise.all(resourceIds.map(
            async (rId) => {
                // If we already have the resource, instantly resolve.
                if (!!this._resources[rId]) {
                    return {
                        id: rId,
                        value: this._resources[rId]
                    };
                }

                // Otherwise ask the network network loader to obtain the resource. 
                try {
                    var resource = await this._resourceLoader.require(rId);
                    this._resources[rId] = resource.value;
                    return resource;
                }
                catch (e) {
                    console.error(e);
                }
            }));
    }

    // Properties.
    getResourceType () {
        return this._resourceType;
    }
}

export default ResourceRepository;
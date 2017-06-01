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
    // Local hashmap for promises awaiting resources.
    private _awaiting : { [id : string] : any } = { };


    constructor (resourceType : number, resourceLoader : IResourceLoader<TResourceType>) {
        this._resourceType = resourceType;
        this._resourceLoader = resourceLoader;
    }

    ///
    /// Require the respository to obtain a remote resource coresponding to the passed ID array.
    ///
    require (resourceIds : Array<string>) {
        return Promise.all(
            resourceIds.map((rId) => {
                // If there's already a request for this resource, return the current promise.
                if (!!this._awaiting[rId]) {
                    return this._awaiting[rId];
                }

                // Return a new promise with the resolved resource.
                return new Promise((resolve, reject) => {
                    
                    // If we already have the resource, instantly resolve.
                    if (!!this._resources[rId]) {
                        resolve({
                            id: rId,
                            value: this._resources[rId]
                        });
                        return;
                    }

                    // Otherwise ask the network network loader to obtain the resource and chain this promise. 
                    var remotePromise = this._resourceLoader.require(rId);
                    this._awaiting[rId] = remotePromise;

                    remotePromise.then(
                        (resource) => {
                            this._resources[rId] = resource.value;
                            resolve(resource);
                            delete this._awaiting[rId];
                        }
                    ).catch(
                        (error) => {
                            reject(error);
                            this._awaiting[rId];
                        }
                    );
                });
            })
        );
    }

    // Properties.
    getResourceType () {
        return this._resourceType;
    }
}

export default ResourceRepository;
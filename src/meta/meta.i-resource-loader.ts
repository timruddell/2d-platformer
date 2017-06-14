import IResource from './meta.i-resource'

interface IResourceLoader<TResource> {
    require (resourceId : string) : Promise<IResource<TResource>>
}

export default IResourceLoader;
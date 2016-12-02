interface IResourceLoader<TResource> {
    require (resourceId : string) : Promise<{ id : string, value : TResource}>
}

export default IResourceLoader;
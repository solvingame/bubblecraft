class Renderer{
    constructor(){
        this.chunkRenderer = new ChunkRenderer()
        this.skyRenderer = new SkyRenderer()
    }

    draw(object){
        this.chunkRenderer.add(object.mesh)
    }
    
    render(camera, appTime){
        this.skyRenderer.render(camera, appTime)
        this.chunkRenderer.render(camera)
    }
}
class Renderer{
    constructor(){
        this.chunkRenderer = new ChunkRenderer()
        this.skyRenderer = new SkyRenderer()
    }

    draw(object){
        this.chunkRenderer.add(object.mesh)
    }
    
    render(camera){
        this.skyRenderer.render(camera)
        this.chunkRenderer.render(camera)
    }
}
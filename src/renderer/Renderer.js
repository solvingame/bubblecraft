class Renderer{
    constructor(){
        this.chunkRenderer = new ChunkRenderer()
        this.skyRenderer = new SkyRenderer()
        this.imgData = context.createImageData(WINDOW_WIDTH, WINDOW_HEIGHT)
        this.data = this.imgData.data
        this.data.fill(0)
    }

    draw(object){
        this.chunkRenderer.add(object.mesh)
    }

    clear(){
        context.globalAlpha = 0
        context.putImageData(this.imgData, 0, 0)
        context.globalAlpha = 1
    }
    
    render(camera, appTime){
        this.skyRenderer.render(camera, appTime)
        this.chunkRenderer.render(camera)
    }
}
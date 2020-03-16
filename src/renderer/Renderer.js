import ChunkRenderer from './ChunkRenderer.js'
import SkyRenderer from './SkyRenderer.js'
import Player from '../world/Player.js'
import ObjectRenderer from './ObjectRenderer.js'

export default class Renderer{
    constructor(){
        this.chunkRenderer = new ChunkRenderer()
        this.skyRenderer = new SkyRenderer()
        this.objectRenderer = new ObjectRenderer()
        this.imgData = context.createImageData(WINDOW_WIDTH, WINDOW_HEIGHT)
        this.data = this.imgData.data
        this.data.fill(0)
    }

    draw(object){
        if(object instanceof Player){
            this.objectRenderer.add(object.mesh)
        }else{
            this.chunkRenderer.add(object.mesh)
        }
    }

    clear(){
        context.globalAlpha = 0
        context.putImageData(this.imgData, 0, 0)
        context.globalAlpha = 1
        contextObject.globalAlpha = 0
        contextObject.putImageData(this.imgData, 0, 0)
        contextObject.globalAlpha = 1
    }
    
    render(camera, appTime){
        this.skyRenderer.render(camera, appTime)
        this.chunkRenderer.render(camera)
        this.objectRenderer.render(camera)
    }
}
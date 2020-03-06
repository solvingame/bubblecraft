class ChunkRenderer{
    constructor(){
        this.meshes = []
    }

    render(camera){
        context.globalAlpha = 0.5
        for(var iMesh in this.meshes){
            const mesh = this.meshes[iMesh]
            if(!mesh.toDraw) continue //temp solution - delete this
            const cameraViewX = camera.position.x - WINDOW_WIDTH / 2
            const cameraViewY = camera.position.y - WINDOW_HEIGHT / 2
            const meshX = parseInt(mesh.position.x) - cameraViewX
            const meshY = WINDOW_HEIGHT - parseInt(mesh.position.y) - cameraViewY
            context.putImageData(mesh.imgData, meshX, meshY)
        }
        this.meshes = []
        context.globalAlpha = 1.0
    }

    add(mesh){
        this.meshes.push(mesh)
    }
}
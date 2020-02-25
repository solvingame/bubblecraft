class Renderer{
    constructor(){
        this.meshes = []
    }

    draw(object){
        this.meshes.push(object.mesh)
    }

    clear() {
        context.fillStyle = '#dddddd';
        context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    render(camera){
        for(var iMesh in this.meshes){
            const mesh = this.meshes[iMesh]
            const cameraViewX = camera.position.x - WINDOW_WIDTH / 2
            const cameraViewY = camera.position.y - WINDOW_HEIGHT / 2
            const meshX = parseInt(mesh.position.x) - cameraViewX
            const meshY = WINDOW_HEIGHT - parseInt(mesh.position.y) - cameraViewY
            context.putImageData(mesh.imgData, meshX, meshY)
        }
        this.meshes = []
    }
}
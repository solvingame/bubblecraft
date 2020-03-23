define(function () {

    class ObjectRenderer {
        constructor() {
            this.meshes = []
        }

        render(camera) {
            contextObject.globalAlpha = 0
            for (var iMesh in this.meshes) {
                const mesh = this.meshes[iMesh]
                const { x, y } = camera.toCanvasCoord(mesh.position)
                contextObject.putImageData(mesh.imgData, x, y)
            }
            this.meshes = []
            contextObject.globalAlpha = 1
        }

        add(mesh) {
            this.meshes.push(mesh)
        }
    }

    return ObjectRenderer
})
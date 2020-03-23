define(function () {

    class ChunkRenderer {
        constructor() {
            this.meshes = []
        }

        render(camera) {
            context.globalAlpha = 0
            for (var iMesh in this.meshes) {
                const mesh = this.meshes[iMesh]
                const { x, y } = camera.toCanvasCoord(mesh.position)
                context.putImageData(mesh.imgData, x, y)
            }
            this.meshes = []
            context.globalAlpha = 1
        }

        add(mesh) {
            this.meshes.push(mesh)
        }
    }

    return ChunkRenderer
})
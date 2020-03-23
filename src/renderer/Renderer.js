define(function (require) {

    const ChunkRenderer = require('./ChunkRenderer.js')
    const SkyRenderer = require('./SkyRenderer.js')
    const ObjectRenderer = require('./ObjectRenderer.js')
    const Entity = require('../core/Entity.js')

    class Renderer {
        constructor() {
            this.chunkRenderer = new ChunkRenderer()
            this.skyRenderer = new SkyRenderer()
            this.objectRenderer = new ObjectRenderer()
        }

        init() {
            this.imgData = context.createImageData(WINDOW_WIDTH, WINDOW_HEIGHT)
            this.data = this.imgData.data
            this.data.fill(0)
        }

        draw(object) {
            if (object instanceof Entity) {
                this.objectRenderer.add(object.mesh)
            } else {
                this.chunkRenderer.add(object.mesh)
            }
        }

        clear() {
            context.globalAlpha = 0
            context.putImageData(this.imgData, 0, 0)
            context.globalAlpha = 1
            contextObject.globalAlpha = 0
            contextObject.putImageData(this.imgData, 0, 0)
            contextObject.globalAlpha = 1
        }

        render(camera, appTime) {
            this.skyRenderer.render(camera, appTime)
            this.chunkRenderer.render(camera)
            this.objectRenderer.render(camera)
        }
    }

    return Renderer
})
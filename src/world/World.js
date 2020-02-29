class World {
    constructor(noiseGenerator) {
        this.chunkManager = new ChunkManager(noiseGenerator, this)
        this.renderDistance = 20
        this.loadDistance = 2
    }

    draw(renderer, camera) {
        const chunks = this.chunkManager.chunks
        for (var iChunk in chunks) {
            const chunk = chunks[iChunk]
            const chunkElement = chunk.element
            var cameraX = camera.position.x
            var minX = cameraX - this.renderDistance * CHUNK_SIZE
            var maxX = cameraX + this.renderDistance * CHUNK_SIZE
            if (minX > chunkElement.position.x || maxX < chunkElement.position.x) {
                this.chunkManager.chunks.splice(iChunk, 1)
            } else {
                chunkElement.draw(renderer)
            }
        }
    }

    getChunk(x, y) {
        return this.chunkManager.getChunk(parseInt(x / CHUNK_SIZE) * CHUNK_SIZE).getChunk(parseInt(y / CHUNK_SIZE))
    }

    getBlock(x, y) {
        return this.chunkManager.getChunk(parseInt(x / CHUNK_SIZE) * CHUNK_SIZE).getBlock(x % CHUNK_SIZE, y)
    }

    loadChunks(camera) {
        var isBuffered = false
        var cameraX = parseInt(camera.position.x / CHUNK_SIZE)
        for (var i = 0; i < this.loadDistance; i++) {
            const minX = Math.max(cameraX - i, 0)
            const maxX = cameraX + i
            for (var x = minX; x < maxX; x++) {
                this.chunkManager.load(x * CHUNK_SIZE)
                isBuffered = this.chunkManager.addToBuffer(x * CHUNK_SIZE)
            }
            if (isBuffered) {
                break
            }
        }
        if (!isBuffered) {
            this.loadDistance++
        }
        if (this.loadDistance > this.renderDistance) {
            this.loadDistance = 2
        }
    }
}
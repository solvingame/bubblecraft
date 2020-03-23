define(function (require) {

    const ChunkManager = require('./ChunkManager.js')
    const CreatureManager = require('./CreatureManager.js')

    class World {
        constructor(noiseGenerator) {
            this.chunkManager = new ChunkManager(noiseGenerator, this)
            this.creatureManager = CreatureManager.get(this)
            this.renderDistance = RENDER_DISTANCE
            this.loadDistance = 2
            this.updateChunks = []
        }

        assign(obj) {
            Object.assign(this, obj)
        }

        draw(renderer, camera) {
            const chunks = this.chunkManager.chunks
            const creatures = this.creatureManager.creatures
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
            for (var iCreature in creatures) {
                const creature = creatures[iCreature]
                var cameraX = camera.position.x
                var minX = cameraX - this.renderDistance * CHUNK_SIZE
                var maxX = cameraX + this.renderDistance * CHUNK_SIZE
                if (minX > creature.position.x || maxX < creature.position.x) {
                    this.creatureManager.creatures.splice(iCreature, 1)
                } else {
                    creature.draw(renderer)
                }
            }
        }

        getChunk(x, y) {
            return this.chunkManager.getChunk(parseInt(x / CHUNK_SIZE) * CHUNK_SIZE).getChunk(parseInt(y / CHUNK_SIZE))
        }

        getBlock(x, y) {
            return this.chunkManager.getChunk(parseInt(x / CHUNK_SIZE) * CHUNK_SIZE).getBlock(x % CHUNK_SIZE, y)
        }

        setBlock(x, y, type) {
            if (y >= 0) {
                this.chunkManager.getChunk(parseInt(x / CHUNK_SIZE) * CHUNK_SIZE).setBlock(x % CHUNK_SIZE, y, type)
            }
        }

        mine(x, y) {
            if (y >= 0) {
                this.chunkManager.getChunk(parseInt(x / CHUNK_SIZE) * CHUNK_SIZE).mine(x % CHUNK_SIZE, y)
            }
        }

        update() {
            for (var iUpdateChunk in this.updateChunks) {
                this.updateChunks[iUpdateChunk].addToBuffer()
            }
            this.creatureManager.update(this)
            this.updateChunks = []
        }

        updateChunk(x, y) {
            this.updateChunks.push(this.getChunk(x, y))
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

    return World
})
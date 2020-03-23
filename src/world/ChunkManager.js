define(function (require) {

    const TerrainGenerator = require('./TerrainGenerator.js')
    const SuperChunk = require('./SuperChunk.js')

    class ChunkManager {
        constructor(noiseGenerator, world) {
            this.chunks = []
            this.world = world
            this.terrainGenerator = new TerrainGenerator(noiseGenerator)
        }

        getChunkAt(x) {
            return this.chunks.find((element) => element.x === x)
        }

        getChunk(x) {
            const chunk = this.getChunkAt(x)
            if (!chunk) {
                const element = new SuperChunk({ x }, this.world)
                this.chunks.push({ x, element })
            }
            return this.getChunkAt(x).element
        }

        load(x) {
            var chunk = this.getChunk(x)
            chunk.load(this.terrainGenerator)
        }

        addToBuffer(x) {
            var chunk = this.getChunk(x)
            return chunk.addToBuffer()
        }
    }

    return ChunkManager
})
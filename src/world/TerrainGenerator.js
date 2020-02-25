class TerrainGenerator {
    constructor(noiseGenerator) {
        this.noiseGenerator = noiseGenerator
        this.chunk = null
        this.configs = {
            octaves: 7,
            amplitude: 600,
            persistance: 0.50,
            smoothness: 100
        }
        this.noiseGenerator.setConfigs(this.configs)
    }

    generate(chunk) {
        this.chunk = chunk
        const heightMap = this.getHeightMap()
        for (var iBlock = 0; iBlock < CHUNK_SIZE_BLOCK; iBlock++) {
            var x = iBlock * BLOCK_SIZE
            var height = parseInt(heightMap[x][0]/BLOCK_SIZE)*BLOCK_SIZE
            var h = Math.max(WATER_LEVEL, height)
            for(var y = 0; y <= h; y += BLOCK_SIZE){
                if(y <= height){
                    if(y == height){
                        if(y >= WATER_LEVEL){
                            if(y < WATER_LEVEL + 20){
                                chunk.setBlock(x, y, BlockType.Sand)
                            }else{
                                chunk.setBlock(x, y, BlockType.Grass)
                            }
                        }else{
                            //under water
                            chunk.setBlock(x, y, BlockType.Water)
                        }
                    }else{
                        chunk.setBlock(x, y, BlockType.Dirt)
                    }
                }else{
                    if(y <= WATER_LEVEL){
                        chunk.setBlock(x, y, BlockType.Water)
                    }else{
                        chunk.setBlock(x, y, BlockType.Air)
                    }
                }
            }
        }
    }

    getHeightAt(x, z) {
        const h = this.noiseGenerator.perlinNoise(this.chunk.position.x + x, 0)
        return h
    }

    getHeightIn(heights, xMin, zMin, xMax, zMax) {
        const bottomLeft = this.getHeightAt(xMin, zMin)
        const bottomRight = this.getHeightAt(xMax, zMin)
        const topLeft = this.getHeightAt(xMin, zMax)
        const topRight = this.getHeightAt(xMax, zMax)
        for (var x = xMin; x < xMax; x++) {
            for (var z = zMin; z < zMax; z++) {
                if (x === CHUNK_SIZE) continue
                if (z === CHUNK_SIZE) continue

                var h = Maths.smoothInterpolation(bottomLeft, topLeft, bottomRight, topRight, xMin, xMax, zMin, zMax, x, z)
                if (!heights[x]) {
                    heights[x] = []
                }
                heights[x][z] = h
            }
        }
    }

    getHeightMap() {
        const part = 2
        const PART_SIZE = CHUNK_SIZE / part
        var heights = []
        for (var zPart = 0; zPart < part; zPart++) {
            for (var xPart = 0; xPart < part; xPart++) {
                this.getHeightIn(
                    heights,
                    xPart * PART_SIZE,
                    zPart * PART_SIZE,
                    (xPart + 1) * PART_SIZE,
                    (zPart + 1) * PART_SIZE
                )
            }
        }

        return heights
    }
}
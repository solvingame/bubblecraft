import Maths from '../utils/Maths.js'
import Log from '../utils/Log.js'
import Random from '../utils/Random.js'
import { BlockType } from './block/Block.js'
import Plant from './env/Plant.js'
import Tree from './env/Tree.js'

export default class TerrainGenerator {
    constructor(noiseGenerator) {
        this.noiseGenerator = noiseGenerator
        this.chunk = null
        this.configs = {
            octaves: 7,
            amplitude: 600,
            persistance: 0.4,
            smoothness: 500
        }
        this.noiseGenerator.setConfigs(this.configs)
    }

    generate(chunk) {
        this.chunk = chunk
        var trees = []
        var plants = []
        const heightMap = this.getHeightMap()
        for (var iBlock = 0; iBlock < CHUNK_SIZE_BLOCK; iBlock++) {
            var x = iBlock * BLOCK_SIZE
            var height = parseInt(heightMap[x][0] / BLOCK_SIZE) * BLOCK_SIZE
            var h = Math.max(WATER_LEVEL, height)
            Log.debug(`chunk ${chunk.position.x + x} (${x}) - height = ${height}`)
            for (var y = 0; y <= h; y += BLOCK_SIZE) {
                if (y <= height) {
                    if (y == height) {
                        if (y >= WATER_LEVEL) {
                            if (y < WATER_LEVEL + BLOCK_SIZE * 2) {
                                Log.debug(`Sand`)
                                chunk.setBlock(x, y, BlockType.Sand)
                                continue
                            }
                            if (Random.get(chunk.position.x + x + y).intInRange(0, 100) > 90) {
                                trees.push({ x, y })
                            } else if (Random.get(chunk.position.x + x + y).intInRange(0, 100) > 30) {
                                plants.push({ x, y: y + BLOCK_SIZE })
                            }
                            Log.debug(`Grass`)
                            chunk.setBlock(x, y, BlockType.Grass)
                        } else {
                            //under water
                            Log.debug(`Water`)
                            chunk.setBlock(x, y, BlockType.Water)
                        }
                    } else {
                        if (Random.get(chunk.position.x + x * y).intInRange(0, 400) > Math.max(400 - y, 10)) {
                            Log.debug(`Dirt`)
                            chunk.setBlock(x, y, BlockType.Dirt)
                        } else {
                            Log.debug(`Stone`)
                            chunk.setBlock(x, y, BlockType.Stone)
                        }
                    }
                } else {
                    if (y <= WATER_LEVEL) {
                        Log.debug(`Water`)
                        chunk.setBlock(x, y, BlockType.Water)
                    } else {
                        Log.debug(`Air`)
                        chunk.setBlock(x, y, BlockType.Air)
                    }
                }
            }
        }
        for (var iTree in trees) {
            Tree.make(chunk, trees[iTree])
        }
        for (var iPlant in plants) {
            Plant.make(chunk, plants[iPlant])
        }
    }

    getHeightAt(x, z) {
        const h = this.noiseGenerator.perlinNoise(this.chunk.position.x + x, z)
        return h
    }

    getHeightIn(heights, xMin, zMin, xMax, zMax) {
        const bottomLeft = this.getHeightAt(xMin, zMin)
        const bottomRight = this.getHeightAt(xMax, zMin)
        const topLeft = this.getHeightAt(xMin, zMax)
        const topRight = this.getHeightAt(xMax, zMax)
        for (var x = xMin; x < xMax; x++) {
            for (var z = zMin; z < zMax; z++) {

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
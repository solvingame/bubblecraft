import BlockTypeBuilder from './BlockTypeBuilder.js'
import { BlockType } from './Block.js'

export default class BlockBuilder {
    static instance = null
    constructor() {
        this.blockBuilders = {
            [BlockType.Grass]: new BlockTypeBuilder("grass"),
            [BlockType.Water]: new BlockTypeBuilder("water"),
            [BlockType.Sand]: new BlockTypeBuilder("sand"),
            [BlockType.Dirt]: new BlockTypeBuilder("dirt"),
            [BlockType.Snow]: new BlockTypeBuilder("snow"),
            [BlockType.Stone]: new BlockTypeBuilder("stone"),
            [BlockType.Wood]: new BlockTypeBuilder("wood"),
            [BlockType.Leaf]: new BlockTypeBuilder("leaf"),
            [BlockType.Plant]: new BlockTypeBuilder("plant"),
            [BlockType.Bubble]: new BlockTypeBuilder("bubble")
        }
    }
    static get(block) {
        if (!BlockBuilder.instance) {
            BlockBuilder.instance = new BlockBuilder()
        }
        return BlockBuilder.instance.getBlock(block)
    }
    getBlock(block) {
        return this.blockBuilders[block.type]
    }
}
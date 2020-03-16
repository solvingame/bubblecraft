import BlockTypeBuilder from './BlockTypeBuilder.js'
import { BlockType } from './Block.js'

export default class BlockBuilder {
    static instance = null
    constructor() {
        this.blockBuilders = {}
        for(var kBlockType in BlockType){
            this.blockBuilders[BlockType[kBlockType]] = new BlockTypeBuilder(BlockType[kBlockType])
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
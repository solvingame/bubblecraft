define(function (require) {

    const BlockTypeBuilder = require('./BlockTypeBuilder.js')
    const BlockType = require('./Block.js').BlockType

    class BlockBuilder {
        constructor() {
            this.blockBuilders = {}
            for (var kBlockType in BlockType) {
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

    BlockBuilder.instance = null

    return BlockBuilder

})
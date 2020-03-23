define(function (require) {

    const blocks = require('../../../res/blocks.js')

    class BlockProps {
        constructor() {
            this.blocks = blocks
        }
        static get(blockType) {
            if (!BlockProps.instance) {
                BlockProps.instance = new BlockProps()
            }
            return BlockProps.instance.getBlock(blockType)
        }

        getBlock(blockType) {
            return this.blocks[blockType]
        }
    }

    BlockProps.instance = null

    return BlockProps
})
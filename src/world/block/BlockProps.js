

import blocks from '../../../res/blocks.js'

export default class BlockProps {
    static instance = null
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
import BlockProps from './BlockProps.js'
import BlockTex from './BlockTex.js'

export default class BlockTypeBuilder {
    constructor(blockType) {
        const blockProps = BlockProps.get(blockType)
        if (blockProps.texColor) {
            this.buildByColor(blockProps.texColor)
        } else {
            this.buildByTex(blockProps.tex)
        }
    }

    buildByColor(color) {
        this.meshes = new Array(BLOCK_SIZE * BLOCK_SIZE)
        this.meshes.fill(color)
    }

    buildByTex(position) {
        this.meshes = new Array(BLOCK_SIZE * BLOCK_SIZE)
        this.meshes.fill([0, 0, 0, 0])
        const texMeshes = BlockTex.get(position)
        this.meshes = texMeshes
    }

    at(x, y) {
        return this.meshes[x + y * BLOCK_SIZE]
    }
}
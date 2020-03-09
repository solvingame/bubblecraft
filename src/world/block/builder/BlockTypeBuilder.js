class BlockTypeBuilder {
    at(x, y){
        return this.meshes[x + y * BLOCK_SIZE]
    }
}
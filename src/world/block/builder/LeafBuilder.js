class LeafBuilder extends BlockTypeBuilder{
    constructor(){
        super()
        this.meshes = new Array(BLOCK_SIZE * BLOCK_SIZE)
        this.meshes.fill([18, 74, 8, 255])
    }
}
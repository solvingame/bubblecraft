class WoodBuilder extends BlockTypeBuilder{
    constructor(){
        super()
        this.meshes = new Array(BLOCK_SIZE * BLOCK_SIZE)
        this.meshes.fill([74, 48, 39, 255])
    }
}
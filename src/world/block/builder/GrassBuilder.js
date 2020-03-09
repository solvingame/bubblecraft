class GrassBuilder extends BlockTypeBuilder{
    constructor(){
        super()
        this.meshes = new Array(BLOCK_SIZE * BLOCK_SIZE)
        this.meshes.fill([64, 154, 67, 255])
    }
}
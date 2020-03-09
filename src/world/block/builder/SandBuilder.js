class SandBuilder extends BlockTypeBuilder{
    constructor(){
        super()
        this.meshes = new Array(BLOCK_SIZE * BLOCK_SIZE)
        this.meshes.fill([255, 193, 7, 255])
    }
}
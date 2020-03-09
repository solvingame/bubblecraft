class StoneBuilder extends BlockTypeBuilder{
    constructor(){
        super()
        this.meshes = new Array(BLOCK_SIZE * BLOCK_SIZE)
        this.meshes.fill([101, 119, 127, 255])
    }
}
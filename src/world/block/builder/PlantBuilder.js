class PlantBuilder extends BlockTypeBuilder{
    constructor(){
        super()
        this.meshes = new Array(BLOCK_SIZE * BLOCK_SIZE)
        this.meshes.fill([0, 0, 0, 0])
        this.build()
    }
    build(){
        const color = [18, 74, 8, 255]
        for(var iMesh in this.meshes){
            if(
                iMesh >= (BLOCK_SIZE * BLOCK_SIZE / 2) &&
                ((iMesh - parseInt(BLOCK_SIZE / 2)) % BLOCK_SIZE == 0 ||
                (iMesh - parseInt(BLOCK_SIZE / 2) - 1) % BLOCK_SIZE == 0 ||
                (iMesh - parseInt(BLOCK_SIZE / 2) + 1) % BLOCK_SIZE == 0)
            ){
                this.meshes[iMesh] = color
            }
        }
        this.buildCircle()
    }
    buildCircle(){
        var r = 5
        var center = parseInt(BLOCK_SIZE / 2)
        for (var x = -center; x < BLOCK_SIZE - center; x++) {
            for (var y = -center; y < BLOCK_SIZE - center; y++) {
                var index = (x + center) + (y + center) * BLOCK_SIZE
                if (x * x + y * y <= r * r) {
                    this.meshes[index] = [255, 87, 34, 255]
                }
            }
        }
    }
}
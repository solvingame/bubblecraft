class Mesh {
    constructor(position) {
        this.position = position
        this.imgData = context.createImageData(CHUNK_SIZE, CHUNK_SIZE)
        this.data = this.imgData.data
    }

    add(blocks) {
        var l = this.data.length
        var pixels = []
        for(var col = 0; col < CHUNK_SIZE; col ++){
            for(var row = 0; row < CHUNK_SIZE; row ++){
                var block = blocks[parseInt(col/BLOCK_SIZE) + parseInt(row/BLOCK_SIZE) * CHUNK_SIZE_BLOCK]
                pixels[col + row * CHUNK_SIZE] = block.type
            }
        }
        for (var i = 0; i < l; i += 4) {
            var pixel = pixels[i / 4]
            var rgb = null
            if (pixel === BlockType.Water) {
                rgb = [3, 169, 244]
            } else if (pixel == BlockType.Grass) {
                rgb = [64, 154, 67]
            } else if (pixel == BlockType.Sand) {
                rgb = [255, 193, 7]
            } else if (pixel == BlockType.Dirt) {
                rgb = [74, 48, 39]
            } else if (pixel == BlockType.Snow) {
                rgb = [249, 249, 249]
            } else if (pixel == BlockType.Bubble) {
                rgb = [233, 30, 99]
            } else {
                rgb = [221, 221, 221, 0]
            }
            var alpha = rgb[3] != undefined ? rgb[3] : 255
            this.data[i] = rgb[0]
            this.data[i + 1] = rgb[1]
            this.data[i + 2] = rgb[2]
            this.data[i + 3] = alpha
        }
    }
}
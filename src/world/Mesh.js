class Mesh {
    constructor(position) {
        this.position = position
        this.imgData = context.createImageData(CHUNK_SIZE, CHUNK_SIZE)
        this.data = this.imgData.data
    }

    add(blocks) {
        var l = this.data.length
        var pixels = []
        for (var iBlock in blocks) {
            var block = blocks[iBlock]
            var pixelBlock = new Array(BLOCK_SIZE * BLOCK_SIZE).fill(block.type)
            pixels = pixels.concat(pixelBlock)
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
                rgb = [221, 221, 221]
            }
            this.data[i] = rgb[0]
            this.data[i + 1] = rgb[1]
            this.data[i + 2] = rgb[2]
            this.data[i + 3] = 255
        }
    }
}
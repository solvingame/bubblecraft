class Mesh {
    constructor(position, size = CHUNK_SIZE) {
        this.size = size
        this.position = position
        this.imgData = context.createImageData(this.size, this.size)
        this.data = this.imgData.data
    }

    add(blocks) {
        var l = this.data.length
        var pixels = []
        for(var col = 0; col < this.size; col ++){
            for(var row = 0; row < this.size; row ++){
                const relCol = col
                const relRow = this.size - row - 1
                var block = blocks[parseInt(col/BLOCK_SIZE) + parseInt(row/BLOCK_SIZE) * this.size / BLOCK_SIZE]
                pixels[relCol + relRow * this.size] = block
            }
        }
        for (var i = 0; i < l; i += 4) {
            var pixel = pixels[i / 4]
            var rgb = null
            if (pixel.type === BlockType.Water) {
                rgb = [3, 169, 244, 255]
            } else if (pixel.type == BlockType.Grass) {
                rgb = [64, 154, 67, 255]
            } else if (pixel.type == BlockType.Sand) {
                rgb = [255, 193, 7, 255]
            } else if (pixel.type == BlockType.Dirt) {
                rgb = [93, 60, 4, 255]
            } else if (pixel.type == BlockType.Snow) {
                rgb = [249, 249, 249, 255]
            } else if (pixel.type == BlockType.Stone) {
                rgb = [101, 119, 127, 255]
            } else if (pixel.type == BlockType.Wood) {
                rgb = [74, 48, 39, 255]
            } else if (pixel.type == BlockType.Leaf) {
                rgb = [18, 74, 8, 255]
            } else if (pixel.type == BlockType.Bubble) {
                rgb = [233, 30, 99, 255]
            } else {
                rgb = [255, 255, 255, 0]
            }
            rgb = this.processColors(rgb, pixel)
            const alpha = rgb[3]
            this.data[i] = rgb[0]
            this.data[i + 1] = rgb[1]
            this.data[i + 2] = rgb[2]
            this.data[i + 3] = this.generateAlpha(pixel, alpha)
        }
    }

    processColors(rgb, pixel){
        const rand = Math.random()
        if(rand <= pixel.mineLevel){
            rgb[0] = rgb[1] = rgb[2] = 0
        }
        return rgb
    }

    generateAlpha(pixel, alpha){
        const rand = Math.random()
        var newAlpha = alpha
        if(alpha && pixel.type != BlockType.Bubble && pixel.type != BlockType.Water){
            const minValue = 230
            const maxValue = 255
            newAlpha = minValue + rand * (maxValue - minValue)
        }
        return newAlpha
    }
}
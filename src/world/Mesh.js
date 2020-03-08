class Mesh {
    constructor(position, size = CHUNK_SIZE) {
        this.size = size
        this.position = position
        this.imgData = context.createImageData(this.size, this.size)
        this.data = this.imgData.data
    }

    add(blocks, mineLevel) {
        var l = this.data.length
        var pixels = []
        for(var col = 0; col < this.size; col ++){
            for(var row = 0; row < this.size; row ++){
                const relCol = col
                const relRow = this.size - row - 1
                var block = blocks[parseInt(col/BLOCK_SIZE) + parseInt(row/BLOCK_SIZE) * this.size / BLOCK_SIZE]
                pixels[relCol + relRow * this.size] = block.type
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
                rgb = [93, 60, 4]
            } else if (pixel == BlockType.Snow) {
                rgb = [249, 249, 249]
            } else if (pixel == BlockType.Stone) {
                rgb = [101, 119, 127]
            } else if (pixel == BlockType.Wood) {
                rgb = [74, 48, 39]
            } else if (pixel == BlockType.Leaf) {
                rgb = [18, 74, 8]
            } else if (pixel == BlockType.Bubble) {
                rgb = [233, 30, 99]
            } else {
                rgb = [0, 0, 0, 0]
            }
            const alpha = rgb[3] != undefined ? rgb[3] : 255
            this.data[i] = rgb[0]
            this.data[i + 1] = rgb[1]
            this.data[i + 2] = rgb[2]
            this.data[i + 3] = this.generateAlpha(pixel, alpha, mineLevel)
        }
    }

    generateAlpha(pixel, alpha, mineLevel){
        const rand = Math.random()
        var newAlpha = alpha
        if(rand <= mineLevel){
            newAlpha = 0
        }else{
            if(pixel != BlockType.Bubble && pixel != BlockType.Water){
                const minValue = 230
                const maxValue = 255
                newAlpha = minValue + rand * (maxValue - minValue)
            }
        }
        return newAlpha
    }
}
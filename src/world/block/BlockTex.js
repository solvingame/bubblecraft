export default class BlockTex {
    static instance = null

    loadAtlasTex() {
        const current = this
        return new Promise((resolve, reject) => {
            this.image = new Image()
            this.image.src = '/res/textures/atlas.png'
            this.image.onload = () => {
                const canvasTex = document.createElement('canvas')
                const contextTex = canvasTex.getContext('2d')
                contextTex.canvas.width = this.image.width
                contextTex.canvas.height = this.image.height
                contextTex.drawImage(this.image, 0, 0)
                const imageData = contextTex.getImageData(0, 0, this.image.width, this.image.height)
                var iData = -1
                current.texData = []
                imageData.data.map((d, k) => {
                    if (k % 4 === 0) {
                        iData++
                        current.texData[iData] = []
                    }
                    current.texData[iData].push(d)
                })
                resolve(current.texData)
            }
            this.image.onerror = reject
        })
    }

    static load(){
        BlockTex.instance = new BlockTex()
        return BlockTex.instance.loadAtlasTex()
    }

    static get(position) {
        return BlockTex.instance.getPosition(position)
    }

    getPosition(position) {
        var startX = position[0] - 1
        var startY = position[1] - 1
        const numBlockTex = this.image.width / BLOCKTEX_SIZE
        var pixels = []
        var iX = 0
        do{
            const x = BLOCKTEX_SIZE * numBlockTex * (iX + startX * BLOCKTEX_SIZE)
            for(var iY = 0; iY < BLOCKTEX_SIZE; iY++){
                const pixel = this.texData[x + (iY + startY * BLOCKTEX_SIZE)]
                pixels.push(pixel)
            }
            iX ++
        }while(iX < BLOCKTEX_SIZE)
        return pixels
    }
}
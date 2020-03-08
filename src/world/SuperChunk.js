class SuperChunk{
    constructor(position, world){
        this.position = position
        this.world = world
        this.chunks = []
        this.isLoaded = false
        this.isBuffered = false
    }

    setBlock(x, y, type){
        var index = parseInt(y / CHUNK_SIZE)
        this.addChunkIndex(index)

        if(this.outOfBounds(x, y)){
            return
        }

        this.chunks[index].setBlock(x, y % CHUNK_SIZE, type)
    }

    mine(x, y){
        if(this.outOfBounds(x, y)){
            throw 'Block out of range'
        }
        this.chunks[parseInt(y / CHUNK_SIZE)].mine(x, y % CHUNK_SIZE)
    }

    getBlock(x, y){
        if(this.outOfBounds(x, y)){
            return new Block()
        }
        return this.chunks[parseInt(y / CHUNK_SIZE)].getBlock(x, y % CHUNK_SIZE)
    }

    getChunk(index){
        if(index >= this.chunks.length || index < 0){
            return null
        }
        return this.chunks[index]
    }

    addChunk(){
        var y = this.chunks.length
        this.chunks.push(new Chunk({x: this.position.x, y: y * CHUNK_SIZE}, this.world))
    }

    addChunkIndex(index){
        while(this.chunks.length <= index){
            this.addChunk()
        }
    }

    load(generator) {
        if (!this.isLoaded) {
            generator.generate(this)
            this.isLoaded = true
        }
    }

    draw(renderer) {
        for(var iChunk in this.chunks){
            this.chunks[iChunk].draw(renderer)
        }
    }

    outOfBounds(x, y){
        if(
            x >= CHUNK_SIZE ||
            x < 0 ||
            y < 0 ||
            y >= this.chunks.length * CHUNK_SIZE
        ){
            return true
        }
        return false
    }

    addToBuffer() {
        if(this.isLoaded){
            for(var iChunk in this.chunks){
                if(!this.chunks[iChunk].isBuffered){
                    this.chunks[iChunk].addToBuffer()
                    return true
                }
            }
        }
        return false
    }
}
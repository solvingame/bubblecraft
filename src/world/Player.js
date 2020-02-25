class Player{
    constructor(position){
        this.position = position
        this.isBuffered = false
        this.blocks = new Array(CHUNK_SIZE_BLOCK * CHUNK_SIZE_BLOCK)
        this.blocks.fill(new Block(BlockType.Bubble))
        this.mesh = new Mesh(position)
        this.speed = 3
    }

    move(dx, dy){
        this.position.x += dx * this.speed
        this.position.y += dy * this.speed
    }

    update(){
        this.addToBuffer()
    }

    draw(renderer){
        if(this.isBuffered){
            renderer.draw(this)
        }
    }

    addToBuffer() {
        if (!this.isBuffered) {
            this.mesh.add(this.blocks)
            this.isBuffered = true
            return true
        }
        return false
    }
}
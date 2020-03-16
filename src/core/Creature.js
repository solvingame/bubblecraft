import Block from '../world/block/Block.js'
import Mesh from '../world/Mesh.js'

export default class Creature{
    constructor(props){
        this.moveBlocks = props.moveBlocks
        this.swimBlocks = props.swimBlocks
        this.position = props.position
        this.isBuffered = false
        this.reverseBlock = false
        this.iBlockType = 0
        this.size = BLOCK_SIZE
        this.blocks = new Array(Math.pow(this.size / BLOCK_SIZE, 2))
        this.blocks.fill(new Block(this.moveBlocks[this.iBlockType]))
        this.mesh = new Mesh(this.position, this.size)
        this.acceleration = { x: 0, y: 0 }
        this.velocity = { x: 0, y: 0 }
        this.isOnGround = false
        this.isUnderWater = false
        this.delayMove = 200
        this.startMove = Date.now()
    }

    move(dx, dy) {
        this.acceleration.x = dx * this.speed
        this.acceleration.y = dy * this.speed / 10
        if(this.acceleration.x <= 0){
            this.reverseBlock = false
        }else{
            this.reverseBlock = true
        }
    }
    
    updateBlock(){
        var stepBlocks = this.moveBlocks
        if(this.isUnderWater){
            stepBlocks = this.swimBlocks
        }
        const moveLength = stepBlocks.length
        const diffTime = (Date.now() - this.startMove) % (moveLength * this.delayMove)
        if(Math.abs(this.velocity.x) > 0.1){
            this.iBlockType = parseInt(diffTime / this.delayMove)
        }else{
            this.iBlockType = 0
        }
        this.blocks.fill(new Block(stepBlocks[this.iBlockType], {reverse: this.reverseBlock}))
        this.isBuffered = false
    }
}
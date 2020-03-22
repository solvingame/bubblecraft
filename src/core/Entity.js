import Block,{ BlockType } from '../world/block/Block.js'
import Mesh from '../world/Mesh.js'
import BlockProps from '../world/block/BlockProps.js'

export default class Entity {
    constructor(options) {
        this.moveBlocks = options.moveBlocks
        this.swimBlocks = options.swimBlocks
        this.position = options.position
        this.props = options.props
        this.delayMove = options.delayMove
        this.isBuffered = false
        this.reverseBlock = false
        this.iBlockType = 0
        this.size = BLOCK_SIZE
        this.blocks = new Array(Math.pow(this.size / BLOCK_SIZE, 2))
        this.blocks.fill(new Block(this.moveBlocks[this.iBlockType]))
        this.mesh = new Mesh(this.position, this.size)
        this.acceleration = { x: 0, y: 0 }
        this.velocity = { x: 0, y: 0 }
        this.lastVelocity = this.velocity
        this.isOnGround = false
        this.isUnderWater = false
        this.startMove = Date.now()
    }

    move(direction) {
        var dx = 0, dy = 0
        if (direction & Math.pow(2, DIRECTION.UP)) {
            dy = 1
        }
        if (direction & Math.pow(2, DIRECTION.BOTTOM)) {
            dy = -1
        }
        if (direction & Math.pow(2, DIRECTION.LEFT)) {
            dx = -1
        }
        if (direction & Math.pow(2, DIRECTION.RIGHT)) {
            dx = 1
        }
        this.acceleration.x = dx * this.speed
        this.acceleration.y = dy * this.speed / 10
        if (this.acceleration.x <= 0) {
            this.reverseBlock = false
        } else {
            this.reverseBlock = true
        }
    }

    jump() {
        if (this.isOnGround) {
            this.acceleration.y += (this.speed * 5)
        }
    }

    collide(world, velocity) {
        var dimensions = { x: this.size, y: this.size }
        var newPosition = { x: this.position.x, y: this.position.y }
        newPosition.x += velocity.x
        newPosition.y += velocity.y
        for (var x = newPosition.x; x < newPosition.x + dimensions.x; x++) {
            for (var y = newPosition.y; y < newPosition.y + dimensions.y; y++) {
                const relY = y + BLOCK_SIZE * (CHUNK_SIZE / this.size - 1)
                var block = world.getBlock(x, relY)
                if (block && block.type != BlockType.Air) {
                    if (BlockProps.get(block.type).isCollidable) {
                        if (velocity.y > 0) {
                            this.velocity.y = 0
                        } else if (velocity.y < 0) {
                            this.velocity.y = this.gravity
                            this.isOnGround = true
                        }
                        if (velocity.x !== 0) {
                            this.velocity.x = 0
                        }
                    } else if (block.type === BlockType.Water) {
                        this.isUnderWater = true
                    }
                }
            }
        }
    }

    update(world) {
        this.lastVelocity = this.velocity
        this.updateBlock()
        this.addToBuffer()
        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y

        if (this.isUnderWater) {
            this.gravity = 0.02
            this.speed = this.props.speedUnderWater
        } else {
            this.speed = this.props.speed
            this.gravity = this.props.gravity
        }

        this.acceleration = { x: 0, y: 0 }

        if (!this.isOnGround) {
            this.velocity.y -= this.gravity
        }

        this.isOnGround = false
        this.isUnderWater = false

        this.collide(world, { x: this.velocity.x, y: 0 })
        this.collide(world, { x: 0, y: this.velocity.y })

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.x *= this.props.velocityDrag

        if (this.isOnGround) {
            this.position.y = parseInt(this.position.y)
        }
    }

    updateBlock() {
        var stepBlocks = this.moveBlocks
        if (this.isUnderWater && this.swimBlocks) {
            stepBlocks = this.swimBlocks
        }
        const moveLength = stepBlocks.length
        const diffTime = (Date.now() - this.startMove) % (moveLength * this.delayMove)
        var updated = false
        if (Math.abs(this.velocity.x) > 0.1) {
            this.iBlockType = parseInt(diffTime / this.delayMove)
            updated = true
        } else if (this.iBlockType !== 0){
            this.iBlockType = 0
            updated = true
        }
        if(updated){
            this.blocks.fill(new Block(stepBlocks[this.iBlockType], { reverse: this.reverseBlock }))
            this.isBuffered = false
        }
    }

    draw(renderer) {
        if (this.isBuffered) {
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
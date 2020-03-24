define(function (require) {

    const Block = require('../world/block/Block.js')
    const BlockType = Block.BlockType
    const Mesh = require('../world/Mesh.js')
    const BlockProps = require('../world/block/BlockProps.js')

    class Entity {
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
            this.neightbors = {}
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
                this.acceleration.y += (this.speed * this.props.forceJump)
            }
        }

        updateCollisionObject(x, y, block){
            const dY = this.position.y - y
            const dX = this.position.x - x
            if(dY >= BLOCK_SIZE){
                this.collisionObject.bottom = block.type
            }else if(dY <= -BLOCK_SIZE){
                this.collisionObject.top = block.type
            }
            if(dX >= BLOCK_SIZE){
                this.collisionObject.left = block.type
            }else if(dX <= -BLOCK_SIZE){
                this.collisionObject.right = block.type
            }
        }

        updateNeighbors(world){
            const {relX, relY} = this.getRelXY(this.position.x, this.position.y)
            this.neightbors = {
                top: world.getBlock(relX, relY + 2),
                bottom: world.getBlock(relX, relY - 2),
                left: world.getBlock(relX - 2, relY),
                right: world.getBlock(relX + BLOCK_SIZE + 1, relY)
            }
        }

        getRelXY(x, y){
            const relY = y + BLOCK_SIZE * (CHUNK_SIZE / this.size - 1)
            const relX = x
            return {relX, relY}
        }

        collide(world, velocity) {
            var dimensions = { x: this.size, y: this.size }
            var newPosition = { x: this.position.x, y: this.position.y }
            newPosition.x += velocity.x
            newPosition.y += velocity.y
            for (var x = newPosition.x; x < newPosition.x + dimensions.x; x++) {
                for (var y = newPosition.y; y < newPosition.y + dimensions.y; y++) {
                    const {relX, relY} = this.getRelXY(x, y)
                    var block = world.getBlock(relX, relY)
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
            this.updateNeighbors(world)
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
            } else if (this.iBlockType !== 0) {
                this.iBlockType = 0
                updated = true
            }
            if (updated) {
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

    return Entity
})
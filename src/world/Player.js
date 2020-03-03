class Player {
    constructor(position) {
        this.position = position
        this.isBuffered = false
        this.blocks = new Array(CHUNK_SIZE_BLOCK * CHUNK_SIZE_BLOCK)
        this.blocks.fill(new Block(BlockType.Bubble))
        this.mesh = new Mesh(position)
        this.acceleration = { x: 0, y: 0 }
        this.velocity = { x: 0, y: 0 }
        this.isOnGround = false
        this.isUnderWater = false
    }

    move(dx, dy) {
        this.acceleration.x = dx * this.speed
        this.acceleration.y = dy * this.speed
    }

    update(world) {
        this.addToBuffer()
        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y

        if (this.isUnderWater) {
            this.gravity = 0.01
            this.speed = 0.1
        } else {
            this.speed = 0.5
            this.gravity = 0.2
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
        this.velocity.x *= 0.9

        if (this.isOnGround) {
            this.position.y = parseInt(this.position.y)
        }
    }

    handleInput(window, world) {
        var keyboard = window.keyboard

        if (keyboard.isKeyPressed(CONTROLS.UP)) {
            if (this.isUnderWater) {
                this.move(0, 1)
            }
        }
        if (keyboard.isKeyPressed(CONTROLS.BOTTOM)) {
            if (this.isUnderWater) {
                this.move(0, -1)
            }
        }
        if (keyboard.isKeyPressed(CONTROLS.RIGHT)) {
            this.move(1, 0)
        }
        if (keyboard.isKeyPressed(CONTROLS.LEFT)) {
            this.move(-1, 0)
        }
        if (keyboard.isKeyPressed(CONTROLS.JUMP)) {
            this.jump()
        }
        if (keyboard.isKeyPressed(CONTROLS.MINE)) {
            this.mine(this.getDirection(keyboard), world)
        }
    }

    getDirection(keyboard) {
        return keyboard.isKeyPressed(CONTROLS.UP) << 0 |
            keyboard.isKeyPressed(CONTROLS.BOTTOM) << 1 |
            keyboard.isKeyPressed(CONTROLS.LEFT) << 2 |
            keyboard.isKeyPressed(CONTROLS.RIGHT) << 3
    }

    mine(direction, world) {
        if (direction) {
            var { x, y } = this.position
            if (direction === 1) {
                y += CHUNK_SIZE
            } else if (direction === 2) {
                y -= BLOCK_SIZE
            } else if (direction === 4) {
                x -= BLOCK_SIZE
            } else if (direction === 8) {
                x += CHUNK_SIZE
            }
            var block = world.getBlock(x, y)
            if(block && block.type != BlockType.Air && BlockProps[block.type].isCollidable){
                world.mine(x, y)
                world.updateChunk(x, y)
            }
        }
    }

    jump() {
        if (this.isOnGround) {
            this.acceleration.y += (this.speed * 13)
        }
    }

    collide(world, velocity) {
        var dimensions = { x: CHUNK_SIZE - 1, y: 0 }
        var newPosition = { x: this.position.x, y: this.position.y }
        newPosition.x += velocity.x
        newPosition.y += velocity.y
        for (var x = newPosition.x; x <= newPosition.x + dimensions.x; x++) {
            for (var y = newPosition.y - parseInt(dimensions.y / 2); y < newPosition.y + CHUNK_SIZE; y++) {
                var block = world.getBlock(x, y)
                if (block && block.type != BlockType.Air) {
                    if (BlockProps[block.type].isCollidable) {
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
class Player {
    constructor(position) {
        this.position = position
        this.isBuffered = false
        this.blocks = new Array(CHUNK_SIZE_BLOCK * CHUNK_SIZE_BLOCK)
        this.blocks.fill(new Block(BlockType.Bubble))
        this.mesh = new Mesh(position)
        this.speed = 0.5
        this.gravity = 0.2
        this.acceleration = { x: 0, y: 0 }
        this.velocity = { x: 0, y: 0 }
        this.isOnGround = false
    }

    move(dx, dy) {
        this.acceleration.x = dx * this.speed
        this.acceleration.y = dy * this.speed
    }

    update(world) {
        this.addToBuffer()
        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y
        this.acceleration = { x: 0, y: 0 }
        if (!this.isOnGround) {
            this.velocity.y -= this.gravity
        }

        this.isOnGround = false
        this.collide(world, { x: this.velocity.x, y: 0 })
        this.collide(world, { x: 0, y: this.velocity.y })

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.x *= 0.9

        if (this.isOnGround) {
            this.position.y = parseInt(this.position.y)
        }
    }

    handleInput(window) {
        var keyboard = window.keyboard
        //right
        if (keyboard.isKeyPressed(39)) {
            this.move(1, 0)
        }
        //left
        else if (keyboard.isKeyPressed(37)) {
            this.move(-1, 0)
        }
        //space
        else if (keyboard.isKeyPressed(32)) {
            this.jump()
        }
    }

    jump() {
        if (this.isOnGround) {
            this.acceleration.y += (this.speed * 15)
        }
    }

    collide(world, velocity) {
        var dimensions = { x: CHUNK_SIZE - 1, y: 3 }
        var newPosition = { x: this.position.x, y: this.position.y }
        newPosition.x += velocity.x
        newPosition.y += velocity.y
        for (var x = newPosition.x; x <= newPosition.x + dimensions.x; x++) {
            for (var y = newPosition.y - parseInt(dimensions.y / 2); y < newPosition.y; y++) {
                var block = world.getBlock(x, y)
                if (block && block.type != BlockType.Air) {
                    if (velocity.y > 0) {
                        this.velocity.y = 0
                    } else if (velocity.y < 0) {
                        this.velocity.y = this.gravity
                        this.isOnGround = true
                    }
                    if (velocity.x !== 0) {
                        this.velocity.x = 0
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
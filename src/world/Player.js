import Block, { BlockType } from './block/Block.js'
import Mesh from './Mesh.js'
import { MouseButton } from '../core/Mouse.js'
import BlockProps from './block/BlockProps.js'
import Creature from '../core/Creature.js'

export default class Player extends Creature{
    constructor(position) {
        super({
            moveBlocks: [BlockType.Player, BlockType.PlayerMove],
            swimBlocks: [BlockType.PlayerSwim1, BlockType.PlayerSwim2],
            position: position
        })
    }

    update(world) {
        this.updateBlock()
        this.addToBuffer()
        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y

        if (this.isUnderWater) {
            this.gravity = 0.02
            this.speed = 0.5
        } else {
            this.speed = 1
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
        this.velocity.x *= 0.5

        if (this.isOnGround) {
            this.position.y = parseInt(this.position.y)
        }
    }

    handleInput(window, world, camera) {
        var keyboard = window.keyboard
        var mouse = window.mouse

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
        if (mouse.isButtonPressed(MouseButton.LEFT)) {
            this.mine(mouse.position, world, camera)
        }
    }

    getDirection(keyboard) {
        return keyboard.isKeyPressed(CONTROLS.UP) << 0 |
            keyboard.isKeyPressed(CONTROLS.BOTTOM) << 1 |
            keyboard.isKeyPressed(CONTROLS.LEFT) << 2 |
            keyboard.isKeyPressed(CONTROLS.RIGHT) << 3
    }

    mine(position, world, camera) {
        if (position) {
            const { x, y } = camera.fromCanvasCoord(position)
            var relY = y + BLOCK_SIZE * (CHUNK_SIZE / this.size)
            var block = world.getBlock(x, relY)
            if (block && block.type != BlockType.Air) {
                world.mine(x, relY)
                world.updateChunk(x, relY)
            }
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
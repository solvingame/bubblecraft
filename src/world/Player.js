import { MouseButton } from '../core/Mouse.js'
import Entity from '../core/Entity.js'
import { BlockType } from './block/Block.js'

export default class Player extends Entity{
    constructor(position) {
        super({
            moveBlocks: [BlockType.Player, BlockType.PlayerMove],
            swimBlocks: [BlockType.PlayerSwim1, BlockType.PlayerSwim2],
            position: position,
            delayMove: 200,
            props: {
                speed: 1,
                speedUnderWater: 0.5,
                gravity: 0.2,
                velocityDrag: 0.5
            }
        })
    }

    handleInput(window, world, camera) {
        var keyboard = window.keyboard
        var mouse = window.mouse
        var direction = this.getDirection(keyboard)
        if(direction){
            this.move(direction)
        }
        if (keyboard.isKeyPressed(CONTROLS.JUMP)) {
            this.jump()
        }
        if (mouse.isButtonPressed(MouseButton.LEFT)) {
            this.mine(mouse.position, world, camera)
        }
    }

    getDirection(keyboard) {
        return keyboard.isKeyPressed(CONTROLS.UP) << DIRECTION.UP |
            keyboard.isKeyPressed(CONTROLS.BOTTOM) << DIRECTION.BOTTOM |
            keyboard.isKeyPressed(CONTROLS.LEFT) << DIRECTION.LEFT |
            keyboard.isKeyPressed(CONTROLS.RIGHT) << DIRECTION.RIGHT
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
}
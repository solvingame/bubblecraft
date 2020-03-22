import Entity from '../../core/Entity.js'
import { BlockType } from '../block/Block.js'
import Random from '../../utils/Random.js'

export default class Creature extends Entity {
    constructor(position) {
        super({
            moveBlocks: [BlockType.BubbleRed, BlockType.BubbleRedMove1, BlockType.BubbleRedMove2, BlockType.BubbleRedMove1],
            position: position,
            delayMove: 100,
            props: {
                speed: 0.5,
                speedUnderWater: 0.5,
                gravity: 0.2,
                velocityDrag: 0.9
            }
        })
        this.waitNexMove = 500
        this.startMove = Date.now()
    }

    nextMove() {
        const diffTime = parseInt((Date.now() - this.startMove) % this.waitNexMove)
        if(diffTime < 100){
            const rand = Random.get(Date.now()).intInRange(0, 10)
            var keyboard = null
            if (rand === 2) {
                this.jump()
            }else if (rand >= 5) {
                keyboard = DIRECTION.RIGHT
            } else if (rand >= 1) {
                keyboard = DIRECTION.LEFT
            }
            if (keyboard) {
                this.move(1 << keyboard)
            }
        }
    }
}
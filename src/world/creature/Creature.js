define(function (require) {

    const Entity = require('../../core/Entity.js')
    const { BlockType } = require('../block/Block.js')
    const Random = require('../../utils/Random.js')

    class Creature extends Entity {
        constructor(position) {
            super({
                moveBlocks: [BlockType.BubbleRed, BlockType.BubbleRedMove1, BlockType.BubbleRedMove2, BlockType.BubbleRedMove1],
                position: position,
                delayMove: 100,
                props: {
                    speed: 0.5,
                    forceJump: 10,
                    speedUnderWater: 0.5,
                    gravity: 0.2,
                    velocityDrag: 0.9
                }
            })
            this.waitNexMove = 100
            this.timeChangeDirection = 6000
            this.targetPosition = 0
            this.startMove = Date.now()
            this.blocked = false
        }

        goToPosition(){
            const diffDistance = this.targetPosition - this.position.x
            var keyboard = null
            if(diffDistance > 0){
                keyboard = DIRECTION.RIGHT
            }else if(diffDistance < 0){
                keyboard = DIRECTION.LEFT
            }
            if (keyboard) {
                this.move(1 << keyboard)
            }
            if(this.lastPosition && diffDistance !== 0 && this.blocked){
                this.jump()
            }
        }

        nextMove(){
            const diffTimeChangedirection = parseInt((Date.now() - this.startMove) % this.timeChangeDirection)
            const diffTime = parseInt((Date.now() - this.startMove) % this.waitNexMove)
            if (diffTime < 10) {
                if(diffTimeChangedirection < 50){
                    const rand = Random.get(Date.now()).intInRange(-10, 10)
                    this.targetPosition = this.position.x + rand * BLOCK_SIZE
                }
                this.goToPosition()
                this.lastPosition = this.position
            }
        }

        nextRandomMove() {
            const diffTime = parseInt((Date.now() - this.startMove) % this.waitNexMove)
            if (diffTime < 10) {
                const rand = Random.get(Date.now()).intInRange(0, 10)
                var keyboard = null
                if (rand === 2) {
                    this.jump()
                } else if (rand >= 5) {
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

    return Creature
})
define(function (require) {

    const Entity = require('../../core/Entity.js')
    const { BlockType } = require('../block/Block.js')
    const Random = require('../../utils/Random.js')
    const BlockProps = require('../block/BlockProps.js')

    class Creature extends Entity {
        constructor(position) {
            super({
                moveBlocks: [],
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
            this.timeUpdateDirection = 6000
            this.targetPosition = 0
            this.startDateMove = Date.now()
            this.startDateNewTargetPosition = Date.now()
            this.blocked = false
        }

        setType(type){
            this.type = type
            this.setBlockTypes({
                moveBlocks: type.moveBlocks,
                swimBlocks: type.swimBlocks,
                jumpBlocks: type.jumpBlocks,
                attackBlocks: type.attackBlocks
            })
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
            if(
                (keyboard === DIRECTION.RIGHT && BlockProps.get(this.neightbors.right.type).isCollidable) ||
                (keyboard === DIRECTION.LEFT && BlockProps.get(this.neightbors.left.type).isCollidable)
            ){
                this.jump()
            }
        }

        updateNextTargetPosition(){
            if(
                Date.now() - this.startDateNewTargetPosition > this.timeUpdateDirection ||
                Math.abs(this.position.x - this.targetPosition) < 1){
                const rand = Random.get(Date.now()).intInRange(-10, 10)
                this.targetPosition = this.position.x + rand * BLOCK_SIZE
                this.startDateNewTargetPosition = Date.now()
            }
        }

        nextMove(){
            if(Date.now() - this.startDateMove > this.waitNexMove){
                this.updateNextTargetPosition()
                this.goToPosition()
                this.startDateMove = Date.now()
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
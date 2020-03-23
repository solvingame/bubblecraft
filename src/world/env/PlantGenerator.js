define(function (require) {
    const { BlockType } = require('../block/Block.js')
    const Random = require('../../utils/Random.js')

    class PlantGenerator {
        static make(chunk, plant) {
            var plantType = BlockType.Plant
            const rand = Random.get(parseInt(plant.x)).intInRange(1, 10)
            if (rand > 6) {
                plantType = BlockType.FlowerBlue
            } else if (rand > 4) {
                plantType = BlockType.FlowerRed
            }
            chunk.setBlock(
                plant.x,
                plant.y,
                plantType
            )
        }
    }

    return PlantGenerator
})
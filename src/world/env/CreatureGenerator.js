define(function (require) {
    const creatures = require('../../../res/creatures.js')

    class CreatureGenerator {
        static make(creature) {
            const creatureTypes = Object.keys(creatures)
            var creatureType = null
            const rand = 1 + parseInt(Math.random() * 10)
            if (rand > 4) {
                creatureType = creatureTypes[0]
            } else {
                creatureType = creatureTypes[1]
            }
            creature.setType(creatures[creatureType])
        }
    }

    return CreatureGenerator
})
define(function (require) {

    const CreatureGenerator = require('./env/CreatureGenerator.js')
    const Creature = require('./creature/Creature.js')

    class CreatureManager {
        constructor(world) {
            this.creatures = []
            this.world = world
        }

        static get(world) {
            if (!CreatureManager.instance) {
                CreatureManager.instance = new CreatureManager(world)
            }
            return CreatureManager.instance
        }

        getCreatureAt(x, y) {
            return this.creatures.find((element) => element.position.x === x && element.position.y === y)
        }

        getCreature(x, y) {
            const creature = this.getCreatureAt(x, y)
            if (!creature) {
                console.log(creature)
                const element = new Creature({ x, y })
                this.creatures.push(element)
            }
            return this.getCreatureAt(x, y)
        }

        load(x, y) {
            const creature = this.getCreature(x, y)
            CreatureGenerator.make(creature)
        }

        update(world) {
            for (const iCreature in this.creatures) {
                this.creatures[iCreature].update(world)
                this.creatures[iCreature].nextMove()
            }
        }

    }

    CreatureManager.instance = null

    return CreatureManager
})
const BlockType = {
    Air: 0,
    Grass: 1,
    Water: 2,
    Sand: 3,
    Dirt: 4,
    Snow: 5,
    Stone: 6,
    Wood: 7,
    Leaf: 8,
    Plant: 9,
    Bubble: 10
}

class Block{
    constructor(type = BlockType.Air, mineLevel = 0){
        this.type = type
        this.mineLevel = mineLevel
    }
}
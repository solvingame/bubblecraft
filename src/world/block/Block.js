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
    Bubble: 9
}

class Block{
    constructor(type = BlockType.Air){
        this.type = type
    }
}
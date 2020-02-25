const BlockType = {
    Air: 0,
    Grass: 1,
    Water: 2,
    Sand: 3,
    Dirt: 4,
    Snow: 5,
    Bubble: 6
}

class Block{
    constructor(type = BlockType.Air){
        this.type = type
    }
}
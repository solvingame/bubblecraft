export const BlockType = {
    Air: "air",
    Grass: "grass",
    Water: "water",
    Sand: "sand",
    Dirt: "dirt",
    Snow: "snow",
    Stone: "stone",
    Wood: "wood",
    Leaf: "leaf",
    Plant: "plant",
    Bubble: "bubble"
}

export default class Block{
    constructor(type = BlockType.Air, mineLevel = 0){
        this.type = type
        this.mineLevel = mineLevel
    }
}
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
    FlowerRed: "flowerRed",
    FlowerBlue: "flowerBlue",
    Player: "player",
    PlayerMove: "playerMove",
    PlayerSwim1: "playerSwim1",
    PlayerSwim2: "playerSwim2"
}

export default class Block{
    constructor(type = BlockType.Air, options = {}){
        this.type = type
        this.mineLevel = options.mineLevel ? options.mineLevel : 0
        this.reverse = options.reverse ? true : false
    }
}
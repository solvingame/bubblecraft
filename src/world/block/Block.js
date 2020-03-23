define(function () {

    class Block {
        constructor(type = Block.BlockType.Air, options = {}) {
            this.type = type
            this.mineLevel = options.mineLevel ? options.mineLevel : 0
            this.reverse = options.reverse ? true : false
        }
    }

    Block.BlockType = {
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
        PlayerSwim2: "playerSwim2",
        BubbleRed: "bubbleRed",
        BubbleRedMove1: "bubbleRedMove1",
        BubbleRedMove2: "bubbleRedMove2"
    }

    return Block
})
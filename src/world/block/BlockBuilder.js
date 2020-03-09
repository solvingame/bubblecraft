class BlockBuilder{
    static instance = null
    constructor(){
        this.blockBuilders = {
            [BlockType.Grass]: new GrassBuilder(),
            [BlockType.Water]: new WaterBuilder(),
            [BlockType.Sand]: new SandBuilder(),
            [BlockType.Dirt]: new DirtBuilder(),
            [BlockType.Snow]: new SnowBuilder(),
            [BlockType.Stone]: new StoneBuilder(),
            [BlockType.Wood]: new WoodBuilder(),
            [BlockType.Leaf]: new LeafBuilder(),
            [BlockType.Plant]: new PlantBuilder(),
            [BlockType.Bubble]: new BubbleBuilder()
        }
    }
    static get(block){
        if(!BlockBuilder.instance){
            BlockBuilder.instance = new BlockBuilder()
        }
        return BlockBuilder.instance.getBlock(block)
    }
    getBlock(block){
        return this.blockBuilders[block.type]
    }
}
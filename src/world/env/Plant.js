class Plant{
    static make(chunk, plant){
        chunk.setBlock(
            plant.x,
            plant.y,
            BlockType.Plant
        )
    }
}
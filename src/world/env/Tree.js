class Tree{
    static make(chunk, tree){
        const height = Random.get(parseInt(tree.x)).intInRange(3, 6)
        for(var y = 1; y <= height; y++){
            chunk.world.setBlock(chunk.position.x + tree.x, tree.y + y * BLOCK_SIZE, BlockType.Wood)
        }

        const heightLeaf = Random.get(parseInt(tree.x)).intInRange(2, 4)
        for(var iHeightLeaf = 0; iHeightLeaf < heightLeaf; iHeightLeaf ++){
            var leafSize = heightLeaf - iHeightLeaf
            for(var xLeaf = -leafSize; xLeaf < leafSize; xLeaf++){
                const xWorld = chunk.position.x + tree.x + xLeaf * BLOCK_SIZE
                const yWorld = tree.y + (height + iHeightLeaf) * BLOCK_SIZE
                chunk.world.setBlock(
                    xWorld,
                    yWorld,
                    BlockType.Leaf
                )
            }
        }
    }
}
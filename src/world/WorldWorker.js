importScripts('/src/require.js')
importScripts('/src/core/Constants.js')

requirejs([
    '/src/utils/NoiseGenerator.js',
    '/src/world/World.js',
    '/src/world/Player.js',
    '/src/world/block/BlockTex.js',
    '/src/renderer/Renderer.js'
], function (NoiseGenerator, World, Player, BlockTex, Renderer) {
    class WorldWorker {
        constructor() {
            const seed = Math.random() * 10000
            const noiseGenerator = new NoiseGenerator(seed)
            this.world = new World(noiseGenerator)
            this.player = new Player({ x: 50000, y: 1000 })
            this.renderer = new Renderer()
        }
        load(camera) {
            this.world.loadChunks(camera)
            this.world.update()
            this.player.update(this.world)
            this.world.draw(this.renderer, camera)
            this.player.draw(this.renderer)
            postMessage({
                renderer: this.renderer
            })
        }
    }

    onmessage = function (e) {
        const worldWorker = new WorldWorker()
        BlockTex.instance = new BlockTex({
            width: 500,
            height: 500
        })
        BlockTex.instance.update(e.data.texData)
        worldWorker.load(e.data.camera)
    }

})

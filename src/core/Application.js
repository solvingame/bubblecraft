import Window from './Window.js'
import World from '../world/World.js'
import Player from '../world/Player.js'
import BlockTex from '../world/block/BlockTex.js'

export default class Application {
    constructor(renderer, noiseGenerator, camera) {
        this.title = 'Bubblecraft'
        this.renderer = renderer
        this.camera = camera
        this.window = new Window()
        this.world = new World(noiseGenerator)
        this.player = new Player({ x: 50000, y: 1000 })
        this.startTimeFPS = Date.now()
        this.startTimePlay = Date.now()
        this.appTime = null
        this.oneTimeDay = 600
        this.nbFrame = 0
        this.runLoop = this.runLoop.bind(this)
    }

    start(){
        this.init().then(
            this.runLoop
        )
    }

    loadEvents() {
        this.window.initEvents()
    }

    runLoop() {
        this.updateFPS()
        this.updateAppTime()
        this.camera.update(this.player.position)
        this.world.loadChunks(this.camera)
        this.world.update()
        this.world.draw(this.renderer, this.camera)
        this.player.update(this.world)
        this.player.draw(this.renderer)
        this.renderer.clear()
        this.renderer.render(this.camera, this.appTime)
        this.player.handleInput(this.window, this.world, this.camera)
        requestAnimationFrame(this.runLoop)
    }

    init(){
        this.loadEvents()
        return BlockTex.load()
    }

    updateAppTime() {
        const timeRel = ((Date.now() - this.startTimePlay) % (this.oneTimeDay * 1000)) / (this.oneTimeDay * 1000 / 2)
        this.appTime = timeRel / 2
    }

    updateFPS() {
        const deltaTime = (Date.now() - this.startTimeFPS) / 1000
        if (deltaTime > 1) {
            document.title = `${this.title} - (${parseInt(this.nbFrame / deltaTime)} FPS)`
            this.nbFrame = 0
            this.startTimeFPS = Date.now()
        } else {
            this.nbFrame++
        }
    }
}
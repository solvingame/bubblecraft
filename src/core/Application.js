class Application {
    constructor(title, renderer, noiseGenerator, camera) {
        this.title = title
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
        this.renderer.render(this.camera, this.appTime)
        this.player.handleInput(this.window, this.world)
        requestAnimationFrame(this.runLoop)
    }

    updateAppTime() {
        const timeRel = ((Date.now() - this.startTimePlay) % (this.oneTimeDay * 1000)) / (this.oneTimeDay * 1000 / 2)
        this.appTime = timeRel / 2
    }

    updateFPS() {
        const deltaTime = (Date.now() - this.startTimeFPS) / 1000
        if (deltaTime > 1) {
            document.title = `${title} - (${parseInt(this.nbFrame / deltaTime)} FPS)`
            this.nbFrame = 0
            this.startTimeFPS = Date.now()
        } else {
            this.nbFrame++
        }
    }
}
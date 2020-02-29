class Application {
    constructor(title, renderer, noiseGenerator, camera){
        this.title = title
        this.renderer = renderer
        this.camera = camera
        this.window = new Window()
        this.world = new World(noiseGenerator)
        this.player = new Player({x: 50000, y: 1000})
        this.startTime = Date.now()
        this.nbFrame = 0
        this.runLoop = this.runLoop.bind(this)
    }

    loadEvents(){
        this.window.initEvents()
    }

    runLoop() {
        this.updateFPS()
        this.camera.update(this.player.position)
        this.world.loadChunks(this.camera)
        this.world.draw(this.renderer, this.camera)
        this.player.update(this.world)
        this.player.draw(this.renderer)
        this.renderer.render(this.camera)
        this.player.handleInput(this.window)
        requestAnimationFrame(this.runLoop)
    }

    updateFPS() {
        const deltaTime = (Date.now() - this.startTime) / 1000
        if (deltaTime > 1) {
            document.title = `${title} - (${parseInt(this.nbFrame / deltaTime)} FPS)`
            this.nbFrame = 0
            this.startTime = Date.now()
        } else {
            this.nbFrame++
        }
    }
}
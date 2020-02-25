class Application {
    constructor(title, renderer, noiseGenerator, camera){
        this.title = title
        this.renderer = renderer
        this.camera = camera
        this.world = new World(noiseGenerator)
        this.player = new Player({x: 50000, y: 300})
        this.startTime = Date.now()
        this.nbFrame = 0
        this.runLoop = this.runLoop.bind(this)
    }

    loadEvents(){
        document.addEventListener('keydown', (event) => {
            const key = event.keyCode
            //up
            if(key === 38){
                this.player.move(0, 1)
            }
            //down
            else if(key === 40){
                this.player.move(0, -1)
            }
            //right
            else if(key === 39){
                this.player.move(1, 0)
            }
            //left
            else if(key === 37){
                this.player.move(-1, 0)
            }
        })
    }

    runLoop() {
        this.updateFPS()
        this.camera.update(this.player.position)
        this.renderer.clear()
        this.world.loadChunks(this.camera)
        this.world.draw(this.renderer, this.camera)
        this.player.update()
        this.player.draw(this.renderer)
        this.renderer.render(this.camera)
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
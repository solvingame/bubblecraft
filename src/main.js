const rootCanvas = document.getElementById('root')
const skyCanvas = document.getElementById('sky')
const context = rootCanvas.getContext('2d')
const contextSky = skyCanvas.getContext('2d')
const title = 'Bubblecraft'

context.canvas.width = WINDOW_WIDTH
context.canvas.height = WINDOW_HEIGHT
contextSky.canvas.width = WINDOW_WIDTH
contextSky.canvas.height = WINDOW_HEIGHT

const seed = Math.random() * 10000
var noiseGenerator = new NoiseGenerator(seed)

var camera = new Camera()
var renderer = new Renderer()
var app = new Application(title, renderer, noiseGenerator, camera)

app.loadEvents()
app.runLoop()
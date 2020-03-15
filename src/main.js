import NoiseGenerator from './utils/NoiseGenerator.js'
import Camera from './core/Camera.js'
import Renderer from './renderer/Renderer.js'
import Application from './core/Application.js'

const seed = Math.random() * 10000
//const seed = 1687.1076386247673
var noiseGenerator = new NoiseGenerator(seed)

var camera = new Camera()
var renderer = new Renderer()
var app = new Application(renderer, noiseGenerator, camera)

app.start()
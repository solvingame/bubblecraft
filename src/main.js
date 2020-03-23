define(function (require) {

    const NoiseGenerator = require('/src/utils/NoiseGenerator.js')
    const Camera = require('/src/core/Camera.js')
    const Renderer = require('/src/renderer/Renderer.js')
    const Application = require('/src/core/Application.js')

    const seed = Math.random() * 10000
    //const seed = 1687.1076386247673
    var noiseGenerator = new NoiseGenerator(seed)

    var camera = new Camera({ x: 50000, y: 1000 })
    var renderer = new Renderer()
    var app = new Application(renderer, noiseGenerator, camera)

    app.start()
})
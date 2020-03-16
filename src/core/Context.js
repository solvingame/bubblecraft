const rootCanvas = document.getElementById('root')
const skyCanvas = document.getElementById('sky')
const objectCanvas = document.getElementById('object')
const context = rootCanvas.getContext('2d')
const contextSky = skyCanvas.getContext('2d')
const contextObject = objectCanvas.getContext('2d')

context.canvas.width = WINDOW_WIDTH
context.canvas.height = WINDOW_HEIGHT
contextSky.canvas.width = WINDOW_WIDTH
contextSky.canvas.height = WINDOW_HEIGHT
contextObject.canvas.width = WINDOW_WIDTH
contextObject.canvas.height = WINDOW_HEIGHT
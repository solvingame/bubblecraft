const rootCanvas = document.getElementById('root')
const skyCanvas = document.getElementById('sky')
const context = rootCanvas.getContext('2d')
const contextSky = skyCanvas.getContext('2d')

context.canvas.width = WINDOW_WIDTH
context.canvas.height = WINDOW_HEIGHT
contextSky.canvas.width = WINDOW_WIDTH
contextSky.canvas.height = WINDOW_HEIGHT
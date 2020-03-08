const CHUNK_SIZE_BLOCK = 4
const BLOCK_SIZE = 25
const CHUNK_SIZE = CHUNK_SIZE_BLOCK * BLOCK_SIZE
const WINDOW_WIDTH = window.innerWidth
const WINDOW_HEIGHT = window.innerHeight
const WATER_LEVEL = 400
const LOG = false
const RENDER_DISTANCE = 10

const CONTROLS = {
    UP: 38,
    BOTTOM: 40,
    RIGHT: 39,
    LEFT: 37,
    JUMP: 32,
    MINE: 17
}
class Window{
    constructor(){
        this.keyboard = new Keyboard()
    }

    initEvents(){
        document.addEventListener('keydown', (event) => {
            const key = event.keyCode
            this.keyboard.setKeyPressed(key)
        })
        document.addEventListener('keyup', (event) => {
            const key = event.keyCode
            this.keyboard.setKeyReleased(key)
        })
    }
}
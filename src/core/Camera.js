class Camera{
    constructor(position){
        this.position = position
        this.speed = 5
    }
    move(dx, dy){
        this.position.x += dx * this.speed
        this.position.y += dy * this.speed
    }
    update(position){
        this.position = {
            x: position.x,
            y: WINDOW_HEIGHT - position.y
        }
    }
}
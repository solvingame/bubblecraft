class SkyRenderer{
    render(camera){
        var skyGradient = context.createLinearGradient(0, 0, 0, WINDOW_HEIGHT)
        skyGradient.addColorStop(0, '#a7e4ff')
        skyGradient.addColorStop(1, '#eff7fb')
        context.fillStyle = skyGradient
        context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    }
}
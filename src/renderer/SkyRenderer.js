class SkyRenderer{
    render(camera, appTime){
        var skyGradient = context.createLinearGradient(0, 0, 0, WINDOW_HEIGHT)
        appTime *= 2
        
        var skyColorTop = [167, 228, 255]
        var skyColorBottom = [239, 247, 251]
        
        const dayColor = 1
        const nightColor = 0.1
        var lightColor = dayColor * (1 - appTime) + nightColor * appTime
        if(appTime > 1){
            lightColor = dayColor * (appTime - 1) + nightColor * (2 - appTime)
        }
        
        skyColorTop = skyColorTop.map(color => color * lightColor)
        skyColorBottom = skyColorBottom.map(color => color * lightColor)

        skyGradient.addColorStop(0, `rgb(${skyColorTop.join(',')})`)
        skyGradient.addColorStop(1, `rgb(${skyColorBottom.join(',')})`)
        
        context.fillStyle = skyGradient
        context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    }
}
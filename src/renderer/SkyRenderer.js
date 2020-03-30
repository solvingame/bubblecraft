define(function () {

    class SkyRenderer {
        constructor(){
            //this.image = new Image()
            //this.image.src = '/res/parallax/mountain.jpg'
        }
        drawSky(appTime){
            var skyGradient = contextSky.createLinearGradient(0, 0, 0, WINDOW_HEIGHT)
            appTime *= 2

            var skyColorTop = [167, 228, 255]
            var skyColorBottom = [239, 247, 251]

            const dayColor = 1
            const nightColor = 0.1
            var lightColor = dayColor * (1 - appTime) + nightColor * appTime
            if (appTime > 1) {
                lightColor = dayColor * (appTime - 1) + nightColor * (2 - appTime)
            }

            skyColorTop = skyColorTop.map(color => color * lightColor)
            skyColorBottom = skyColorBottom.map(color => color * lightColor)

            skyGradient.addColorStop(0, `rgb(${skyColorTop.join(',')})`)
            skyGradient.addColorStop(1, `rgb(${skyColorBottom.join(',')})`)

            contextSky.fillStyle = skyGradient
            contextSky.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
        }
        drawParallax(){
            if(!this.startCamera){
                this.startCamera = camera.position
            }
            const x = (this.startCamera.x - camera.position.x) / 10
            contextSky.drawImage(this.image, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT, x, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
            contextSky.drawImage(this.image, 0, 0, x, WINDOW_HEIGHT, 500, 0, x, WINDOW_HEIGHT)
        }
        render(camera, appTime) {
            this.drawSky(appTime)
        }
    }

    return SkyRenderer
})
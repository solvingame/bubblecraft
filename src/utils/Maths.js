define(function () {
    class Maths {
        static smoothInterpolation(bottomLeft, topLeft, bottomRight, topRight,
            xMin, xMax,
            zMin, zMax,
            x, z) {
            var width = xMax - xMin,
                height = zMax - zMin
            var xValue = 1 - (x - xMin) / width
            var zValue = 1 - (z - zMin) / height

            var a = this.smoothstep(bottomLeft, bottomRight, xValue)
            var b = this.smoothstep(topLeft, topRight, xValue)
            return this.smoothstep(a, b, zValue)
        }

        static smoothstep(edge0, edge1, x) {
            x = x * x * (3 - 2 * x)
            return (edge0 * x) + (edge1 * (1 - x))
        }

        static distance(p1, p2){
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
        }
    }

    return Maths
})
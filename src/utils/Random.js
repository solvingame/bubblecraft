class Random{
    static intInRange(min, max){
        return parseInt(min + Math.random() * (max - min))
    }
}
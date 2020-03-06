class Random{
    static random = null
    constructor(){
        this.seed = Date.now()
    }
    setSeed(seed){
        this.seed = seed
    }
    static get(seed){
        if(!Random.random){
            Random.random = new Random()
        }
        if(seed){
            Random.random.setSeed(seed)
        }
        return Random.random
    }
    intInRange(min, max){
        const rand = (this.rand() + 1) / 2
        return parseInt(min + rand * (max - min))
    }
    rand(){
        var t = this.seed
        t = BigInt((t << 13) ^ t)
        t = (t * (t * t * 15731n + 789221n) + 1376312589n)
        t = parseInt(t.toString(2).slice(-31), 2)
        return 1.0 - t / 1073741824
    }
}
define(function () {
    class Log {
        static debug(msg) {
            if (LOG) console.log(msg)
        }
    }
    return Log
})
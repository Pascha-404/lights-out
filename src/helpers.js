function rndBoolean(){
    const rndNum = Math.floor(Math.random() * 10)
    if(rndNum <= 1){
        return true
    } else {
        return false
    }
}

export {rndBoolean};
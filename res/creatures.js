define(function(){

    return {
        "bubbleRed": {
            "health": 0.2,
            "moveBlocks": ['bubbleRed', 'bubbleRedMove1', 'bubbleRedMove2', 'bubbleRedMove1'],
            "moveType": "walk"
        },
        "bubbleBlue": {
            "health": 0.5,
            "moveBlocks": ['bubbleBlue', 'bubbleBlueJump'],
            "jumpBlocks": ['bubbleBlueJump'],
            "moveType": "jump"
        },
    }
    
    })
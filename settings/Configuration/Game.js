const config = require('../config.json')
const Game = require('../config.json')
const configFileName = require('../config.json')
const MarketGame = require('./Game.json')
const fs = require('fs')
const fileName = './Game.json'
const file = require(fileName);

for (var i in Game) {
	var item = config[i].Name;
	var appid = {
    TF2:   440,
    DOTA2: 570,
    CSGO:  730,
    Steam: 753
}
}
const Config = require('../../.././AdminOptions/Config.json');

const fs = require('fs')
const SteamTotp = require('steam-totp');
const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const SteamID = TradeOfferManager.SteamID;

const filestockname = './Items From Trade.json';
const filestock = require(filestockname);
var ID64 = Config.AdminID
if(!filestockname[Config.AdminID]){
fs.readFile(filestockname, (err, data) => {
if (err) throw err;
console.log('File read');
});
console.log('Writing to ' + filestockname);
filestock[SteamID] = ID64
fs.writeFile(filestockname, JSON.stringify(filestock, null, 2), function (err) {
if (err) return console.log(err);
console.log('Write Saved!');
});
}

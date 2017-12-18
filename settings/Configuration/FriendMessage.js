const config = require('../config.json')
const gameCodes = require('.././DataBase/Steam Codes.json')
const database = require('.././DataBase/Credits/Credit.json')
const Game = require('.//Game.json')
const SteamCommunity = require('steamcommunity');
const SteamTotp = require('steam-totp');
const SteamUser = require('steam-user');
const TradeOfferManager = require('steam-tradeoffer-manager');

const app = require('../../app.js')

const SteamID = TradeOfferManager.SteamID;
const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager ({
	steam: client,
	community: community,
	language: 'en',
});



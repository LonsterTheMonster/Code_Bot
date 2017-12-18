const config = require('.//settings/config.json')
if (config.IssueTracking == "Enable"){
var Raven = require('raven');
Raven.config('https://0a6d1f872b464102ad9b86e4d12113b7:37f5be982d9e476c9e681ced933031c0@sentry.io/207208').install();
} else {
    console.log ("\x1b[33m WARNING\x1b[37m: IssueTracking Disabled please enable issue tracking to get help faster when you are having problems.")
}
if (config.DevCode == "True"){
	console.log('\x1b[33m WARNING\x1b[37m: DEVEOPER OPTIONS ENABLED, DEVELOPER OPTIONS IS FOR EXPIRAMENTAL USE ONLY AND SHOULD BE FOR DEVELOPERS ONLY')
}
const da = require('dalogger')
const fs = require('fs')
const SteamTotp = require('steam-totp');
const SteamUser = require('steam-user');
const SteamTrade = require('steam-trade');
const steamTrade = new SteamTrade();
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const math = require('mathjs');
const colors = require('colors');
const jsonfile = require('jsonfile');
const SteamRepAPI = require('steamrep');

const GameCode = require('.//settings/Configuration/Game.js')
const Game = require('.//settings/Configuration/Game.json')
const adminConfig = require('.//AdminOptions/Config.json')
const CreatorConfig = require('.//CreatorProperties/Config.json');
const Name = require('.//settings/config.json');
const Games = require('.//AdminOptions/Games.json');
const messages = require('.//settings/Messages/messages.json');
const FriendChat = require('.//settings/Configuration/FriendMessage.js')

const Comments = require('.//settings/Comments/comments.json');
const CommentDB = require('.//settings/Database/Comments/CommentDB.json')

const FriendMess = require('.//settings/Configuration/FriendMessage.js')

const ItemsfromTrade = require('.//settings/Database/Items/Items From Trade.json')
const database = require('.//settings/Database/Credits/Credit.json')
const pricelist = require('.//settings/Database/pricelist.json')
const gameCodes = require('.//settings/Database/Steam Codes.json')
const ItemsforTrade = require('.//settings/Database/Items/Items From Trade.js')  

const SteamID = TradeOfferManager.SteamID;
const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager ({
	steam: client,
	community: community,
	language: 'en',
});
	
console.log("\x1b[8m SteamTrade Bot")
console.log("\x1b[33m Current Version:\x1b[35m 2.5.0")
console.log("\x1b[33mCreator:\x1b[35m http://Github.com/Lonster_Monster")
console.log("\x1b[33mIssues with the Bot:\x1b[35m https://github.com/LonsterMonster/Steam-Trade-Node-Bot/issues")
console.log("\x1b[33mIdeas for the Bot:\x1b[35m http://steamcommunity.com/groups/MarketWH/discussions/0/\x1b[0m")
console.log(" ")
console.log(" ")
const logOnOptions = {
	accountName: config.username,
	password: config.password,
	twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    da.status('succesfully logged on.');
    client.setPersona(SteamUser.Steam.EPersonaState.Online,config.SteamName);
    client.gamesPlayed([Games.Game1,Games.Game2]);
});
client.on('friendRelationship', (steamID, relationship) => {
    if (relationship === 2) {
        client.addFriend(steamID);
        client.chatMessage(steamID, messages.WELCOME);
	    client.chatMessage(steamID, messages.WELCOME2);
    }
});


client.on('webSession', (sessionid, cookies) => {
	manager.setCookies(cookies);

	community.setCookies(cookies);
	community.startConfirmationChecker(20000, config.identitySecret);
});

client.on('friendMessage', function(steamID, message){
if((steamID == config.OwnerID)&&(message == "!commands")){
		client.chatMessage(steamID, '\n' + "!help - Displays the input for command that needs it" + '\n' + "!commands - Shows all available commands" + '\n' + "!GameID - Sees the Trading GameID" + '\n' + "!Stop - Stops the Current nodejs Session" + '\n' + "!withdraw - Withdraw your items the bot may have" + '\n' + "!tradelink - Change/Set your trade link")
	}else if((steamID == config.OwnerID)&&(message == "!help GameID")){
		conole.log("The GameID command is to see which Game it will Accept Trades from.")
	}else if((steamID == config.OwnerID)&&(message == "!GameID")){
		console.log("the Game Name is: "+ Game.ID)
	}else if((steamID == config.OwnerID)&&(message == "!withdraw")){
		var offer = manager.createOffer(steamID)
		offer.addMyItems(ItemsfromTrade[steamID.toString()].items)
		offer.setMessage("Withdraw from Code bot")
		offer.send(function(err, status){
		if(err) da.error(err)
		else client.chatMessage(steamID, "Your withdrawal status: " + status)
		})
	} else {client.chatMessage(steamID, "You are not the Bot Owner so you cant use this command")
	}
	if (message == "!Command"){
		client.chatMessage(steamID, '\n' + "!help - Displays the input for command that needs it" + '\n' + "!commands - Shows all available commands" + '\n' + "!GameCode - Shows the Current list of Game Codes I sell" + '\n' + "balance - Shows Your Current Credit Balance")
		}
	if(message == "!GameCode"){
		client.chatMessage(steamID, "These are the game codes I have : Freebie, Germ Wars, Monster Puzzle, Warriors of Vilvatikta, Hyper color ball, Super Space Pug, Cosmic Dust & Rust, The Tower Of Elements, $1 Ride, Clergy Splode, Deep Space Dash, Escape Machines, Star Drifter, Stellar 2D, Ampersand, OR, The Land of Dasthir, 7 Wonders II, 7 Wonders of The Ancient World, 7 Wonders: Ancient Alien Makeover, 7 Wonders: Magical Mystery Tour, 7 Wonders: Treasures of Seven, Adventures of Robinson Crusoe, Angelica Weaver: Catch Me When You Can, Chainz 2: Relinked, Discovery! A Seek and Find Adventure, Gardens Inc. – From Rakes to Riches, Gardens Inc. 2: The Road to Fame, Glowfish, Little Farm, Luxor 2 HD, Luxor 3, Luxor Evolved, Luxor HD, Luxor: 5th Passage, LUXOR: Mah Jong, Luxor: Quest for The Afterlife, Midnight Mysteries, Midnight Mysteries 3: Devil on The Mississippi, Midnight Mysteries 4: Haunted Houdini, Midnight Mysteries: Salem Witch Trials, Midnight Mysteries: Witches of Abraham - Collector's Edition, Pickers, Reaxxion, Robinson Crusoe and The Cursed Pirates, Samantha Swift and The Golden Touch, Samantha Swift and The Hidden Roses of AThena, The Fool, Zombie Bowl-o-Rama, Gunnheim, Hektor - Official Soundtrack DLC, Schein, Soulless: Ray Of Hope, Avencast: Rise of The Mage, Chains, Crash Time 2, Dark Matter, Larva Mortus, Nikopol: Secrets of The Immortals, Obulis, Orange Moon, Rhiannon: Curse of The Four Branches, Space Hack, Space Trader: Merchant Marine, Starion Tactics, Tank Universal, Vive le Roi, Wasteland Angel, Agent Awesome, Battleplan: American Civil War, Canyon Capers, Cataegis : The White Wind, Cobi Treasure Deluxe, Commando Jack, DarkEnd, Gold Rush! Classic,  Gun Metal, Heckabomb, Hostile Waters: Antaeus Rising, Incoming Forces, International Snooker, Ionball 2: Ionstorm, Litil Divil, Melissa K. and The Heart of Gold Collector's Edition, Normality, Nosferatu: The Wrath of Malachi, Numba Deluxe, Pester, Platypus II, Realms of The Haunting, Showtime!, Slipstream 5000, Soulbringer, Street Racing Syndicate, Super Killer Hornet: Resurrection, The Culling Of The Cows, The Dark Stone from Mebara, Pixel Puzzles: Japan, Pixel Puzzles: UndeadZ, Pressured, RADical ROACH Deluxe Edition, Steam Heroes, Uriel'sChasm, Uriel'sChasm 2: את")
	}else if(gameCodes[message]){
		if(database[steamID.toString()] < gameCodes[message].value){
			client.chatMessage(steamID, "Sorry but you don't have enought to redeem that game")
			}else{
			client.chatMessage(steamID, gameCodes[message].keys[0])
			databaseUpdate(steamID.toString(), -gameCodes[message].value)
			gameCodes[message].keys.shift()
			fs.writeFile('gamecodes.json', JSON.stringify(gameCodes, null, '\t'), function(err){
				if(err) da.error(err.message)
				else da.status("Game Codes updated")
			})
		}
	}
	if(message == "!tradelink"){
		const filestockname = './/settings/Database/Items/Items From Trade.json';
		const filestock = require(filestockname);
		fs.writefile[steamID.toString()].tradelink 
		client.chatMessage(steamID, "You successfully changed/set your tradelink")
	}
	if(message == "balance"){
		if(database[steamID.toString()]){
			client.chatMessage(steamID, "You have " + database[steamID.toString()] + " credits")
		}else{
			client.chatMessage(steamID, "You have 0 credits")
		}
	}
})

function declineTrade(offer){
	offer.decline(function(err){
		if(err) da.error(err.message)
		else da.trade("Declined trade")
	})
}

function acceptTrade(offer){
	offer.accept(function(err){
		if(err) da.error(err.message)
		else da.trade("Accepted trade")
	})
}
function ItemsTrade(id,Itemname){
	fs.readFile('.//settings/Database/Items From Trade.json', (err, data)=> {
	 if (err) throw err;
	 console.log(data);
	 Global_data = data
	});
	fs.writeFile('.//settings/Database/Items From Trade.json', data[id.items].Itemname, (err) => {
	 if (err) throw err;
	 console.log("It's saved!");
	});
}
function checkTheirItem(offer){
	for(item of offer.itemsToReceive){
		if(item.appid !== Game.ID){
			return false
		}
		if(!pricelist[item.market_hash_name]){
			return false
		}
	}
	return true
}

function calculateTheirs(offer){
	var value = 0
	for(item of offer.itemsToReceive){
		value += pricelist[item.market_hash_name]
		ItemsTrade(config.OwnerID,item.market_hash_name)
	}
	return value
}

function databaseUpdate(id, Credits){
	if(database[id]){
		database[id].value += Credits
	}else{
		database[id].value = Credits
	}
	fs.writeFile('.//settings/Database/Credits/Credit.json', JSON.stringify(database, null, '\t'), function(err){
		if(err) da.error(err.message)
		else da.status("Updated Credit database")
	})
}
function commentDBUpdate (id){
	if (CommentDB[id]){
		if(CommentDB[id].value > 0){
		CommentDB[id].value	-= 1
		}
	}else{
		CommentDB[id] = value
	}
	fs.writeFile('.//settings/Database/Comments/CommentDB.json', JSON.stringify(CommentDB, null, '\t'), function(err){
		if(err) da.error(err.message)
		else da.status("Updated Comment database")
	})
}
function CommentDBAdder (id){
	if (CommentDB[id]){
		if(CommentDB[id].value = 0){
		CommentDB[id].value	+= config.Trades_b4_Comments
		}
	}else{
		CommentDB[id] = value
	}
fs.writeFile('.//settings/Database/Comments/CommentDB.json', JSON.stringify(CommentDB, null, '\t'), function(err){
		if(err) da.error(err.message)
		else da.status("Updated Comment database")
	})
}
manager.on('newOffer', function(offer){
	da.trade("We received a new offer")
	
	console.log(offer.itemsToGive.length == 0)
	if(offer.itemsToGive.length == 0){
		if(checkTheirItem(offer)){
			acceptTrade(offer)
			databaseUpdate(offer.partner.toString(), calculateTheirs(offer))
			commentDBUpdate(offer.partner.toString())
		}
	}
})


function CommentCode(offer) {
community.postUserComment(offer.partner.toString(), config.TradeComment, (err)=>{
if(err) throw err.message
console.log("Commented on " + offer.partner.toString() + "'s profile")})
}


manager.on('receivedOfferChanged', (offer)=>{
	if (offer.state === 7){
		client.chatMessage(steamID, messages.OfferDifferent);
	}
	if(offer.state === 3){
		if (CommentDB[offer.partner.toString()] == 0){
			if(CommentCode(offer)){
				CommentDBAdder(offer.partner.toString())
			}
		}
	}
})

client.setOption("promptSteamGuardCode", false);

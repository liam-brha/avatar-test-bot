const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios")

client.on("ready", () => {
	console.log(`success. username is ${client.user.tag}`)
});

client.on("message", msg => {
	// there has to be a better way to do this but uh
	if(msg.content.split(" ")[0] === ">avatar") {
		if(msg.content.split(" ").length > 1) {
			try {
				client.users.fetch(msg.content.split("!")[1].split(">"[0])[0])
				.then(result => msg.channel.send("https://cdn.discordapp.com/avatars/" + result.id +"/" + result.avatar + "?size=1024"))
			}
			catch(err) {
				msg.channel.send("https://cdn.discordapp.com/avatars/" + msg.author.id +"/" + msg.author.avatar + "?size=1024")
			}
		}
		else {
			msg.channel.send("https://cdn.discordapp.com/avatars/" + msg.author.id +"/" + msg.author.avatar + "?size=1024")
		}
	}
	if(msg.content.split(" ")[0] === ">count") {
		axios.get(process.env.myspcalapi, {headers: {"usertype": "bot"}}).then(result => msg.channel.send(result.headers.number)) // if you wondering what that api is go look at my other repo
	};
	if(msg.content.split(" ")[0] === ">log") {
		var array = []
		msg.channel.messages.fetch({limit: 100}).then(result => {
			array = result.map(currentValue => currentValue.author.username + ": " + currentValue.content)
			for(i = array.length; i >= 0; i--) {
				console.log(array[i])
			}
		})
		
		// increasing arrow function fluency
		// and learning how to deal with maps
	}
})

client.login(process.env.token) // heroku enviroment varibles
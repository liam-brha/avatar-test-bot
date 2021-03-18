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
		let value = async () => {return await axios.get(process.env.myspcalapi)} // if you wondering what that api is go look at my other repo
		value().then(result => msg.channel.send(result.data)) // i feel as if ive undermined the point of doing async like that but i dont understand it throughly enough
	}
	if(msg.content.split(" ")[0] === ">k") {
		let value = async () => {return await axios.get("https://skolwebapp.herokuapp.com/endpointTest")}
		value().then(result => console.log(result))
	}
})

client.login(process.env.token) // heroku enviroment varibles

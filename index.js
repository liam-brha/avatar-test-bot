
const Discord = require("discord.js");
const client = new Discord.Client();

class cdnURL {
	constructor(usrId, fileName) {
		this.usrId = usrId;
		this.fileName = fileName;
	}
	get fullURL() {
		avatarURL = "https://cdn.discordapp.com/avatars/" + this.usrId +"/" + this.fileName + "?size=1024";
	}
}

function isValidId(id) {
	// Msg str at this point should be ">avatar <@!42838xxxxxxxxxxxxx>"
	try {
		// per message evalutation of if ok \\\ todo: add guild arg
		client.guilds.get()
		msg.content.split("!")[1].split(">"[0])[0]
	}
	catch(e) { return false; }
}

async function getCdnObj(messageAuthor, ARGS) {
	if(ARGS.length && isValidId(ARGS[0])) {
		return client.users.fetch(USRID)
		.then(result => cdnURL(result.id, result.avatar));
	}
	else {
		return cdnURL(messageAuthor.id, messageAuthor.avatar);
	}
}

client.on("ready", () => {
	console.log(`success. username is ${client.user.tag}`);
});

client.on("message", async msg => {
	const ARGS = msg.content.split(" ").pop(0);
	const COMMAND = msg.content.split(" ")[0];
	
	if(COMMAND == ">avatar") {
		let cdnObj = await getCdnObj(msg.author, ARGS);
		msg.channel.send(cdnObj.fullURL());
	}
})

client.login(process.env.token)
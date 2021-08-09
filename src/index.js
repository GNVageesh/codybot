const Discord = require("discord.js");
const client = new Discord.Client();

// Token from Railway
const TOKEN = process.env.DISCORD_TOKEN;
const prefix = "!";

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	if (command === "ping") {
		msg.reply("Pong 🏓");
	} else if (!message.content.startsWith("!") || message.author.bot) {
		return;
	} else if (command === "abt-me") {
		message.channel.send(
			`${message.author.createdAt}\n${message.author.username}`
		);
	} else if (command === "del") {
		if (args.length === 0) {
			message.channel.send(
				"Please specify the number of messages to be deleted"
			);
		} else if (args.length > 1) {
			message.channel.send(
				`Only one argument is required, but passed ${args.length}`
			);
		} else {
			message.channel.send(`Purging ${args[0]} messages`);
			message.channel.bulkDelete(args[0]);
		}
	} else if (command === "kick") {
		const user = message.mentions.members.first();
		if (message.channel.type === "DM") {
			message.channel.send("You can't use this command in the DM");
			return;
		}

		if (!message.member.hasPermission("KICK_MEMBERS")) {
			message.channel.send(
				`@${message.author.username}, u dont have the permission to kick members!}`
			);
			return;
		}

		if (!user.kickable) {
			message.channel.send("I have not permission to kick this user");
			return;
		}

		user.kick()
			.then(() => {
				user.createDM();
				user.send("U are banned from the CodedLife Server");
			})
			.catch(console.error);
	}
});

client.on("guildMemberAdd", (user) => {
	user.createDM();
	user.send(
		`Hello @${user.displayName}, just saw u creeping into the CodedLife Server, Welcome`
	);
});

client.login(TOKEN);

const moment = require("moment");

module.exports = (bot, db, config, winston, userDocument, serverDocument, channelDocument, memberDocument, msg) => {
	let embed_fields = [
		{
			name: `Guild Name`,
			value: `__**${msg.channel.guild.name}**__`,
			inline: true
		},
		{
			name: `🆔`,
			value: `${msg.channel.guild.id}`,
			inline: true
		},
		{
			name: `🗓 Created`,
			value: `${moment(msg.channel.guild.createdAt).fromNow()}`,
			inline: true
		},
		{
			name: `👑 Owned by`,
			value: `<@${msg.channel.guild.ownerID}>`,
			inline: true
		},
		{
			name: "👥",
			value: `${msg.channel.guild.members.size} members`,
			inline: true
		}
	];
	let image_url = "";
	if(msg.channel.guild.iconURL) {
		image_url = msg.channel.guild.iconURL;
	}
	embed_fields.push(
		{
			name: `🕯 Command Prefix:`,
			value: `\`${bot.getCommandPrefix(msg.channel.guild, serverDocument)}\``,
			inline: true
		},
		{
			name: `💬`,
			value: `${serverDocument.messages_today} message${serverDocument.messages_today == 1 ? "" : "s"} today`,
			inline: true
		},
		{
			name: `🗄 Category:`,
			value: `${serverDocument.config.public_data.server_listing.category}`,
			inline: true
		},
		{
			name: `🌎`,
			value: `Click [here](${config.hosting_url}activity/servers?q=${encodeURIComponent(msg.channel.guild.name)})`,
			inline: true
		},
		{
			name: "🖼",
			value: `Icon:`,
			inline: true
		}
	);
	msg.channel.createMessage({
		embed: {
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL,
                url: "https://aymane.zya.me"
            },
            color: 0x00FF00,
			fields: embed_fields,
			image: {
				url: image_url
			}
		}
	});
};

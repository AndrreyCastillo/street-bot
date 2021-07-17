module.exports = {
	name: 'kill',
	description: 'Moves a random person from any voice channel to the dead channel',
	execute(message, args) {
        const server = message.guild; // Gets guild from the Message object
        if(!server.available) {
            message.reply("Nice try");
            return; // Stops if unavailable
        }
        
        const owner = server.ownerID;
        const sender = message.author.id;
        if (sender != owner) { // only server owner can run this command
            message.reply("Nice try");
            return;
        }

        const deadChannelID = server.channels.afkChannelID;
    
        if (deadChannelID === "" || deadChannelID.length === 0) {
            message.reply("There's no afk channel!!!");
            return
        }

        let voiceMemberIDs = []
        const channels = server.channels.filter(channel => channel.type === "voice");
        for (const [channelID, channel] of channels) {
            if (channelID === deadChannelID) continue;
            
            for (const [memberID, member] of channel.members) {
                voiceMemberIDs.push(memberID);
            }
        }
        
        const randomMemberID = voiceMemberIDs[Math.floor(Math.random()*voiceMemberIDs.length)];

        for (const [channelID, channel] of channels) {
            if (channelID === deadChannelID) continue;
            
            for (const [memberID, member] of channel.members) {
                if (randomMemberID === memberID) {
                    member.setVoiceChannel(deadChannelID)
                    .then(message.channel.send(`See ya, ${member}`))
                    .catch(console.error);

                    return;
                }
            }
        }
	}
};
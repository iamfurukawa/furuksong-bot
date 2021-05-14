const DiscordUtils = () => {

  const findChannelByDiscordUser = (guilds, userId) => {
    const [username, discriminator] = userId.split('#')
    if (!username || !discriminator) return null

    let guildFounded = null
    let channelFounded = null
    let memberFounded = null

    guilds.forEach(guild => {
      guild.channels.cache.forEach(channel => {
        if (channel.type === 'voice') {
          channel.members.forEach(member => {
            if (member.user.username === username && member.user.discriminator === discriminator) {
              guildFounded = guild
              channelFounded = channel
              memberFounded = member
            }
          })
        }
      })
    })

    return memberFounded ? { guild: guildFounded, channel: channelFounded, member: memberFounded } : null
  }

  return {
    findChannelByDiscordUser
  }
}

export default DiscordUtils()
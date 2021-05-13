import Discord from 'discord.js'
import Config from '../config'
import FirebaseRealtimeService from './firebase/firebase-realtime-service'
import FirebaseFirestoreService from './firebase/firebase-firestore-service'

const monitoringRef = FirebaseRealtimeService.getRef()
const client = new Discord.Client()
client.login(Config.BOT_TOKEN)

const findChannelByDiscordUser = (guilds, userId = 'iamFurukawa#1968') => {
  //Nadaletsky#7206
  const [username, discriminator] = userId.split('#')
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

  return { guild: guildFounded, channel: channelFounded, member: memberFounded }
}

client.on("ready", async () => {
  const fiuk = '[Meme] PaAai (Fiuk).mp3'
  const novo = '[Meme][+18] É O FAMOSO BUCETÃO.mp3'

  //let sounds = await FirebaseFirestoreService.get()
  //console.log(sounds.docs)

  monitoringRef.on('value', async (snap) => {
    console.log(snap.val().RequestSoundMonitoring);
    const location = findChannelByDiscordUser(client.guilds.cache)
    //tratar location null
    const conn = await location.channel.join()//entrar
    conn.voice.setSelfDeaf(true)
    conn.play('C:\\Users\\vinicius.carvalho\\Google Drive\\audios\\' + novo)
    //await guild.channels.cache.filter(channel => channel.type === 'voice').get('759035649998454794').leave()//sair
  })
})

console.log('Running...')
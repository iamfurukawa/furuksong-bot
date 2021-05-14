import Discord from 'discord.js'
import Sounds from './sounds'
import FirebaseRealtimeService from './firebase/firebase-realtime-service'
import FirebaseFirestoreService from './firebase/firebase-firestore-service'
import DiscordUtils from './discord/utils'

(async () => {
  try {
    const monitoringRef = FirebaseRealtimeService.getRef()
    const sounds = await Sounds.sync()
    const botId = (await FirebaseFirestoreService.configurations()).data().bot_id
    const client = new Discord.Client()
    client.login(botId)
    let conn = null
    let lastSoundPlayed = null

    client.on("ready", async () => {
      monitoringRef.on('value', async (snap) => {
        const [uuid, userId] = (snap.val().RequestSoundMonitoring).split(' ')
        if (uuid === 'awaiting-request-song') return

        const location = DiscordUtils.findChannelByDiscordUser(client.guilds.cache, 'iamFurukawa#1968'/*userId*/)
        if (!location) {
          console.log(`User ${userId} not found.`)
          await FirebaseRealtimeService.resetRequestSoundMonitoring()
          return
        }

        conn = await location.channel.join()
        conn.voice.setSelfDeaf(true)

        lastSoundPlayed = sounds.soundsFirebase.find(sound => sound.uuid === uuid)
        console.log(`User ${userId} request sound: ${lastSoundPlayed.displayName}`)
        conn.play(sounds.path + lastSoundPlayed.originalName)

        await FirebaseFirestoreService.incrementPlayedTimes(lastSoundPlayed.uuid)
        await FirebaseRealtimeService.resetRequestSoundMonitoring()
        //await guild.channels.cache.filter(channel => channel.type === 'voice').get('759035649998454794').leave()//sair
      })
    })

    console.log('Furuksong bot is up!')
  } catch (e) {
    console.log(`An error occurs in the main function: ${e}`)
  }
})()
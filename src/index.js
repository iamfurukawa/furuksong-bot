import '@babel/polyfill'
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
    let actualSound = null
    let isSpeaking = false

    const problemsMessages = [
      "É coisa da cdt!",
      "É coisa de infra",
      "Tava arrumando o fone",
      "Tava arrumando o monitor",
      "Hoje foi enrolado, passei o dia inteiro em call",
      "Qual é o numero da gmud? Eu não to localizando",
      "Aff ta em ingles",
      "Meu teclado ta ruim",
      "Opa gente desculpa ai, tocou o telefone enquanto eu falava com vocês",
      "Hoje minha VPN ta mto ruim",
      "To com prolema no meu AWS aqui, já vou dar um jeito",
    ]

    const getRandomInt = (min = 0, max = (problemsMessages.length - 1)) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    client.on('message', message => {
      if (message.content === '/desculpinha') {
        message.channel.send(`${problemsMessages[getRandomInt()]}`)
      }
    })

    client.on("ready", async () => {
      monitoringRef.on('value', async (snap) => {
        const data = snap.val().RequestSoundMonitoring
        let [uuid, userId, ip] = data.split(' ')

        if (uuid === 'awaiting-request-song') return

        if (lastSoundPlayed && lastSoundPlayed.uuid == uuid && isSpeaking) {
          actualSound.pause()
          lastSoundPlayed = null
          actualSound = null
          isSpeaking = false
          await FirebaseRealtimeService.resetRequestSoundMonitoring()
          console.log(`[${new Date().toLocaleString()}] [${ip}] [${userId}] Pausing sound.`)
          return
        }
        userId = userId.split('¬').join(' ')
        const location = DiscordUtils.findChannelByDiscordUser(client.guilds.cache, userId)
        if (!location) {
          await FirebaseRealtimeService.resetRequestSoundMonitoring()
          console.log(`User ${userId} not found.`)
          console.log(`DEBUG: ${data}`)
          return
        }

        actualSound ? actualSound.pause() : () => { }
        lastSoundPlayed = null
        actualSound = null
        isSpeaking = false

        conn = await location.channel.join()
        conn.voice.setSelfDeaf(true)

        lastSoundPlayed = sounds.soundsFirebase.find(sound => sound.uuid === uuid)
        console.log(`[${new Date().toLocaleString()}] [${ip}] [${userId}] Request: ${lastSoundPlayed.displayName}`)
        actualSound = conn.play(sounds.path + lastSoundPlayed.originalName)

        await FirebaseFirestoreService.incrementPlayedTimes(lastSoundPlayed.uuid)
        await FirebaseRealtimeService.resetRequestSoundMonitoring()

        actualSound.on("speaking", (speaking) => {
          isSpeaking = speaking
        });
      })
    })

    console.log('Furuksong bot is up!')
  } catch (e) {
    console.log(`An error occurs in the main function: ${e}`)
  }
})()
import { v4 as uuidv4 } from 'uuid'

import LocalAudios from '../local'
import FirebaseFirestoreService from '../firebase/firebase-firestore-service'

const Sounds = {
  soundsLocal: [],
  soundsFirebase: [],
  path: '',
  sync: async function () {
    const _init = async () => {
      this.path = (await FirebaseFirestoreService.configurations()).data().audio_folder
      const soundsLocal = LocalAudios.get(this.path).filter(file => file.endsWith('.mp3'))

      const firebaseResultSounds = await FirebaseFirestoreService.get()
      const soundsFirebase = firebaseResultSounds.docs.map(doc => ({
        uuid: doc.id,
        displayName: doc.data().displayName,
        playedTimes: doc.data().playedTimes,
        originalName: doc.data().originalName,
      }))

      this.soundsLocal = soundsLocal
      this.soundsFirebase = soundsFirebase
    }

    const _create = (sounds = []) => {
      if (sounds.length === 0) return false
      console.log(`To add: ${sounds}`)

      sounds.forEach(sound => {
        FirebaseFirestoreService.save('sounds', uuidv4(), {
          playedTimes: 0,
          originalName: sound,
          displayName: sound.replace(/(\.[^/.]+)+$/, '').replace(/-/g, ' ').replace(/_/g, ' ').trim()
        })
      })

      return true
    }

    const _remove = (sounds = []) => {
      if (sounds.length === 0) return false
      console.log(`To remove: ${sounds}`)

      sounds.forEach(async sound => {
        const soundObj = this.soundsFirebase.find(s => s.originalName === sound)
        await FirebaseFirestoreService.remove('sounds', soundObj.uuid)
      })

      return true
    }

    await _init()

    const createStatus = _create(this.soundsLocal.filter(soundLocal => !this.soundsFirebase.map(soundsFirebaseObj => soundsFirebaseObj.originalName).includes(soundLocal)))
    const removeStatus = _remove(this.soundsFirebase.map(soundsFirebaseObj => soundsFirebaseObj.originalName).filter(soundFirebase => !this.soundsLocal.includes(soundFirebase)))

    if (createStatus || removeStatus)
      await _init()

    return this
  }
}

export default Sounds
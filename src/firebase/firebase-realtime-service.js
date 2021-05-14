import FirebaseService from './firebase-service'

const FirebaseRealtimeService = () => {
  const firebase = FirebaseService.app()

  const update = async (key, data) => {
    await firebase.database().ref('/').update({ [key]: data });
  }

  const getRef = () => {
    return firebase.database().ref('/')
  }

  const resetRequestSoundMonitoring = async () => {
    await update('RequestSoundMonitoring', 'awaiting-request-song')
  }

  return {
    update,
    getRef,
    resetRequestSoundMonitoring,
  }
}

export default FirebaseRealtimeService()

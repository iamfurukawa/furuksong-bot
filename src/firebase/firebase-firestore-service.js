import firebase from 'firebase'
import FirebaseService from './firebase-service'

const FirebaseFirestoreService = () => {
  const init = () => FirebaseService.app().firestore()

  const save = async (collection, key, data) => {
    await init().collection(collection).doc(key).set(data)
  }

  const get = async () => init().collection('sounds').get()
  // https://firebase.google.com/docs/firestore/query-data/queries

  const remove = async (collection, key) => init().collection(collection).doc(key).delete()

  const version = async () => init().collection('version').get();

  const configurations = async () => init().collection('configurations').doc('iamfurukawa').get()

  const incrementPlayedTimes = async (key) => {
    const increment = firebase.firestore.FieldValue.increment(1)
    const soundRef = init().collection('sounds').doc(key)
    await soundRef.update({ 'playedTimes': increment }, { merge: true })
  }

  return {
    save,
    get,
    remove,
    version,
    configurations,
    incrementPlayedTimes,
  }
}

export default FirebaseFirestoreService()

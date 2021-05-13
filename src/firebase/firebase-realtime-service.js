import FirebaseService from './firebase-service'

const FirebaseRealtimeService = () => {
  const firebase = FirebaseService.app()

  const update = async (key, data) => {
    await firebase.database().ref('/').update({ [key]: data });
  };

  const getRef = () => {
    return firebase.database().ref('/')
  }

  return {
    update,
    getRef,
  };
};

export default FirebaseRealtimeService();

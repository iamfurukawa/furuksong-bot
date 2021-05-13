import FirebaseService from './firebase-service';

const FirebaseFirestoreService = () => {
  const init = () => FirebaseService.app().firestore();

  const save = async (collection, key, data) => {
    await init().collection(collection).doc(key).add(data);
  };

  const update = async (collection, key, newData) => {
    const data = await init().collection(collection).doc(key);
    data.update(newData);
  };

  const get = async () => init().collection('sounds').get();
  // https://firebase.google.com/docs/firestore/query-data/queries

  const remove = async (collection, key) => init().collection(collection).doc(key).delete();

  const version = async () => init().collection('version').get();

  return {
    save,
    get,
    update,
    remove,
    version,
  };
};

export default FirebaseFirestoreService();

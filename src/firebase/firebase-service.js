import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'

const FirebaseService = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAIzwheovszYOCgKQeFbWAjyNzk4t-jS28',
    authDomain: 'furuksong.firebaseapp.com',
    projectId: 'furuksong',
    storageBucket: 'furuksong.appspot.com',
    messagingSenderId: '511657412828',
    appId: '1:511657412828:web:e82110995aff6804414c19',

    type: 'service_account',
    project_id: 'furuksong',
    private_key_id: '6085f8544f602ae2116ea18b63ce01e61a96036e',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIWRTTzYdr3ojA\nYayutCyO0CSnXlR7fqxBp1EKewNG31MxvpoehlqWczf+hRFwbFyrqdSLg6FAMAbu\n4o5hk5rbiWzFxxA/XMuKZ4T932flEOvVwt0MmmJhh6Wun5tod1qFSAnL3D16E1ap\nDNchGz1ffpxZNhd60l9IQwPQxdnnUcyRabhFYTufvLT4Sd70jqs8jkLeXW9GMXlB\niDccfGRHH1JMYZUsgkVYc8XMO6TDtJyHrKyYNK4FvTvcYjfJ/lZho9S7R5Y6GOeN\nNsgKsxM2YBq8cbllTl/H3XDpAsk5y4+FoR0pUBOxyjEjHLFM2w8R1fT6LmiyNR6I\nI62X55ZNAgMBAAECggEAByFohNtJSRUL//DaAQPHnDObQluwnQ6WmeWXFEzpgnG7\nV8dlW9XDTpx+LzBUPRCWQcPTHT4LlKnA7Wqhz6Y9ujeLaAScNu0aD2x8xr5XR8dQ\n5XRAgszR2I/H3U2v7cllrt2v/5HwnDIpAO5Ej9iU2Bu8+83ZixUGsB82eQ05oqpt\n7nrudm6+zImcsdpQrAd2nxQLaE/Qu97mxVKMQe+ovVQP54RHsQQFMyfPnknzoH1+\nvdig8tTMQ4usMYJl0sKVEesy5s2GaUuoyjAo/J6elyjyw5E6iTZYZtElRT0cMocx\nKbJd47fUSTafoGrMdU9oCQP70IDUOxh0xkYfMdMnbwKBgQD6PhUCJCOCPibyNwZ0\n7EauYWMcxZ/ipq1grULh12lGnSGgW2aC/8zwRxOHNmlBrlC2fYEu11dQpsPiW5HS\nZO1wpupKXi9ubOV652vq5+k0kRrPdKZvNiHeF/TWctaS1izTSnIsEXke7+3tkIWZ\nktKErQqs7rS5mfXQkdk01wyppwKBgQDM9R9gpZS7tbiG8XGsLQikuDGgNpGklXVt\nqx6U0Z+GsxFCspDOiLagLMIdUahAPkKQHsNNhWf5Es/kNivy55LBIGHB5hMjYFFS\npx1vIdgPSmP6gAsnrFxYuzVBrwnBwsnY8aUxEfGgMAIJZhfm7eggGyW8qMqL7VAq\nfIfh2SCW6wKBgAW8MoMQDPhJMF9Qv4cieyQ3+yuHo/hv1X1nuyat5y3FICYqshjC\ngBHprxrkNllZA2SLT9ChAtFIYSjo7FikE4UHbksyCWhAeqnsb968Xe3kfXbPt5jI\n5tHOPsBDdYN8AR7+j8tOwzXgTdWqAEXaxZRg2uPHvMCcNLQJA69gVlv1AoGAZDjt\nGgZ9/3gx/pKsQkRXOKz1X2GvwGpxXKpTrvP+bRC9PP8yfjwuCY85cLrQanHHfM/+\nMrcsi4hebjrrLMF+ar/Z7cYCz8a2nZMoeoJzM67tyr24NrM7CQyqUy8ztzL4HwSz\nAZbDr9Ap/syUnZDydFiyEFn9iYUHMW9pxs+09vcCgYEA5jixZFHIogYWm6/rC27L\nyuNoALk5cnKbpsmThrhHyN2a/HXfEKZ+JTG5U2cz8kgvJI+yM+zbYj/7fW6Q5H/G\nI9dLqkvfJq629yDWY/gXw1uXGcLQ7ttJM8DEwWOBMnL8+g1ODpmUMOomIGpPJZLy\nALJowHsT23WLGpCaBYVx8a0=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-6y5cv@furuksong.iam.gserviceaccount.com',
    client_id: '108039633481896677200',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6y5cv%40furuksong.iam.gserviceaccount.com',
    
    databaseURL: 'https://furuksong-default-rtdb.firebaseio.com'
  }

  const app = () => {
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    }
    return firebase.app()
  };

  return { app }
}

export default FirebaseService()
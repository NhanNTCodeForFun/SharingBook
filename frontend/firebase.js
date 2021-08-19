import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCTHjn8-7s2vSKeH34l35CbqRGboQvd9rE',
  authDomain: 'chatapp-e072c.firebaseapp.com',
  projectId: 'chatapp-e072c',
  storageBucket: 'chatapp-e072c.appspot.com',
  messagingSenderId: '815229837886',
  appId: '1:815229837886:web:2e015d85cbf4c3b159676f',
  measurementId: 'G-4B2QGGHW4K',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({experimentalForceLongPolling: true});
} else {
  app = firebase.app();
}

const db = app.firestore();
export {db};

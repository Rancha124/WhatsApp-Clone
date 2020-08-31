import * as firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBI270tywb7CcMdCFZJVATBPAtnnMCUWYM",
    authDomain: "ranchat124.firebaseapp.com",
    databaseURL: "https://ranchat124.firebaseio.com",
    projectId: "ranchat124",
    storageBucket: "ranchat124.appspot.com",
    messagingSenderId: "41720878035",
    appId: "1:41720878035:web:ae41ae1eafd94d685e1526",
    measurementId: "G-J1X1S462JK"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();
 export {auth , provider};
  export default db;
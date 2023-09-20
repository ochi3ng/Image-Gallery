import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB1I1HQWCUL7wLRzjBFuhcBCxmSmMIlLGk",
    authDomain: "image-gallery-app-cf509.firebaseapp.com",
    projectId: "image-gallery-app-cf509",
    storageBucket: "image-gallery-app-cf509.appspot.com",
    messagingSenderId: "870088578867",
    appId: "1:870088578867:web:cc071be560e89dc3c21046"
};

const app = initializeApp(firebaseConfig);
export const storage=firebase.storage
export const database = getAuth(app);
export default firebase



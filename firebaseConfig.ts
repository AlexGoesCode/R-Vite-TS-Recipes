import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAQ1cJdwJrATDYAWrO4dwlobJUrpQKXmCw',
  authDomain: 'flavours-dance.firebaseapp.com',
  projectId: 'flavours-dance',
  storageBucket: 'flavours-dance.appspot.com',
  messagingSenderId: '355728768014',
  appId: '1:355728768014:web:ba2344db08e2af4530d05f',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

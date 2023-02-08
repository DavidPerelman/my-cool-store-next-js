// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBtQ2vXQyGAP-AfkHQt2nPAnt5nbOtqmNc',
  authDomain: 'my-cool-store-f3705.firebaseapp.com',
  projectId: 'my-cool-store-f3705',
  storageBucket: 'my-cool-store-f3705.appspot.com',
  messagingSenderId: '924964602586',
  appId: '1:924964602586:web:510291efe398ac8f211be3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
export const auth = getAuth(app);

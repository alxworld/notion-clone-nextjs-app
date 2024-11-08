// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDC2XFXF6WUQkOq1AT6m6KbNSIdu2PCX7Q',
  authDomain: 'notion-clone-ae898.firebaseapp.com',
  projectId: 'notion-clone-ae898',
  storageBucket: 'notion-clone-ae898.firebasestorage.app',
  messagingSenderId: '352969438220',
  appId: '1:352969438220:web:ceb1631b6132136616aa29',
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export { db }

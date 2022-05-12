// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCNJSngXcp--QpmQtxAOJSqqdy9plEakNw',
  authDomain: 'instagram-2v.firebaseapp.com',
  projectId: 'instagram-2v',
  storageBucket: 'instagram-2v.appspot.com',
  messagingSenderId: '522060754709',
  appId: '1:522060754709:web:6c5e73829d1dee87c9431c',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()

const storage = getStorage()

export { app, db, storage }

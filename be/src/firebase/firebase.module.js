// require('firebase/auth');
// require('firebase/firestore');
// import firebase from 'firebase/compat/app';
const { Module, Global } = require('@nestjs/common');

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUfrEVbo1ELyVo3es1wz4Ji0dpach4Vic",
  authDomain: "viblo-d8bf8.firebaseapp.com",
  projectId: "viblo-d8bf8",
  storageBucket: "viblo-d8bf8.appspot.com",
  messagingSenderId: "1015032021256",
  appId: "1:1015032021256:web:337664434e66ab7a022cbd",
  measurementId: "G-L904F8VZQM"
  }

const app = initializeApp(firebaseConfig);

const FirebaseProvider = {
  provide: 'FIREBASE',
  useValue: app,
};

@Global()
@Module({
  providers: [FirebaseProvider],
  exports: [FirebaseProvider],
})
class FirebaseModule {}

// export const auth = app.auth();
// export const db = app.firestore();
// export const storage = app.storage();

module.exports = { FirebaseModule };

import firebase from "firebase/app"; //dependencies before JSON object exports
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEiWNGlidcYoXLizAstyhxBpyhfBFu3JY",
  authDomain: "vaumoney.firebaseapp.com",
  databaseURL: "https://vaumoney.firebaseio.com",
  projectId: "vaumoney",
  storageBucket: "vaumoney.appspot.com",
  messagingSenderId: "580465804476",
  appId: "1:580465804476:web:5fe118607e434910683cb9"
};
!firebase.apps.length && firebase.initializeApp(firebaseConfig);
!firebase.apps.length && firebase.firestore().enablePersistence(false);
//firebase.firestore().enablePersistence({ synchronizeTabs: true });
//firebase.auth();
//firebase.storage();
/*.settings({
  cacheSizeBytes: 1048576
});*/
//firebase.firestore().settings({ persistence: false });

export default firebase;

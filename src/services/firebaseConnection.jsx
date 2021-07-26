import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
	apiKey: "AIzaSyDCbFohzFJzsc3YaySEKA3-tj9nmnA4EsE",
	authDomain: "system-1fe22.firebaseapp.com",
	projectId: "system-1fe22",
	storageBucket: "system-1fe22.appspot.com",
	messagingSenderId: "5093595630",
	appId: "1:5093595630:web:6e2f0477dd5beabdd656ff",
	measurementId: "G-QTPJ1Y5G4F",
};
// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;

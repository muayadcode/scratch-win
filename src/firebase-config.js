import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBezwBF0cKI4MKnbfJLAV3Z9BZK_BSgVaA",
	authDomain: "scratch-win-a438d.firebaseapp.com",
	projectId: "scratch-win-a438d",
	storageBucket: "scratch-win-a438d.appspot.com",
	messagingSenderId: "861803215615",
	appId: "1:861803215615:web:6b9c6d38532d227a53aaca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

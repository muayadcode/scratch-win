import {
	collection,
	addDoc,
	where,
	query,
	getDocs,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase-config";

const checkLastPlayedFirebase = async (email) => {
	console.log(email);
	try {
		const myQuery = query(
			collection(db, "accounts"),
			where("email", "==", email)
		);
		const querySnapshot = await getDocs(myQuery);
		if (!querySnapshot.empty) {
			const data = querySnapshot.docs[0].data();
			return data.lastPlayed;
		}
	} catch (error) {
		throw error;
	}
};

export const checkLastPlayed = async (email) => {
	console.log(email);
	if (getLocalData().lastPlayed != null) {
		const lastPlayed = getLocalData().lastPlayed;

		return lastPlayed;
	} else {
		return checkLastPlayedFirebase(email);
	}
};

export const getFirebaseData = async (email) => {
	try {
		const myQuery = query(
			collection(db, "accounts"),
			where("email", "==", email)
		);
		const querySnapshot = await getDocs(myQuery);
		if (!querySnapshot.empty) {
			const data = querySnapshot.docs[0].data();
			console.log(data);
			saveDataLocal(data, data.lastPlayed);
			return data;
		}
	} catch (error) {
		console.error("Error getting user data:", error.message);
	}
};

export const saveDataFirebase = async (formData) => {
	try {
		// Create user account with email and password
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			formData.email,
			formData.password
		);

		if (formData.isMinor) {
			await addDoc(collection(db, "accounts"), {
				uid: userCredential.user.uid,
				fName: formData.fName,
				lName: formData.lName,
				address: formData.address,
				postal: formData.postal,
				province: formData.province,
				city: formData.city,
				phone: formData.phone,
				email: formData.email,
				date: formData.date,
				GuardianNameFirst: formData.guardianfName,
				GuardianNameLast: formData.guardianlName,
				parentEmail: formData.guardianEmail,
				GuardianNumber: formData.guardianPhone,
				consented: formData.consented,
				sponsors: formData.sponsors,
				secret: formData.secret,
			});
		} else {
			await addDoc(collection(db, "accounts"), {
				uid: userCredential.user.uid,
				fName: formData.fName,
				lName: formData.lName,
				address: formData.address,
				postal: formData.postal,
				province: formData.province,
				city: formData.city,
				phone: formData.phone,
				email: formData.email,
				date: formData.date,
				consented: formData.consented,
				sponsors: formData.sponsors,
				secret: formData.secret,
			});
		}

		// Add user information to Firestore

		saveDataLocal(formData);
		console.log("User signed up successfully!");
	} catch (error) {
		console.error("Error signing up:", error.message);
	}
};

export const saveLastPlayed = async () => {
	const email = getLocalData().email;
	const lastPlayed = new Date().toISOString();
	try {
		const myQuery = query(
			collection(db, "accounts"),
			where("email", "==", email)
		);
		const querySnapshot = await getDocs(myQuery);
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			await updateDoc(doc.ref, {
				lastPlayed: lastPlayed,
			});
		}
	} catch (error) {
		console.error("Error updating last played:", error.message);
	}
};

export const saveDataLocal = (formData, lastPlayed) => {
	let local = {
		fName: formData.fName,
		email: formData.email,
		secret: formData.secret,
	};
	if (lastPlayed != null) {
		local.lastPlayed = lastPlayed;
	}

	localStorage.setItem("formData", JSON.stringify(local));
};

export const getLocalData = () => {
	const storedFormData = localStorage.getItem("formData");
	console.log(storedFormData);
	if (storedFormData) {
		return JSON.parse(storedFormData);
	}
	return null;
};
class Prize {
	constructor(value, numOfPrizes) {
		this.value = value;
		this.numOfPrizes = numOfPrizes;
	}
}
export const getAvailablePrizes = async () => {
	const prizes = [];
	const prizePool = [];

	const querySnapshot = await getDocs(collection(db, "prizes"));
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const prize = new Prize(data.value, data.numOfPrizes);

		prizes.push(prize);
	});
	prizes.forEach((prize) => {
		for (let i = 0; i < prize.numOfPrizes; i++) {
			prizePool.push(prize);
		}
	});

	return prizePool;
};

export const getPrize = async () => {
	try {
		const prizePool = await getAvailablePrizes();

		const prize = prizePool[Math.floor(Math.random() * prizePool.length)];
		return prize;
	} catch (error) {
		console.error("Error getting prizes:", error.message);
	}
};

export const removePrize = async (prize) => {
	try {
		const querySnapshot = await getDocs(
			query(collection(db, "prizes"), where("value", "==", prize.value))
		);
		const doc = querySnapshot.docs[0];
		if (prize.numOfPrizes == 1) {
			await deleteDoc(doc.ref);
		} else {
			await updateDoc(doc.ref, {
				numOfPrizes: doc.data().numOfPrizes - 1,
			});
		}
		console.log("Prize removed successfully!");
		addPrizeToUser(prize, getLocalData().email);
	} catch (error) {
		console.error("Error removing prize:", error.message);
	}
};

const addPrizeToUser = async (prize, email) => {
	try {
		let prizesWon = [];
		const myQuery = query(
			collection(db, "accounts"),
			where("email", "==", email)
		);
		const querySnapshot = await getDocs(myQuery);
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			const data = doc.data();
			if (data.prizesWon) {
				prizesWon = data.prizesWon;
			}
			prizesWon.push(prize.value);
			await updateDoc(doc.ref, {
				prizesWon: prizesWon,
			});
		}
	} catch (error) {
		console.error("Error adding prize to user:", error.message);
	}
};

export const signOut = async () => {
	try {
		await auth.signOut();
		console.log("User signed out successfully!");
		localStorage.removeItem("formData");
	} catch (error) {
		console.error("Error signing out:", error.message);
	}
};

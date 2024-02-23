import {
	collection,
	addDoc,
	where,
	query,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase-config";

export const checkLastPlayed = async (email) => {
	try {
		const myQuery = query(
			collection(db, "accounts"),
			where("email", "==", email)
		);
		const querySnapshot = await getDocs(myQuery);
		if (!querySnapshot.empty) {
			const data = querySnapshot.docs[0].data();
			const lastPlayed = data.lastPlayed;
			if (lastPlayed) {
				const lastPlayedTime = new Date(lastPlayed).getTime();
				const currentTime = new Date().getTime();
				return (currentTime - lastPlayedTime) / (1000 * 3600);
			}
		}
	} catch (error) {
		throw error;
	}
	return true;
};

export const saveDataFirebase = async (formData) => {
	try {
		// await checkLastPlayed(formData.email);

		// Create user account with email and password
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			formData.email,
			formData.password
		);

		console.log(formData);

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
			});
		}

		// Add user information to Firestore

		saveDataLocal(formData);
		console.log("User signed up successfully!");
	} catch (error) {
		console.error("Error signing up:", error.message);
	}
};

export const saveLastPlayed = async (email) => {
	console.log(email);
	try {
		const myQuery = query(
			collection(db, "accounts"),
			where("email", "==", email)
		);
		const querySnapshot = await getDocs(myQuery);
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			await updateDoc(doc.ref, {
				lastPlayed: new Date().toISOString(),
			});
		}
	} catch (error) {
		console.error("Error updating last played:", error.message);
	}
};

const saveDataLocal = (formData) => {
	let local = {
		fName: formData.fName,
		email: formData.email,
	};
	localStorage.setItem("formData", JSON.stringify(local));
};

export const getLocalData = () => {
	const storedFormData = localStorage.getItem("formData");
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
const getAvailablePrizes = async () => {
	const prizes = [];
	const querySnapshot = await getDocs(collection(db, "prizes"));
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const prize = new Prize(data.value, data.numOfPrizes);
		prizes.push(prize);
	});
	return prizes;
};

export const getPrize = async () => {
	try {
		const prizes = await getAvailablePrizes();
		console.log(prizes);
		const prizePool = [];
		prizes.forEach((prize) => {
			for (let i = 0; i < prize.numOfPrizes; i++) {
				prizePool.push(prize);
			}
		});
		const prize = prizePool[Math.floor(Math.random() * prizePool.length)];
		return prize;
	} catch (error) {
		console.error("Error getting prizes:", error.message);
	}
};

export const removePrize = async (prize) => {
	try {
		const querySnapshot = await getDocs(
			query(collection(db, "prizes"), where("value", "==", prize))
		);
		const doc = querySnapshot.docs[0];
		await doc.ref.delete();
		console.log("Prize removed successfully!");
	} catch (error) {
		console.error("Error removing prize:", error.message);
	}
};

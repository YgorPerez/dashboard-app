import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import firebase from "../services/firebaseConnection";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loadingAuth, setLoadingAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		function loadStorage() {
			const storageUser = localStorage.getItem("SistemaUser");

			if (storageUser) {
				setUser(JSON.parse(storageUser));
				setLoading(false);
			}
			setLoading(false);
		}
		loadStorage();
	}, []);

	async function signUp(email, password, nome) {
		setLoadingAuth(true);
		await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async (value) => {
				let uid = value.user.uid;
				let email = value.user.email;

				await firebase
					.firestore()
					.collection("users")
					.doc(uid)
					.set({
						nome: nome,
						avatarUrl: null,
					})
					.then(() => {
						let data = {
							uid: uid,
							nome: nome,
							email: email,
							avatarUrl: null,
						};
						setUser(data);
						storageUser(data);
						setLoadingAuth(false);
						toast.success("Bem-vindo a plataforma!");
					});
			})
			.catch((error) => {
				console.error(error);
				setLoadingAuth(false);
				toast.error("Oops algo deu errado!");
			});
	}

	async function signIn(email, password) {
		setLoadingAuth(true);
		await firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(async (value) => {
				let uid = value.user.uid;
				let email = value.user.email;
				const userProfile = await firebase
					.firestore()
					.collection("users")
					.doc(uid)
					.get();

				let data = {
					uid: uid,
					nome: userProfile.data().nome,
					avatarUrl: userProfile.data().avatarUrl,
					email: email,
				};

				setUser(data);
				storageUser(data);
				setLoadingAuth(false);
				toast.success("Bem-vindo de volta!");
			})
			.catch((error) => {
				console.error(error);
				setLoadingAuth(false);
				toast.error("Oops algo deu errado!");
			});
	}

	function storageUser(data) {
		localStorage.setItem("SistemaUser", JSON.stringify(data));
	}

	async function signOut() {
		await firebase.auth().signOut();
		localStorage.removeItem("SistemaUser");
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{
				signed: !!user,
				user,
				loading,
				signUp,
				signOut,
				signIn,
				loadingAuth,
				setUser,
				storageUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

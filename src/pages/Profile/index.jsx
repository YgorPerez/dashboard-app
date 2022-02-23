import firebase from "../../services/firebaseConnection";
import { useState, useContext } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/user";
import { FiSettings, FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Profile() {
	const { user, signOut, setUser, storageUser } = useContext(AuthContext);

	const [nome, setNome] = useState(user && user.nome);
	const [email, setEmail] = useState(user && user.email);

	const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
	const [imageAvatar, setImageAvatar] = useState(null);

	function handleFile(e) {
		if (e.target.value[0]) {
			const image = e.target.files[0];
			if (image.type === "image/png" || image.type === "image/jpeg") {
				setImageAvatar(image);
				setAvatarUrl(URL.createObjectURL(e.target.files[0]));
			} else {
				toast.info("Envie uma imagem do tipo PNG ou JPEG");
				setImageAvatar(null);
				return null;
			}
		}
	}

	async function handleUpload() {
		const currentUid = user.uid;
		const uploadTask = await firebase
			.storage()
			.ref(`images/${currentUid}/${imageAvatar.name}`)
			.put(imageAvatar)
			.then(async () => {
				await firebase
					.storage()
					.ref(`images/${currentUid}`)
					.child(imageAvatar.name)
					.getDownloadURL()
					.then(async (url) => {
						let urlFoto = url;
						await firebase
							.firestore()
							.collection("users")
							.doc(user.uid)
							.update({
								nome: nome,
								avatarUrl: urlFoto,
							})
							.then(() => {
								let data = {
									...user,
									nome: nome,
									avatarUrl: urlFoto,
								};
								setUser(data);
								storageUser(data);
							})
							.catch((error) => {
								toast.error("Oops deu algo de errado");
								console.log(error);
							});
					})
					.catch((error) => {
						toast.error("Oops deu algo de errado");
						console.log(error);
					});
			})
			.catch((error) => {
				toast.error("Oops deu algo de errado");
				console.log(error);
			});
	}

	async function handleSave(e) {
		e.preventDefault();
		if (imageAvatar === null && nome !== "") {
			await firebase
				.firestore()
				.collection("users")
				.doc(user.uid)
				.update({
					nome: nome,
				})
				.then(() => {
					let data = {
						...user,
						nome: nome,
					};
					setUser(data);
					storageUser(data);
				})
				.catch((error) => {
					console.log(error);
					toast.error(error);
				});
		} else if (nome !== "" && imageAvatar !== null) {
			handleUpload();
		}
	}

	return (
		<div className="profile">
			<Header />

			<div className="content">
				<Title name="Meu perfil">
					<FiSettings size={25} />
				</Title>

				<div className="container">
					<form className="form-profile" onSubmit={handleSave}>
						<label className="label-avatar">
							<span>
								<FiUpload color="#fff" size={25} />
							</span>

							<input
								type="file"
								accept="image/*"
								onChange={handleFile}
							/>
							<br />
							{avatarUrl === null ? (
								<img
									src={avatar}
									width="250"
									height="250"
									alt="Foto de perfil do usuario"
								/>
							) : (
								<img
									src={avatarUrl}
									alt="Foto de perfil do usuario"
								/>
							)}
						</label>

						<label>Nome</label>
						<input
							type="text"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
						/>

						<label>Email</label>
						<input type="text" value={email} disabled={true} />

						<button type="submit">Salvar</button>
					</form>
				</div>
				<div
					className="logout"
					onClick={() => {
						signOut();
					}}
				>
					<button>Sair</button>
				</div>
			</div>
		</div>
	);
}

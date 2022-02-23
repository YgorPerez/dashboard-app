import { useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import firebase from "../../services/firebaseConnection";

export default function Customers() {
	const [nomeFantasia, setNomeFantasia] = useState("");
	const [endereco, setEndereco] = useState("");
	const [cnpj, setCnpj] = useState("");

	async function handleAdd(e) {
		e.preventDefault();

		if (nomeFantasia !== "" && cnpj !== "" && endereco !== "") {
			await firebase
				.firestore()
				.collection("customers")
				.add({
					nomeFantasia: nomeFantasia,
					endereco: endereco,
					cnpj: cnpj,
				})
				.then(() => {
					setNomeFantasia("");
					setCnpj("");
					setEndereco("");
					toast.success("Adicionada com sucesso");
				})
				.catch((error) => {
					console.log(error);
					toast.error("Oops alguma coisa deu errado");
				});
		} else {
			toast.error("Preencha todos os campos");
		}
	}

	return (
		<div>
			<Header />
			<div className="content">
				<Title name="Clientes">
					<FiUser size={24} />
				</Title>
				<div className="container">
					<form onSubmit={handleAdd}>
						<label>Nome fantasia</label>
						<input
							type="text"
							value={nomeFantasia}
							placeholder="Nome da sua empresa"
							onChange={(e) => {
								setNomeFantasia(e.target.value);
							}}
						/>
						<label>CNPJ</label>
						<input
							type="text"
							placeholder="Seu CNPJ"
							value={cnpj}
							onChange={(e) => {
								setCnpj(e.target.value);
							}}
						/>
						<label>Endereco</label>
						<input
							type="text"
							placeholder="Endereco da empresa"
							value={endereco}
							onChange={(e) => {
								setEndereco(e.target.value);
							}}
						/>
						<button type="submit">Salvar</button>
					</form>
				</div>
			</div>
		</div>
	);
}

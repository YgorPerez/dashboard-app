import Title from "../../components/Title";
import Header from "../../components/Header";
import { FiPlusCircle } from "react-icons/fi";
import { useState, useContext, useEffect } from "react";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/user";
import { useNavigate, useParams } from 'react-router-dom';

export default function New() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [loadCustomers, setLoadCustomers] = useState(true);
	const [customers, setCustomers] = useState([]);
	const [customersSelected, setCustomersSelected] = useState(0);
	const [assunto, setAssunto] = useState("Suporte");
	const [status, setStatus] = useState("Aberto");
	const [complemento, setComplemento] = useState("");
	const [idCustomer, setIdCustomer] = useState(false);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		async function loadCustomers() {
			await firebase
				.firestore()
				.collection("customers")
				.get()
				.then((snapshot) => {
					let lista = [];
					snapshot.forEach((doc) => {
						lista.push({
							id: doc.id,
							nomeFantasia: doc.data().nomeFantasia,
						});
					});
					if (lista.length === 0) {
						console.log("Nenhuma empresa encontrada");
						toast.info("Nenhuma empresa encontrada");
						setLoadCustomers(false);
						setCustomers([
							{
								id: "1",
								nomeFantasia: "Freela",
							},
						]);
						return;
					}

					setLoadCustomers(false);
					setCustomers(lista);

					if (id) {
						loadId(lista);
					}
				})
				.catch((error) => {
					console.log(error);
					toast.error(error);
					setLoadCustomers(false);
					setCustomers([{ id: "1", nomeFantasia: "" }]);
				});
		}
		loadCustomers();
	}, []);

	async function loadId(lista) {
		await firebase
			.firestore()
			.collection("chamados")
			.doc(id)
			.get()
			.then((snapshot) => {
				setAssunto(snapshot.data().assunto);
				setStatus(snapshot.data().status);
				setComplemento(snapshot.data().complemento);

				let index = lista.findIndex(
					(item) => item.id === snapshot.data().clienteId,
				);
				setCustomersSelected(index);
				setIdCustomer(true);
			})
			.catch((err) => {
				console.error(err);
				toast.error(err);
				setIdCustomer(false);
			});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (idCustomer) {
			await firebase
				.firestore()
				.collection("chamados")
				.doc(id)
				.update({
					cliente: customers[customersSelected].nomeFantasia,
					clienteId: customers[customersSelected].id,
					assunto: assunto,
					status: status,
					complemento: complemento,
					userId: user.uid,
				})
				.then(() => {
					toast.success("Salvo com sucesso");
					setAssunto("");
					setComplemento("");
					setStatus("Aberto");
					setCustomersSelected(0);
					navigate("/dashboard");
				})
				.catch((err) => {
					toast.error("Error: " + err);
					console.log(err);
				});
			return;
		}

		await firebase
			.firestore()
			.collection("chamados")
			.add({
				created: new Date(),
				cliente: customers[customersSelected].nomeFantasia,
				clienteId: customers[customersSelected].id,
				assunto: assunto,
				status: status,
				complemento: complemento,
				userId: user.uid,
			})
			.then(() => {
				toast.success("Registrado com successo");
				setAssunto("");
				setComplemento("");
				setStatus("Aberto");
				setCustomersSelected(0);
			})
			.catch((error) => {
				toast.error(error);
				console.log(error);
			});
	}

	function handleSelectChange(e) {
		setAssunto(e.target.value);
		console.log(e.target.value);
	}

	function handleOptionChange(e) {
		setStatus(e.target.value);
		console.log(e.target.value);
	}

	function handleCustomersChange(e) {
		console.log(e.target.value);
		console.log(customers[e.target.value]);
		setCustomersSelected(e.target.value);
	}

	return (
		<div className="new-page">
			<Header />
			<div className="content">
				<Title name="Novo chamado">
					<FiPlusCircle size={25} />
				</Title>
				<div className="container">
					<form onSubmit={handleSubmit}>
						<label>Cliente</label>

						{loadCustomers === true ? (
							<input
								type="text"
								disabled={true}
								value="Carregando"
							/>
						) : (
							<select
								value={customersSelected}
								onChange={handleCustomersChange}
							>
								{customers.map((item, index) => {
									return (
										<option key={item.id} value={index}>
											{item.nomeFantasia}
										</option>
									);
								})}
							</select>
						)}

						<label>Assunto</label>
						<select value={assunto} onChange={handleSelectChange}>
							<option value="Suporte">Suporte</option>
							<option value="Visita Tecnica">
								Visita Tecnica
							</option>
							<option value="Financeiro">Financeiro</option>
						</select>
						<label>Status</label>
						<div className="status">
							<input
								type="radio"
								name="radio"
								value="Aberto"
								checked={status === "Aberto"}
								onChange={handleOptionChange}
							/>
							<span>Em aberto</span>
							<input
								type="radio"
								name="radio"
								value="Progresso"
								checked={status === "Progresso"}
								onChange={handleOptionChange}
							/>
							<span>Progresso</span>
							<input
								type="radio"
								name="radio"
								value="Atendido"
								checked={status === "Atendido"}
								onChange={handleOptionChange}
							/>
							<span>Atendido</span>
						</div>
						<label>Complemento</label>
						<textarea
							name=""
							type="text"
							cols="30"
							rows="10"
							placeholder="Descreva seu problema (opcional)"
							value={complemento}
							onChange={(e) => setComplemento(e.target.value)}
						></textarea>
						<button type="submit">Registrar</button>
					</form>
				</div>
			</div>
		</div>
	);
}

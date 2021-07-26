import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/user";
import logo from "../../assets/logo.png";

export default function SignUp() {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [nome, setNome] = useState("");

	const { signUp, loadingAuth } = useContext(AuthContext);

	function handleSubmit(e) {
		e.preventDefault();

		if (nome !== "" || email !== "" || password !== "") {
			signUp(email, password, nome);
		}
	}

	return (
		<div className="sign">
			<div className="container">
				<div className="logo">
					<img src={logo} alt="logo do site" />
				</div>
				<form onSubmit={handleSubmit}>
					<h1>Criar conta</h1>
					<input
						type="text"
						placeholder="Seu nome"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
					/>
					<input
						type="text"
						placeholder="email@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="**********"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit">
						{loadingAuth ? "Carregando" : "Cadastrar"}
					</button>
				</form>
				<Link to="/">Já tenho uma conta</Link>
			</div>
		</div>
	);
}

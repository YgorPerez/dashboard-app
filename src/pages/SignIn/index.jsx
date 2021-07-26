import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/user";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function SignIn() {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const { signIn, loadingAuth } = useContext(AuthContext);

	function handleSubmit(e) {
		e.preventDefault();

		if (email !== "" || password !== "") {
			signIn(email, password);
		}
	}

	return (
		<div className="sign">
			<div className="container">
				<div className="logo">
					<img src={logo} alt="logo do site" />
				</div>
				<form onSubmit={handleSubmit}>
					<h1>Entrar</h1>
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
						{loadingAuth ? "Carregando" : "Acessar"}
					</button>
				</form>
				<Link to="/register">Criar uma conta</Link>
			</div>
		</div>
	);
}

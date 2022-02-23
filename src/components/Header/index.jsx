import { useContext } from "react";
import { AuthContext } from "../../contexts/user";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

export default function Header() {
	const { user } = useContext(AuthContext);
	return (
		<header>
			<div>
				<img
					src={user.avatarUrl === null ? avatar : user.avatarUrl}
					alt="Foto do perfil"
				/>
			</div>
			<Link to="/dashboard">
				<FiHome color="$white" size={24} />
				Chamados
			</Link>
			<Link to="/customers">
				<FiUser color="$white" size={24} />
				Users
			</Link>
			<Link to="/profile">
				<FiSettings color="$white" size={24} />
				Configuracoes
			</Link>
		</header>
	);
}

import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";

import { AuthContext } from "../contexts/user";

export default function RouteWrapper({
	element: Component,
	isPrivate,
	...rest
}) {
	const { signed, loading } = useContext(AuthContext);

	if (loading) {
		return (
			<div>
				<h1>Carregando...</h1>
			</div>
		);
	}

	if (!signed && isPrivate) {
		return <Navigate to="/" />;
	}

	if (signed && !isPrivate) {
		return <Navigate to="dashboard" />;
	}

	return <Route {...rest} render={(props) => <Component {...props} />} />;
}

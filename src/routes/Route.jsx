import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/user";

export default function RouteWrapper({
	component: Component,
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
		return <Redirect to="/" />;
	}

	if (signed && !isPrivate) {
		return <Redirect to="dashboard" />;
	}

	return <Route {...rest} render={(props) => <Component {...props} />} />;
}

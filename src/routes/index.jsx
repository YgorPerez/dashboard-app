import React from "react";

import { Switch } from "react-router-dom";
import Route from "./Route";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/" component={SignUp} isPrivate={false} />
			<Route
				exact
				path="/register"
				component={SignIn}
				isPrivate={false}
			/>
			<Route exact path="/dashboard" component={Dashboard} isPrivate />
		</Switch>
	);
}

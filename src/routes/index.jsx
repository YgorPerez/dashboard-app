import React from "react";

import { Route, Routes } from "react-router-dom";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import New from "../pages/New";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export default function Routing() {
	return (
		<Routes>
			<Route exact path="/" element={<SignIn/>} isPrivate={false} />
			<Route exact path="/register" element={<SignUp/>} isPrivate={false} />
			<Route exact path="/dashboard" element={<Dashboard/>} isPrivate />
			<Route exact path="/profile" element={<Profile/>} isPrivate />
			<Route exact path="/customers" element={<Customers/>} isPrivate />
			<Route exact path="/new" element={<New/>} isPrivate />
			<Route exact path="/new/:id" element={<New/>} isPrivate />
		</Routes>
	);
}

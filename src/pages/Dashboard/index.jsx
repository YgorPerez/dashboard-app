import { useState, UseEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/user";

export default function Dashboard() {
	const { signOut } = useContext(AuthContext);
	return (
		<div>
			<h1>Home</h1>
			<button onClick={() => signOut()}>Logout</button>
		</div>
	);
}

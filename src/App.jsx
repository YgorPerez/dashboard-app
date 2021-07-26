import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import AuthProvider from "./contexts/user";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<ToastContainer autoClose={3000} />
				<Routes />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;

import { AdminProvider } from "./context/adminContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
const App = () => {
	return (
		<AdminProvider>
			<BrowserRouter>
				<Routes>
					<Route exact={true} path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</AdminProvider>
	);
}

export default App;

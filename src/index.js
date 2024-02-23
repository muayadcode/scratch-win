import React from "react";
import ReactDOM from "react-dom";

import Contest from "./pages/Contest.js";
import Form from "./pages/Form.js";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createRoot } from "react-dom/client";
import FormSuccess from "./pages/Success.js";
import SignIn from "./pages/SignIn.js";
import Legal from "./pages/Legal.js";
import Home from "./pages/Home.js";
import ScrollToTop from "./scrollToTop";
import "./index.css";
import "./utility.css";


export default function App() {
	// let location = useLocation();
	// let background = location.state && location.state.background;


	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route index element={<Home />} />
				<Route path='/form' element={<Form />} />
				<Route path='/success' element={<FormSuccess />} />
				<Route path='/contest' element={<Contest />} />
				<Route path='/legal' element={<Legal />} />
				<Route path='/signin' element={<SignIn />} />
			</Routes>
			{/* {background && <Route path="/img/:id" children={<Modal />} />} */}
		</BrowserRouter>
	);

}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// ReactDOM.render(<App />, document.getElementById("root"));

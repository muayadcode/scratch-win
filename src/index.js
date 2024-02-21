import React from 'react';
import ReactDOM from "react-dom";
// import Form from './pages/Form.js';
import ScratchCard from './pages/Contest.js';
import Signup from './pages/signup.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {


  return (
    <BrowserRouter>
     <Routes>
      <Route index element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

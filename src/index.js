import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gaming from './Gaming';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
	<>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
	<link rel="preconnect" href="https://fonts.googleapis.com"></link>
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
	<Router>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/gaming" element={<Gaming guest={false}/>} />
			<Route path="/guest" element={<Gaming guest={true}/>} />
		</Routes>
	</Router>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	</>,

	document.getElementById("root")
);
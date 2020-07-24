import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Details from "./pages/details";

import AuthRoute from "./util/AuthRoute";
import SecondRoute from "./util/SecondRoute";

import "semantic-ui-css/semantic.min.css";
import { Base64 } from "js-base64";
import axios from "axios";
import "antd/dist/antd.css";

import {
	sync,
	totalCallers,
	winnersList,
	questionsList,
	todo,
} from "./redux/actions/dataActions";
import { useDispatch } from "react-redux";

axios.defaults.baseURL = "https://surya-tv.distronix.in:4000";

function App() {
	//const data = useSelector(state => state.data);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(sync());
		// dispatch(todo());
		dispatch(winnersList());
		dispatch(questionsList());
		dispatch(totalCallers());
	}, []);

	return (
		<div className='App'>
			<Router>
				<Switch>
					<AuthRoute exact path='/' component={Home} />
					<SecondRoute exact path='/login' component={Login} />
					{/* <SecondRoute exact path='/signup' component={Signup} /> */}
					<Route exact path='/details/:phoneId' component={Details} />
				</Switch>
			</Router>
		</div>
	);
}

export default React.memo(App);

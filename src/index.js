import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
	<MuiPickersUtilsProvider utils={LuxonUtils}>
		<Provider store={store}>
			<App />
		</Provider>
	</MuiPickersUtilsProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();

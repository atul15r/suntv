import React from "react";
import { Route, Redirect } from "react-router-dom";

import { hash } from "./data";

export default function AuthRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={props =>
				localStorage.getItem(hash) !== null ? (
					<Redirect to='/' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
}

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthRoute({ component: Component, ...rest }) {
	const user = useSelector(state => state.data.currentUser);
	return (
		<Route
			{...rest}
			render={props =>
				!user ? <Redirect to='/login' /> : <Component {...props} />
			}
		/>
	);
}
export default React.memo(AuthRoute);

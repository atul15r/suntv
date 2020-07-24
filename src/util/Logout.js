import React from "react";
import { Button, Grid, Popup } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { toggleTheme as TH, Logout as Out } from "../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
	btn: {
		color: "#fff",
		border: "none",
		padding: 6,
		width: 70,
		borderRadius: 3,
		textTransform: "capitalize",
		cursor: "pointer",
		borderRadius: 30,
		fontSize: 15,
		transition: "0.5s",
		boxShadow: "12px 15px 20px rgba(0,0,0,.1)",
		"&:hover": {
			background: "#de3608",
			transition: "0.5s",
		},
		"&:active": {
			transition: "all .1s linear	",
			transform: "translateY(3px)",
		},
	},
}));

function Logout() {
	const [eventsEnabled] = React.useState({
		name: "eventsEnabled",
		initialValue: true,
	});
	const [open, setOpen] = React.useState(false);

	const dispatch = useDispatch();
	const theme = useSelector(state => state.data.theme);

	const toggleTheme = data => {
		dispatch(TH(data));
		setOpen(false);
	};
	const _logout = () => {
		dispatch(Out());
		setOpen(false);
	};

	const on = () => {
		setOpen(true);
	};
	const classes = useStyles();
	return (
		<Popup
			eventsEnabled={eventsEnabled}
			trigger={
				<Button
					icon='chevron down'
					style={{
						position: "absolute",
						right: 5,
						background: "none",
						color: theme ? "#fff" : "#cdc9c7",
					}}
					onClick={on}
				/>
			}
			on='click'
			onClose={() => setOpen(false)}
			position='bottom right'
			open={open}
			inverted={theme}
		>
			<Grid divided columns='equal'>
				<Grid.Column>
					<Popup
						trigger={
							<button
								id='btn'
								className={classes.btn}
								style={{
									borderRadius: 30,
									background: theme ? "#039af4" : "black",
								}}
								onClick={() => toggleTheme(theme ? "day" : "night")}
							>
								{theme ? "Day" : "Dark"}
							</button>
						}
						content={
							theme
								? "Enable Light Theme"
								: "This button will enable dark theme User Interface. Dark themes reduce the luminance emitted by device screens, while still meeting minimum color contrast ratios."
						}
						size='tiny'
					/>
				</Grid.Column>
				<Grid.Column>
					<Popup
						trigger={
							<button
								id='btn'
								className={classes.btn}
								style={{
									borderRadius: 30,
									background: "linear-gradient(to left, #039af4, #ffabd9)",
								}}
								onClick={_logout}
							>
								Logout
							</button>
						}
						content='Logout from your account, and protect your data.'
						position='top center'
						size='tiny'
						inverted
					/>
				</Grid.Column>
			</Grid>
		</Popup>
	);
}

export default Logout;

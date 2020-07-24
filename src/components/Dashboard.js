import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Shows from "./subcomponents/Shows";
import Des from "../images/des.png";
import NumberFormat from "react-number-format";

import { showsColor as shows } from "../util/data";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		// padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		boxShadow: "0 0 0 1px rgba(255,255,255,.1), 0 2px 4px 0 rgba(14,30,37,.12)",
		borderRadius: 3,
		height: 50,
		position: "relative",
		background: "beige",
		overflow: "hidden",
		[theme.breakpoints.up("xs")]: { height: 100 },

		[theme.breakpoints.up("md")]: { height: 90 },
		[theme.breakpoints.up("lg")]: { height: 90 },
	},
	h: {
		position: "absolute",
		left: 10,
		color: "#6b6b6b",
		top: 5,
	},
	b: {
		fontWeight: 500,
		position: "absolute",
		left: 15,
		marginTop: 50,
		color: "#6b6b6b",
		fontSize: "1.2rem",
		textTransform: "capitalize",
	},
	title: {
		width: "100%",
		textTransform: "capitalize",
		fontSize: 20,
		color: "#6b6b6b",
		fontWeight: 500,
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%,-50%)",
	},
	data: {
		[theme.breakpoints.up("xs")]: {
			position: "absolute",
			top: -10,
			left: 5,
			marginTop: -20,
		},

		[theme.breakpoints.up("md")]: {
			position: "unset",
			top: "unset",
			left: "unset",
			marginTop: "unset",
		},
		[theme.breakpoints.up("lg")]: {
			position: "unset",
			top: "unset",
			left: "unset",
			marginTop: "unset",
		},
	},

	footer: {
		color: "#999",
		marginTop: 50,

		[theme.breakpoints.up("xs")]: {
			marginLeft: 5,
			marginRight: 5,
			fontSize: 10,
			paddingBottom: 10,
		},

		[theme.breakpoints.up("md")]: {
			fontSize: 12,
			paddingBottom: 0,
		},
		[theme.breakpoints.up("lg")]: { fontSize: 12, paddingBottom: 0 },
	},
}));

export default function CenteredGrid() {
	const classes = useStyles();
	const theme = useSelector(state => state.data.theme);
	const data = useSelector(state => state.data);
	// console.log("dashboard---", data);
	return (
		<div className={classes.root}>
			<Grid container spacing={3} justify='center' alignItems='center'>
				<Grid item xs={10} md={3} lg={3}>
					<Paper
						className={classes.paper}
						style={{
							background: theme
								? "#212121"
								: "linear-gradient(135deg, #d4d4d5, #ebe9e4 60%, #d4d4d5)",
						}}
					>
						<h1 className={classes.h}>
							{data.totalCallers !== "" ? (
								<NumberFormat
									thousandSeparator={true}
									thousandsGroupStyle='lakh'
									value={data.totalCallers}
									style={{
										fontFamily: "open",
										background: "none",
										color: theme ? "#eee" : "#6b6b6b",
									}}
								/>
							) : (
								<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
							)}
						</h1>
						<b className={classes.b}>total callers</b>

						<img
							src={Des}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								borderRadius: 5,
								opacity: ".08",
								position: "absolute",
								left: 0,
							}}
						/>
					</Paper>
				</Grid>
				<Grid item xs={10} md={3} lg={3}>
					<Paper
						className={classes.paper}
						style={{
							background: theme
								? "#212121"
								: "linear-gradient(135deg, #d4d4d5, #ebe9e4 60%, #d4d4d5)",
						}}
					>
						<h1 className={classes.h}>
							{data.totalUnique !== "" ? (
								<NumberFormat
									thousandSeparator={true}
									thousandsGroupStyle='lakh'
									value={data.totalUnique}
									style={{
										fontFamily: "open",
										background: "none",
										color: theme ? "#eee" : "#6b6b6b",
									}}
								/>
							) : (
								<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
							)}
						</h1>
						<b className={classes.b}>total unique callers </b>

						<img
							src={Des}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								borderRadius: 5,
								opacity: ".08",
								position: "absolute",
								left: 0,
							}}
						/>
					</Paper>
				</Grid>
				<Grid item xs={10} md={3} lg={3}>
					<Paper
						className={classes.paper}
						style={{
							background: theme
								? "#212121"
								: "linear-gradient(135deg, #d4d4d5, #ebe9e4 60%, #d4d4d5)",
						}}
					>
						<h1 className={classes.h}>
							{data.totalCallersToday !== "" ? (
								<NumberFormat
									thousandSeparator={true}
									thousandsGroupStyle='lakh'
									value={data.totalCallersToday}
									style={{
										fontFamily: "open",
										background: "none",
										color: theme ? "#eee" : "#6b6b6b",
									}}
								/>
							) : (
								<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
							)}
						</h1>
						<b className={classes.b}>total callers today</b>{" "}
						<img
							src={Des}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								borderRadius: 5,
								opacity: ".08",
								position: "absolute",
								left: 0,
							}}
						/>
					</Paper>
				</Grid>
				<Grid item xs={10} md={3} lg={3}>
					<Paper
						className={classes.paper}
						style={{
							background: theme
								? "#212121"
								: "linear-gradient(135deg, #d4d4d5, #ebe9e4 60%, #d4d4d5)",
						}}
					>
						<h1 className={classes.h}>
							{data.totalUniqueToday !== "" ? (
								<NumberFormat
									thousandSeparator={true}
									thousandsGroupStyle='lakh'
									value={data.totalUniqueToday}
									style={{
										fontFamily: "open",
										background: "none",
										color: theme ? "#eee" : "#6b6b6b",
									}}
								/>
							) : (
								<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
							)}
						</h1>
						<b className={classes.b}>total unique callers today</b>{" "}
						<img
							src={Des}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								borderRadius: 5,
								opacity: ".08",
								position: "absolute",
								left: 0,
							}}
						/>
					</Paper>
				</Grid>

				{shows.map(data => (
					<Fragment key={data.name}>
						<Shows name={data.name.trim().toLowerCase()} color={data.color} />
					</Fragment>
				))}
			</Grid>
			<div className={classes.footer}>
				All Rights Reserved By <b style={{ fontWeight: 400 }}>SUN TV</b>.
				Designed And Developed By <b style={{ color: "#039af4" }}>DISTRONIX</b>
				<img
					src={require("../images/logo.png")}
					style={{ width: 15, marginTop: -4, marginLeft: 2 }}
				/>
			</div>
		</div>
	);
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Des from "../../images/des.png";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";
import NumberFormat from "react-number-format";
import Mon from "moment";
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
		height: 80,
		position: "relative",
		overflow: "hidden",
		marginTop: -20,
	},
	h: {
		position: "absolute",
		left: 10,
		color: "#fff",
		top: 5,
	},
	b: {
		fontWeight: 500,
		position: "absolute",
		left: 15,
		marginTop: 50,
		color: "#fff",
		fontSize: "1rem",
		textTransform: "capitalize",
		zIndex: 1,

		[theme.breakpoints.up("xs")]: {
			bottom: 0,
			fontSize: "1.2em",
			width: "100%",
			marginBottom: 10,
			left: 0,
			paddingLeft: 5,
			paddingRight: 5,
		},
		[theme.breakpoints.up("md")]: {
			fontWeight: 500,
			position: "absolute",
			left: 15,
			marginTop: 50,
			color: "#fff",
			fontSize: "1rem",
			width: "unset",
			bottom: "unset",
		},
		[theme.breakpoints.up("lg")]: {
			fontWeight: 500,
			position: "absolute",
			left: 15,
			marginTop: 50,
			color: "#fff",
			fontSize: "1rem",
			width: "unset",
			bottom: "unset",
		},
	},
	title: {
		textTransform: "capitalize",
		fontSize: 20,
		color: "#6b6b6b",
		fontWeight: 500,
	},
}));

export default function Shows({ name, color }) {
	const classes = useStyles();
	const theme = useSelector(state => state.data.theme);
	const data = useSelector(state => state.data);

	const [totalCallersToday, sTCTODAY] = React.useState("");
	const [totalUniqueCallersToday, sTUTODAY] = React.useState("");
	const [totalCallers, sTC] = React.useState("");
	const [totalUniqueCallers, sTU] = React.useState("");

	React.useEffect(() => {
		sync();
	}, []);
	const date = {
		start: Mon().format("YYYY-MM-DD") + " 00:00:00",
		end: Mon().format("YYYY-MM-DD") + " 23:59:59",
	};
	const sync = () => {
		axios
			.post("/totalsmstoday", date)
			.then(res => {
				sTCTODAY(res.data.count);
			})
			.catch(err => {
				console.log(err);
				sTCTODAY(0);
			});

		axios
			.post("/totaluniquesmstoday", date)
			.then(res => {
				sTUTODAY(res.data.count);
			})
			.catch(err => {
				console.log(err);
				sTUTODAY(0);
			});

		axios
			.post("/totalsms")
			.then(res => {
				sTC(res.data.count);
			})
			.catch(err => {
				console.log(err);
				sTC(0);
			});

		axios
			.post("/totalsmsunique")
			.then(res => {
				sTU(res.data.count);
			})
			.catch(err => {
				console.log(err);
				sTU(0);
			});
	};

	return (
		<>
			<Grid item xs={10} md={3} lg={3}>
				<Paper
					className={classes.paper}
					style={{
						background: theme
							? `linear-gradient(-90deg, ${color}, #2b2b2b)`
							: `linear-gradient(135deg, #d5b987, ${color} 110%, ${color})`,
					}}
				>
					<h1 className={classes.h}>
						{totalCallers !== "" ? (
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
								value={totalCallers}
								style={{
									fontFamily: "open",
									background: "none",
									color: theme ? "#eee" : "#2b2b2b",
								}}
							/>
						) : (
							<CircularProgress size={10} style={{ color: "#fff" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#fff",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> total SMS
					</b>
					<img
						src={Des}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: 5,
							opacity: ".1",
						}}
					/>
				</Paper>
			</Grid>
			<Grid item xs={10} md={3} lg={3}>
				<Paper
					className={classes.paper}
					style={{
						background: theme
							? `linear-gradient(-90deg, ${color}, #2b2b2b)`
							: `linear-gradient(135deg, #d5b987, ${color} 110%, ${color})`,
					}}
				>
					<h1 className={classes.h}>
						{totalUniqueCallers !== "" ? (
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
								value={totalUniqueCallers}
								style={{
									fontFamily: "open",
									background: "none",
									color: theme ? "#eee" : "#2b2b2b",
								}}
							/>
						) : (
							<CircularProgress size={10} style={{ color: "#fff" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#fff",
						}}
					>
						{" "}
						<b>{name === "npmt" ? "NPMT" : name}</b> total unique SMS
					</b>
					<img
						src={Des}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: 5,
							opacity: ".1",
						}}
					/>
				</Paper>{" "}
			</Grid>
			<Grid item xs={10} md={3} lg={3}>
				<Paper
					className={classes.paper}
					style={{
						background: theme
							? `linear-gradient(-90deg, ${color}, #2b2b2b)`
							: `linear-gradient(135deg, #d5b987, ${color} 110%, ${color})`,
					}}
				>
					<h1 className={classes.h}>
						{totalCallersToday !== "" ? (
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
								value={totalCallersToday}
								style={{
									fontFamily: "open",
									background: "none",
									color: theme ? "#eee" : "#2b2b2b",
								}}
							/>
						) : (
							<CircularProgress size={10} style={{ color: "#fff" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#fff",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> total SMS today
					</b>
					<img
						src={Des}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: 5,
							opacity: ".1",
						}}
					/>
				</Paper>{" "}
			</Grid>
			<Grid item xs={10} md={3} lg={3}>
				<Paper
					className={classes.paper}
					style={{
						background: theme
							? `linear-gradient(-90deg, ${color}, #2b2b2b)`
							: `linear-gradient(135deg, #d5b987, ${color} 110%, ${color})`,
					}}
				>
					<h1 className={classes.h}>
						{totalUniqueCallersToday !== "" ? (
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
								value={totalUniqueCallersToday}
								style={{
									fontFamily: "open",
									background: "none",
									color: theme ? "#eee" : "#2b2b2b",
								}}
							/>
						) : (
							<CircularProgress size={10} style={{ color: "#fff" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#fff",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> total unique SMS today
					</b>
					<img
						src={Des}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: 5,
							opacity: ".1",
						}}
					/>
				</Paper>{" "}
			</Grid>
		</>
	);
}

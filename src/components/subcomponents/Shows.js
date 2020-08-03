import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Des from "../../images/des.png";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";
import NumberFormat from "react-number-format";

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
		height: 100,
		position: "relative",
		overflow: "hidden",
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

export default function Shows({ name, color, vmn }) {
	const classes = useStyles();
	const theme = useSelector(state => state.data.theme);
	const data = useSelector(state => state.data);

	const [totalCallersToday, sTCTODAY] = React.useState("");
	const [totalUniqueCallersToday, sTUTODAY] = React.useState("");
	const [totalCallers, sTC] = React.useState("");
	const [totalUniqueCallers, sTU] = React.useState("");

	const [totalSmsToday, setTotalSMSToday] = React.useState("");
	const [totalUniqueSmsToday, setTotalUniqueSMSToday] = React.useState("");
	const [totalSms, setTotalSMS] = React.useState("");
	const [totalUniqueSms, setTotalUniqueSMS] = React.useState("");

	React.useEffect(() => {
		sync();
	}, []);

	const sync = () => {
		axios
			.post("/showtotalcallertoday", {
				name: name,
			})
			.then(res => {
				sTCTODAY(res.data.data);
			})
			.catch(err => {
				console.log(err);
				sTCTODAY(0);
			});

		axios
			.post("/showuniquecallertoday", {
				name: name,
			})
			.then(res => {
				sTUTODAY(res.data.data);
			})
			.catch(err => {
				console.log(err);
				sTUTODAY(0);
			});

		axios
			.post("/showtotalcallers", {
				name: name,
			})
			.then(res => {
				sTC(res.data[0].count);
			})
			.catch(err => {
				console.log(err);
				sTC(0);
			});

		axios
			.post("/showtotaluniquecallers", {
				name: name,
			})
			.then(res => {
				sTU(res.data[0].count);
			})
			.catch(err => {
				console.log(err);
				sTU(0);
			});

		//sms

		axios
			.post("/showtotalsmstoday", {
				name: name,
				vmn: vmn,
			})
			.then(res => {
				setTotalSMSToday(res.data.data);
			})
			.catch(err => {
				console.log(err);
				setTotalSMSToday(0);
			});

		axios
			.post("/showuniquesmstoday", {
				name: name,
				vmn: vmn,
			})
			.then(res => {
				setTotalUniqueSMSToday(res.data.data);
			})
			.catch(err => {
				console.log(err);
				setTotalUniqueSMSToday(0);
			});

		axios
			.post("/showtotalsms", {
				name: name,
				vmn: vmn,
			})
			.then(res => {
				setTotalSMS(res.data[0].count);
			})
			.catch(err => {
				console.log(err);
				setTotalSMS(0);
			});

		axios
			.post("/showtotaluniquesms", {
				name: name,
				vmn: vmn,
			})
			.then(res => {
				setTotalUniqueSMS(res.data[0].count);
			})
			.catch(err => {
				console.log(err);
				setTotalUniqueSMS(0);
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
							: `linear-gradient(135deg, #f1ede6, ${color} 110%, ${color})`,
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
							<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#6b6b6b",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> - total callers
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
							: `linear-gradient(135deg, #f1ede6, ${color} 110%, ${color})`,
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
							<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#6b6b6b",
						}}
					>
						{" "}
						<b>{name === "npmt" ? "NPMT" : name}</b> - total unique callers
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
							: `linear-gradient(135deg, #f1ede6, ${color} 110%, ${color})`,
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
							<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#6b6b6b",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> - total callers today
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
							: `linear-gradient(135deg, #f1ede6, ${color} 110%, ${color})`,
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
							<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#6b6b6b",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> - total unique callers
						today
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

			{/* --------------------- sms -----------------------*/}

			<Grid item xs={10} md={3} lg={3}>
				<Paper
					className={classes.paper}
					style={{
						background: theme
							? `linear-gradient(-90deg, ${color}, #2b2b2b)`
							: `linear-gradient(135deg, #f1ede6, ${color} 110%, ${color})`,
						height: 80,
						marginTop: -20,
					}}
				>
					<h1 className={classes.h}>
						{totalSms !== "" ? (
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
								value={totalSms}
								style={{
									fontFamily: "open",
									background: "none",
									color: theme ? "#eee" : "#2b2b2b",
								}}
							/>
						) : (
							<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#6b6b6b",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> - total SMS
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
							: `linear-gradient(135deg, #f1ede6, ${color} 110%, ${color})`,
						height: 80,
						marginTop: -20,
					}}
				>
					<h1 className={classes.h}>
						{totalUniqueSms !== "" ? (
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
								value={totalUniqueSms}
								style={{
									fontFamily: "open",
									background: "none",
									color: theme ? "#eee" : "#2b2b2b",
								}}
							/>
						) : (
							<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#6b6b6b",
						}}
					>
						{" "}
						<b>{name === "npmt" ? "NPMT" : name}</b> - total unique SMS
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
							: `linear-gradient(135deg, #f1ede6, ${color} 110%, ${color})`,
						height: 80,
						marginTop: -20,
					}}
				>
					<h1 className={classes.h}>
						{totalSmsToday !== "" ? (
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
								value={totalSmsToday}
								style={{
									fontFamily: "open",
									background: "none",
									color: theme ? "#eee" : "#2b2b2b",
								}}
							/>
						) : (
							<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#6b6b6b",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> - total sms today
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
							: `linear-gradient(135deg, #f1ede6, ${color} 110%, ${color})`,
						height: 80,
						marginTop: -20,
					}}
				>
					<h1 className={classes.h}>
						{totalUniqueSmsToday !== "" ? (
							<NumberFormat
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
								value={totalUniqueSmsToday}
								style={{
									fontFamily: "open",
									background: "none",
									color: theme ? "#eee" : "#2b2b2b",
								}}
							/>
						) : (
							<CircularProgress size={10} style={{ color: "#6b6b6b" }} />
						)}
					</h1>
					<b
						className={classes.b}
						style={{
							color: theme ? "#eee" : "#6b6b6b",
						}}
					>
						<b>{name === "npmt" ? "NPMT" : name}</b> - total unique SMS today
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

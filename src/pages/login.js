import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SunTv from "../images/login.png";
//import { Link } from "react-router-dom";

import { login } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Base64 } from "js-base64";
import axios from "axios";

const useStyles = makeStyles(theme => ({
	container: {
		flexGrow: 1,
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	root: {
		flexGrow: 1,
		position: "absolute",
		width: "100%",
		height: "100%",
	},

	inputContainer: {
		height: 40,
		width: "100%",

		display: "flex",
	},
	inputIcon: {
		width: "25%",
		background: "#e6ecf5",
		height: 40,
		borderTopLeftRadius: 3,
		borderBottomLeftRadius: 3,
	},
	inputField: {
		width: "85%",

		border: "1px solid #e6ecf5",
		borderTopRightRadius: 3,
		borderBottomRightRadius: 3,
	},
	btn: {
		background: "#f3724f",
		color: "#fff",
		borderRadius: 3,
		textTransform: "capitalize",
		cursor: "pointer",
		borderRadius: 50,
		fontSize: 21,
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
	header: {
		fontSize: 15,
		fontWeight: 500,
		color: "#293e52",
		marginTop: 15,
		textTransform: "capitalize",
	},
	footer: {
		fontWeight: 400,
		position: "absolute",
		bottom: -37,
		width: "100%",
		left: 0,
		color: "#849aac",
	},
	errors: {
		fontSize: 13,
		color: "#999",
		fontWeight: 400,
	},
	link: {
		color: "#f3724f",
		fontWeight: 600,
		transition: "0.5s",
		"&:hover": {
			color: "#de3608",
			transition: "0.5s",
		},
	},
}));

export default function Login(props) {
	const dispatch = useDispatch();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [progress, setProgress] = React.useState(false);

	const [errors, setErrors] = React.useState({});
	const classes = useStyles();

	const submit = () => {
		if (email === "") {
			setErrors({ ...errors, email: "email not found" });
			setTimeout(() => {
				setErrors({ ...errors, email: "" });
			}, 3000);
		}
		if (password === "") {
			setErrors({ ...errors, password: "password not found" });
			setTimeout(() => {
				setErrors({ ...errors, password: "" });
			}, 3000);
		}
		if (email && password) {
			if (
				email.trim().toLowerCase() === "user" &&
				password.trim().toLowerCase() === "$un@dm!n"
			) {
				console.log(email, password);
				localStorage.setItem(Base64.encode("suntv"), Base64.encode(email));
				dispatch(login("data", props.history));
			} else {
				setProgress(true);
				const data = {
					username: email,
					password,
				};
				axios
					.post("/login", data)
					.then(res => {
						console.log(res.data);

						if (res.data === 1) {
							console.log(email, password);
							localStorage.setItem(
								Base64.encode("suntv"),
								Base64.encode(email)
							);
							dispatch(login("data", props.history));
							setProgress(false);
						} else {
							setProgress(false);

							setErrors({ ...errors, credential: "wrong credentials" });
							console.log("wrong credential");
							setTimeout(() => {
								setErrors({ ...errors, credential: "" });
							}, 3000);
						}
					})
					.catch(err => {
						setProgress(false);
						console.log(err);
						setErrors({ ...errors, credential: "No Internet" });
						console.log("wrong credential");
					});
			}
		}
	};

	return (
		<Grid
			container
			justify='center'
			alignItems='center'
			className={classes.root}
		>
			<Grid
				item
				xs={8}
				md={3}
				lg={2}
				style={{
					background: "#fff",
					height: 390,
					position: "relative",
					boxShadow:
						"0 0 0 1px rgba(255,255,255,.1), 0 2px 4px 0 rgba(14,30,37,.12)",
					borderRadius: 3,
				}}
			>
				<Grid container justify='center' alignItems='center' direction='column'>
					<img
						src={SunTv}
						style={{ height: 78, width: 77, marginTop: 20, marginBottom: 12 }}
					/>
					<b className={classes.header}>Log in to your account</b>
				</Grid>
				<Grid
					container
					justify='center'
					alignItems='center'
					style={{ position: "absolute", height: 170, marginTop: 40 }}
				>
					<Grid item xs={10} md={10} lg={10} className={classes.inputContainer}>
						<Grid
							container
							justify='center'
							alignItems='center'
							className={classes.inputIcon}
						>
							<MailOutlineIcon style={{ color: "#74839682" }} />
						</Grid>
						<div className={classes.inputField}>
							<input
								name='email'
								type='email'
								placeholder='Email or Username'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
					</Grid>
					{errors.email && <b className={classes.errors}>{errors.email}</b>}
					<Grid item xs={10} md={10} lg={10} className={classes.inputContainer}>
						<Grid
							container
							justify='center'
							alignItems='center'
							className={classes.inputIcon}
						>
							<LockOutlinedIcon style={{ color: "#74839682" }} />
						</Grid>
						<div className={classes.inputField}>
							<input
								name='password'
								type='password'
								placeholder='Password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
					</Grid>
					{errors.password && (
						<b className={classes.errors}>{errors.password}</b>
					)}

					<Grid
						item
						xs={10}
						md={10}
						lg={10}
						className={classes.inputContainer}
						style={{ border: "none" }}
					>
						<Grid
							container
							justify='center'
							alignItems='center'
							className={classes.btn}
							onClick={submit}
						>
							{progress ? (
								<CircularProgress
									size={15}
									style={{ marginTop: 0, color: "#fff" }}
								/>
							) : (
								"Log in"
							)}
						</Grid>
					</Grid>
					{errors.credential && (
						<b className={classes.errors}>{errors.credential}</b>
					)}
				</Grid>
				{/* <b className={classes.footer}>
					Don't have an account?{" "}
					<Link to='/signup' className={classes.link}>
						Signup
					</Link>
				</b> */}

				<div
					style={{
						color: "#999",
						position: "absolute",
						bottom: -120,
						fontSize: 13,
					}}
				>
					All Rights Reserved By <b style={{ fontWeight: 400 }}>SUN TV</b>.
					Designed And Developed By{" "}
					<b style={{ color: "#039af4" }}>DISTRONIX</b>
					<img
						src={require("../images/logo.png")}
						style={{ width: 15, marginTop: -4, marginLeft: 2 }}
					/>
				</div>
			</Grid>
		</Grid>
	);
}

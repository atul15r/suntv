import React from "react";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Base64 } from "js-base64";

import { makeStyles } from "@material-ui/core/styles";
import {
	Drawer,
	AppBar,
	Toolbar,
	List,
	CssBaseline,
	Typography,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import Mon from "moment";

import MenuIcon from "@material-ui/icons/Menu";

import {
	Button,
	Grid,
	Header,
	Segment,
	Portal,
	Transition,
	Popup,
	Divider,
	Icon,
} from "semantic-ui-react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Award, Envelope } from "react-bootstrap-icons";

//componenets
import Dashboard from "../components/Dashboard";
import Winners from "../components/Winners";
import EligibleWinners from "../components/EligibleWinners";

import AllCallers from "../components/AllCallers";
import AllSms from "../components/AllSms";

import Questions from "../components/Questions";
import AddWinner from "../components/AddWinners";
import Logout from "../util/Logout";

import { questionsList, toggleTheme } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";

const hash = Base64.encode("suntv");

const drawerWidth = 240;
// #de3608
const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
			boxShadow: "none",
			borderBottom: "1px solid orange",
		}),
		[theme.breakpoints.up("xs")]: {
			position: "fixed",
			width: "100%",
			height: 80,
		},
		[theme.breakpoints.up("md")]: {
			position: "fixed",
			height: "unset",
		},
		[theme.breakpoints.up("lg")]: {
			position: "fixed",
			height: "unset",
		},
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		[theme.breakpoints.up("xs")]: {
			zIndex: 9,
			width: "100%",
		},
		[theme.breakpoints.up("md")]: {
			zIndex: 9,
			width: "-webkit-fill-available",
		},
		[theme.breakpoints.up("lg")]: {
			zIndex: 9,
			width: "-webkit-fill-available",
		},
	},
	menuButton: {
		marginRight: 36,
		[theme.breakpoints.up("xs")]: {
			display: "none",
		},
		[theme.breakpoints.up("md")]: {
			display: "block",
		},
		[theme.breakpoints.up("lg")]: {
			display: "block",
		},
	},
	menuButton2: {
		marginRight: 36,
		[theme.breakpoints.up("xs")]: {
			display: "block",
		},
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
		[theme.breakpoints.up("lg")]: {
			display: "none",
		},
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		overflowX: "hidden",
		[theme.breakpoints.up("xs")]: {
			transition: "0.1s",
		},
		[theme.breakpoints.up("md")]: { background: "#fff" },
		[theme.breakpoints.up("lg")]: { background: "#fff" },
	},
	drawerClose: {
		overflowX: "hidden",
		width: theme.spacing(7) + 1,

		[theme.breakpoints.up("xs")]: {
			width: 0,
		},
		[theme.breakpoints.up("md")]: {
			width: 71,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		[theme.breakpoints.up("lg")]: {
			width: 71,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
	},
	night: {
		background: "#1c1c1c",
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		[theme.breakpoints.up("xs")]: {
			minHeight: 72,
		},

		[theme.breakpoints.up("md")]: {
			minHeight: 56,
		},
		[theme.breakpoints.up("lg")]: { minHeight: 56 },
	},
	content: {
		flexGrow: 1,

		padding: theme.spacing(3),
		[theme.breakpoints.up("xs")]: {
			//padding: 0,
			paddingTop: 40,
			position: "absolute",
			width: "100%",
		},
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(3),
			position: "unset",
		},
		[theme.breakpoints.up("lg")]: {
			padding: theme.spacing(3),
			position: "unset",
		},
	},

	image: {
		width: 81,
		height: 50,
		[theme.breakpoints.up("xs")]: {
			width: 45,
			height: 45,

			display: "none",
		},
		[theme.breakpoints.up("md")]: {
			marginLeft: 0,
			width: 45,
			height: 45,
			marginTop: "unset",

			display: "block",
		},
		[theme.breakpoints.up("lg")]: {
			marginLeft: 0,
			width: 45,
			height: 45,
			marginTop: "unset",

			display: "block",
		},
	},

	menu: {
		[theme.breakpoints.up("xs")]: {
			fontSize: 40,
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "unset",
			marginTop: "unset",
		},
		[theme.breakpoints.up("lg")]: {
			fontSize: "unset",
			marginTop: "unset",
		},
	},
	title: {
		background: "-webkit-linear-gradient(#ffabd9, #039af4)",
		"-webkit-background-clip": "text",
		"-webkit-text-fill-color": "transparent",
		fontWeight: 800,
		[theme.breakpoints.up("xs")]: {
			display: "block",
			position: "absolute",
			left: "50%",
			top: "50%",
			transform: "translate(-50%,-50%)",
			marginTop: 2,
			fontSize: 25,
		},
		[theme.breakpoints.up("md")]: {
			display: "block",
			marginTop: 0,
			marginLeft: 12,
			left: "unset",
			transform: "unset",
			top: "unset",
			position: "unset",
			fontSize: 19,
		},
		[theme.breakpoints.up("lg")]: {
			display: "block",
			marginTop: 0,
			marginLeft: 12,
			left: "unset",
			transform: "unset",
			top: "unset",
			position: "unset",
			fontSize: 19,
		},
	},
	titleTheme: {
		background: "-webkit-linear-gradient(#fff, #fff)",
		"-webkit-background-clip": "text",
		"-webkit-text-fill-color": "transparent",
	},
	footer: {
		color: "#999",
		position: "absolute",
		bottom: 20,
		overflow: "hidden",
		textAlign: "center",
		[theme.breakpoints.up("xs")]: {
			marginLeft: 5,
			marginRight: 5,
			fontSize: 10,
			bottom: 20,
		},

		[theme.breakpoints.up("md")]: {
			fontSize: 12,
			paddingBottom: 0,
		},
		[theme.breakpoints.up("lg")]: { fontSize: 12, paddingBottom: 0 },
	},
	list: {
		// "&:hover": {
		// 	background: "#191818",
		// },
	},
	listResp: {
		background: "#039af424",
		"&:active": {
			background: "#039af424",
		},
		"&:hover": {
			background: "#039af424",
		},
	},
	listRespTheme: {
		background: "#000",
		"&:active": {
			background: "#000",
		},
		"&:hover": {
			background: "#000",
		},
	},
	icon: {
		color: "#999",
	},
	iconResp: {
		color: "#039af4",
	},
	iconRespTheme: {
		color: "#039af4",
	},
	WelcomeAdmin: {
		fontSize: 17,
		position: "absolute",
		left: 0,
		marginLeft: 20,
		fontWeight: 100,
	},
	WelcomeAdminResp: {
		color: "#999",
		marginLeft: 47,
		textTransform: "capitalize",
	},
	WelcomeAdminRespTheme: {
		[theme.breakpoints.up("xs")]: {
			color: "#fff",
			marginLeft: 47,
			textTransform: "capitalize",
		},
		[theme.breakpoints.up("md")]: {
			color: "#039af4",
			marginLeft: 47,
			textTransform: "capitalize",
		},
		[theme.breakpoints.up("lg")]: {
			color: "#039af4",
			marginLeft: 47,
			textTransform: "capitalize",
		},
	},
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
	WelcomeTheme: {
		[theme.breakpoints.up("xs")]: {
			width: "57%",
		},
		[theme.breakpoints.up("md")]: {
			width: "20%",
		},
		[theme.breakpoints.up("lg")]: {
			width: "17%",
		},
	},
}));

export default function SwipeableTemporaryDrawer() {
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => event => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);

	const [values, setValues] = React.useState({
		comp: "Dashboard",
	});
	const themeActive = useSelector(state => state.data.theme);

	const dispatch = useDispatch();
	var format = "hh:mm:ss";

	console.log(Mon().format("LTS"));

	React.useEffect(() => {
		dispatch(questionsList());

		if (
			(Mon().isAfter(Mon({ hour: 18, minute: 0 })) &&
				Mon().isBefore(Mon({ hour: 23, minute: 59 }))) ||
			(Mon().isAfter(Mon({ hour: 0, minute: 0 })) &&
				Mon().isBefore(Mon({ hour: 6, minute: 0 })))
		) {
			if (localStorage.getItem("theme") === "day") {
				if (localStorage.getItem("themeMsg") !== "true") {
					setOpen2(true);
				}
				if (localStorage.getItem("skip") === "true") {
					setOpen2(false);
				}
			} else {
				console.log("false");
				setOpen2(false);
			}
		}
	}, []);

	const themeApply = () => {
		dispatch(toggleTheme("night"));
		localStorage.setItem("themeMsg", "true");
		setOpen2(false);
	};

	const skip = () => {
		localStorage.setItem("skip", "true");
		setOpen2(false);
	};
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const changeComp = comp => {
		setValues({ comp });
		handleDrawerClose();
	};
	const comp = comp => {
		// console.log(comp);
		switch (comp) {
			case "Dashboard":
				document.title = comp + " | SUN TV";
				return <Dashboard />;
			case "Winners":
				document.title = comp + " | SUN TV";
				return <Winners />;
			case "Eligible Winners":
				document.title = comp + " | SUN TV";
				return <EligibleWinners />;
			case "Allcallers":
				document.title = comp + " | SUN TV";
				return <AllCallers />;
			case "AllSms":
				document.title = comp + " | SUN TV";
				return <AllSms />;
			case "Questions":
				document.title = comp + " | SUN TV";
				return <Questions />;
			case "Addwinner":
				document.title = comp + " | SUN TV";
				return <AddWinner />;
			default:
				document.title = "Dashboard | SUN TV";
				return <Dashboard />;
		}
	};

	//mobile view nav

	const list = anchor => (
		<div
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
			style={{ background: themeActive ? "#191818" : "#fff", height: "100%" }}
		>
			<div className={classes.toolbar}>
				<b
					className={clsx(classes.WelcomeAdmin, {
						[classes.WelcomeAdminRespTheme]: themeActive,
						[classes.WelcomeAdminResp]: !themeActive,
					})}
				>
					{Base64.decode(localStorage.getItem(hash)) === "suntvadmin"
						? "Welcome , Admin"
						: "Welcome , User"}
				</b>
			</div>
			<List>
				<ListItem
					button
					onClick={() => changeComp("Dashboard")}
					className={clsx(classes.list, {
						[classes.listRespTheme]: values.comp === "Dashboard" && themeActive,
						[classes.listResp]: values.comp === "Dashboard" && !themeActive,
					})}
				>
					<ListItemIcon>
						<DashboardIcon
							className={clsx(classes.icon, {
								[classes.iconRespTheme]:
									values.comp === "Dashboard" && themeActive,
								[classes.iconResp]: values.comp === "Dashboard" && !themeActive,
							})}
						/>
					</ListItemIcon>
					<ListItemText
						style={{
							color: themeActive ? "#ccc" : "#212121",
						}}
					>
						Dashboard
					</ListItemText>
				</ListItem>
				{Base64.decode(localStorage.getItem(hash)) === "suntvadmin" && (
					<>
						<ListItem
							button
							onClick={() => changeComp("Winners")}
							className={clsx(classes.list, {
								[classes.listRespTheme]:
									values.comp === "Winners" && themeActive,
								[classes.listResp]: values.comp === "Winners" && !themeActive,
							})}
						>
							<ListItemIcon>
								<Icon
									name='winner'
									size='large'
									className={clsx(classes.icon, {
										[classes.iconRespTheme]:
											values.comp === "Winners" && themeActive,
										[classes.iconResp]:
											values.comp === "Winners" && !themeActive,
									})}
								/>
							</ListItemIcon>
							<ListItemText
								style={{
									color: themeActive ? "#ccc" : "#212121",
								}}
							>
								Winners
							</ListItemText>
						</ListItem>

						<ListItem
							button
							onClick={() => changeComp("Eligible Winners")}
							className={clsx(classes.list, {
								[classes.listRespTheme]:
									values.comp === "Eligible Winners" && themeActive,
								[classes.listResp]:
									values.comp === "Eligible Winners" && !themeActive,
							})}
						>
							<ListItemIcon>
								<Award
									size={22}
									className={clsx(classes.icon, {
										[classes.iconRespTheme]:
											values.comp === "Eligible Winners" && themeActive,
										[classes.iconResp]:
											values.comp === "Eligible Winners" && !themeActive,
									})}
								/>
							</ListItemIcon>
							<ListItemText
								style={{
									color: themeActive ? "#ccc" : "#212121",
								}}
							>
								Eligible Winners
							</ListItemText>
						</ListItem>

						<ListItem
							button
							onClick={() => changeComp("Allcallers")}
							className={clsx(classes.list, {
								[classes.listRespTheme]:
									values.comp === "Allcallers" && themeActive,
								[classes.listResp]:
									values.comp === "Allcallers" && !themeActive,
							})}
						>
							<ListItemIcon>
								<PhoneCallbackIcon
									className={clsx(classes.icon, {
										[classes.iconRespTheme]:
											values.comp === "Allcallers" && themeActive,
										[classes.iconResp]:
											values.comp === "Allcallers" && !themeActive,
									})}
								/>
							</ListItemIcon>
							<ListItemText
								style={{
									color: themeActive ? "#ccc" : "#212121",
								}}
							>
								All Callers
							</ListItemText>
						</ListItem>
						<ListItem
							button
							onClick={() => changeComp("AllSms")}
							className={clsx(classes.list, {
								[classes.listRespTheme]:
									values.comp === "AllSms" && themeActive,
								[classes.listResp]: values.comp === "AllSms" && !themeActive,
							})}
						>
							<ListItemIcon>
								<Envelope
									size={20}
									className={clsx(classes.icon, {
										[classes.iconRespTheme]:
											values.comp === "AllSms" && themeActive,
										[classes.iconResp]:
											values.comp === "AllSms" && !themeActive,
									})}
								/>
							</ListItemIcon>
							<ListItemText
								style={{
									color: themeActive ? "#ccc" : "#212121",
								}}
							>
								All SMS
							</ListItemText>
						</ListItem>
						<ListItem
							button
							onClick={() => changeComp("Questions")}
							className={clsx(classes.list, {
								[classes.listRespTheme]:
									values.comp === "Questions" && themeActive,
								[classes.listResp]: values.comp === "Questions" && !themeActive,
							})}
						>
							<ListItemIcon>
								<ContactSupportIcon
									className={clsx(classes.icon, {
										[classes.iconRespTheme]:
											values.comp === "Questions" && themeActive,
										[classes.iconResp]:
											values.comp === "Questions" && !themeActive,
									})}
								/>
							</ListItemIcon>
							<ListItemText
								style={{
									color: themeActive ? "#ccc" : "#212121",
								}}
							>
								Questions
							</ListItemText>
						</ListItem>
						<ListItem
							button
							onClick={() => changeComp("Addwinner")}
							className={clsx(classes.list, {
								[classes.listRespTheme]:
									values.comp === "Addwinner" && themeActive,
								[classes.listResp]: values.comp === "Addwinner" && !themeActive,
							})}
						>
							<ListItemIcon>
								<AddCircleIcon
									className={clsx(classes.icon, {
										[classes.iconRespTheme]:
											values.comp === "Addwinner" && themeActive,
										[classes.iconResp]:
											values.comp === "Addwinner" && !themeActive,
									})}
								/>
							</ListItemIcon>
							<ListItemText
								style={{
									color: themeActive ? "#ccc" : "#212121",
								}}
							>
								Add Winner
							</ListItemText>
						</ListItem>
					</>
				)}
			</List>
			<div className={classes.footer}>
				All Rights Reserved By <b style={{ fontWeight: 400 }}>SUN TV</b>.
				Designed And Developed By <b style={{ color: "#039af4" }}>DISTRONIX</b>
				<img
					src={require("../images/logo.png")}
					style={{ width: 15, marginTop: -2, marginLeft: 2 }}
				/>
			</div>
		</div>
	);

	//destop nav & main screen

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
				style={{
					background: themeActive ? "#242424" : "#fff",
					boxShadow: themeActive ? "none" : "",
				}}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon
							className={classes.menu}
							style={{ color: themeActive ? "#fff" : "#039af4" }}
						/>
					</IconButton>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={toggleDrawer("left", true)}
						edge='start'
						className={clsx(classes.menuButton2, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon
							className={classes.menu}
							style={{ color: themeActive ? "#fff" : "#039af4" }}
						/>
					</IconButton>
					<img src={require("../images/sun.png")} className={classes.image} />{" "}
					<Typography
						variant='h6'
						noWrap
						style={{
							fontFamily: "open",
							color: themeActive ? "#fff" : "#6b6b6b",
						}}
						className={clsx(classes.title, {
							[classes.titleTheme]: themeActive,
							[classes.title]: !themeActive,
						})}
					>
						SUN TV
					</Typography>
					<Logout />
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
						[classes.night]: themeActive,
					}),
				}}
				style={{ boxShadow: themeActive ? "none" : "" }}
			>
				<div className={classes.toolbar}>
					<b
						className={clsx(classes.WelcomeAdmin, {
							[classes.WelcomeAdminRespTheme]: themeActive,
							[classes.WelcomeAdminResp]: !themeActive,
						})}
					>
						{Base64.decode(localStorage.getItem(hash)) === "suntvadmin"
							? "Welcome , Admin"
							: "Welcome , User"}
					</b>
				</div>
				<List>
					<ListItem
						button
						onClick={() => changeComp("Dashboard")}
						className={clsx(classes.list, {
							[classes.listRespTheme]:
								values.comp === "Dashboard" && themeActive,
							[classes.listResp]: values.comp === "Dashboard" && !themeActive,
						})}
					>
						<ListItemIcon>
							<DashboardIcon
								className={clsx(classes.icon, {
									[classes.iconRespTheme]:
										values.comp === "Dashboard" && themeActive,
									[classes.iconResp]:
										values.comp === "Dashboard" && !themeActive,
								})}
							/>
						</ListItemIcon>
						<ListItemText
							style={{
								color: themeActive ? "#ccc" : "#212121",
							}}
						>
							Dashboard
						</ListItemText>
					</ListItem>
					{Base64.decode(localStorage.getItem(hash)) === "suntvadmin" && (
						<>
							<ListItem
								button
								onClick={() => changeComp("Winners")}
								className={clsx(classes.list, {
									[classes.listRespTheme]:
										values.comp === "Winners" && themeActive,
									[classes.listResp]: values.comp === "Winners" && !themeActive,
								})}
							>
								<ListItemIcon>
									<Icon
										name='winner'
										size='large'
										className={clsx(classes.icon, {
											[classes.iconRespTheme]:
												values.comp === "Winners" && themeActive,
											[classes.iconResp]:
												values.comp === "Winners" && !themeActive,
										})}
									/>
								</ListItemIcon>
								<ListItemText
									style={{
										color: themeActive ? "#ccc" : "#212121",
									}}
								>
									Winners
								</ListItemText>
							</ListItem>

							<ListItem
								button
								onClick={() => changeComp("Eligible Winners")}
								className={clsx(classes.list, {
									[classes.listRespTheme]:
										values.comp === "Eligible Winners" && themeActive,
									[classes.listResp]:
										values.comp === "Eligible Winners" && !themeActive,
								})}
							>
								<ListItemIcon>
									<Award
										size={22}
										className={clsx(classes.icon, {
											[classes.iconRespTheme]:
												values.comp === "Eligible Winners" && themeActive,
											[classes.iconResp]:
												values.comp === "Eligible Winners" && !themeActive,
										})}
									/>
								</ListItemIcon>
								<ListItemText
									style={{
										color: themeActive ? "#ccc" : "#212121",
									}}
								>
									Eligible Winners
								</ListItemText>
							</ListItem>

							<ListItem
								button
								onClick={() => changeComp("Allcallers")}
								className={clsx(classes.list, {
									[classes.listRespTheme]:
										values.comp === "Allcallers" && themeActive,
									[classes.listResp]:
										values.comp === "Allcallers" && !themeActive,
								})}
							>
								<ListItemIcon>
									<PhoneCallbackIcon
										className={clsx(classes.icon, {
											[classes.iconRespTheme]:
												values.comp === "Allcallers" && themeActive,
											[classes.iconResp]:
												values.comp === "Allcallers" && !themeActive,
										})}
									/>
								</ListItemIcon>
								<ListItemText
									style={{
										color: themeActive ? "#ccc" : "#212121",
									}}
								>
									All Callers
								</ListItemText>
							</ListItem>

							<ListItem
								button
								onClick={() => changeComp("AllSms")}
								className={clsx(classes.list, {
									[classes.listRespTheme]:
										values.comp === "AllSms" && themeActive,
									[classes.listResp]: values.comp === "AllSms" && !themeActive,
								})}
							>
								<ListItemIcon>
									<Envelope
										size={20}
										className={clsx(classes.icon, {
											[classes.iconRespTheme]:
												values.comp === "AllSms" && themeActive,
											[classes.iconResp]:
												values.comp === "AllSms" && !themeActive,
										})}
									/>
								</ListItemIcon>
								<ListItemText
									style={{
										color: themeActive ? "#ccc" : "#212121",
									}}
								>
									All SMS
								</ListItemText>
							</ListItem>
							<ListItem
								button
								onClick={() => changeComp("Questions")}
								className={clsx(classes.list, {
									[classes.listRespTheme]:
										values.comp === "Questions" && themeActive,
									[classes.listResp]:
										values.comp === "Questions" && !themeActive,
								})}
							>
								<ListItemIcon>
									<ContactSupportIcon
										className={clsx(classes.icon, {
											[classes.iconRespTheme]:
												values.comp === "Questions" && themeActive,
											[classes.iconResp]:
												values.comp === "Questions" && !themeActive,
										})}
									/>
								</ListItemIcon>
								<ListItemText
									style={{
										color: themeActive ? "#ccc" : "#212121",
									}}
								>
									Questions
								</ListItemText>
							</ListItem>
							<ListItem
								button
								onClick={() => changeComp("Addwinner")}
								className={clsx(classes.list, {
									[classes.listRespTheme]:
										values.comp === "Addwinner" && themeActive,
									[classes.listResp]:
										values.comp === "Addwinner" && !themeActive,
								})}
							>
								<ListItemIcon>
									<AddCircleIcon
										className={clsx(classes.icon, {
											[classes.iconRespTheme]:
												values.comp === "Addwinner" && themeActive,
											[classes.iconResp]:
												values.comp === "Addwinner" && !themeActive,
										})}
									/>
								</ListItemIcon>
								<ListItemText
									style={{
										color: themeActive ? "#ccc" : "#212121",
									}}
								>
									Add Winner
								</ListItemText>
							</ListItem>
						</>
					)}
				</List>
			</Drawer>
			<main className={classes.content} onClick={handleDrawerClose}>
				<Transition visible={open2} duration={500} animation='slide right'>
					<Grid columns={2}>
						<Grid.Column>
							<Portal open={open2}>
								<Segment
									className={classes.WelcomeTheme}
									style={{
										right: 5,
										top: "12%",
										zIndex: 1000,
										position: "fixed",
									}}
								>
									<Header>
										<Icon name='lightbulb outline' color='yellow' />
										Dark Theme
									</Header>
									<p>
										Enable dark theme User Interface, Dark themes reduce the
										luminance emitted by device screens, while still meeting
										minimum color contrast ratios.
									</p>

									<Grid divided columns='equal'>
										<Grid.Column>
											<Popup
												trigger={
													<Button
														color='black'
														content='Dark'
														fluid
														onClick={themeApply}
														style={{
															borderRadius: 20,
															boxShadow: "12px 15px 20px rgba(0,0,0,.1)",
															fontWeight: 400,
														}}
													/>
												}
												position='top center'
												size='tiny'
												inverted
												content='Enable dark theme'
											/>
										</Grid.Column>
										<Grid.Column>
											<Popup
												trigger={
													<Button
														color='blue'
														content='Close'
														fluid
														style={{
															borderRadius: 20,
															boxShadow: "12px 15px 20px rgba(0,0,0,.1)",
															fontWeight: 400,
														}}
														onClick={skip}
													/>
												}
												content='Close Popup'
												position='top center'
												size='tiny'
												inverted
											/>
										</Grid.Column>
									</Grid>
								</Segment>
							</Portal>
						</Grid.Column>
					</Grid>
				</Transition>
				<SwipeableDrawer
					anchor='left'
					open={state["left"]}
					onClose={toggleDrawer("left", false)}
					onOpen={toggleDrawer("left", true)}
					swipeAreaWidth={50}
				>
					{list("left")}
				</SwipeableDrawer>

				<div className={classes.toolbar} />
				{values.comp && comp(values.comp)}
			</main>
		</div>
	);
}

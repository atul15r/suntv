import React from "react";
import {
	Grid,
	Container,
	CircularProgress,
	Slide,
	Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import Mon from "moment";
import {
	cleanGeneratedList,
	generateWinnersReq,
	downloadGeneratedWinnersReq,
	generateForOldDate,
} from "../redux/actions/dataActions";
import axios from "axios";
import { Table, Message, Transition } from "semantic-ui-react";
import { CSVLink } from "react-csv";
import Pagination from "../util/Pagination";
import ResponsiveTable from "../util/ResponsiveTableWinners";

const useStyles = makeStyles(theme => ({
	header: {
		fontSize: 19,
		color: "#6b6b6b",
		marginTop: 100,
		fontFamily: "open",
	},
	activeBtn: {
		background: "#039af4",
		borderRadius: 3,
		textTransform: "capitalize",
		cursor: "pointer",
		borderRadius: 50,
		paddingLeft: 15,
		paddingRight: 15,
		height: 30,
		position: "relative",
		transition: "all .1s linear	",
		color: "#fff",
		boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.12)",
		userSelect: "none",
		"&:hover": {
			transition:
				"opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease",
			boxShadow: "12px 15px 20px rgba(0,0,0,.1)",
		},

		"&:active": {
			transition: "all .1s linear	",
			transform: "translateY(3px)",
		},
	},

	disableBtn: {
		background: "#039af47d",
		borderRadius: 3,
		textTransform: "capitalize",
		cursor: "no-drop",
		borderRadius: 50,
		paddingLeft: 15,
		paddingRight: 15,
		height: 30,
		position: "relative",
		color: "#fff",
		boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.12)",
		userSelect: "none",
		"&:hover": {
			transition: "none",
			boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.12)",
		},
		"&:active": {
			transition: "all .1s linear	",
			transform: "translateY(0px)",
		},
	},

	txt: {
		transform: "translate(-50%,-50%)",
		left: "50%",
		top: "50%",
		position: "absolute",
		fontWeight: 500,
		width: "100%",
	},
	wrap: {
		width: "100%",
		position: "relative",
		height: 130,
		background: "#fff",
		boxShadow: "0 0 0 1px rgba(255,255,255,.1), 0 2px 4px 0 rgba(14,30,37,.12)",
		borderRadius: 5,
		border: "1px solid rgba(34,36,38,.15)",
	},
	night: {
		background: "#2b2b2b",
	},
	table: {
		[theme.breakpoints.up("xs")]: {
			display: "none",
		},
		[theme.breakpoints.up("md")]: {
			display: "block",
			marginTop: 50,
		},
		[theme.breakpoints.up("lg")]: {
			display: "block",
			marginTop: 50,
		},
	},
	footer: {
		color: "#999",
		position: "absolute",
		bottom: 20,

		[theme.breakpoints.up("xs")]: {
			marginLeft: 5,
			marginRight: 5,
			fontSize: 10,
			paddingBottom: 10,
			display: "none",
		},

		[theme.breakpoints.up("md")]: {
			fontSize: 12,
			paddingBottom: 0,
			display: "block",
		},
		[theme.breakpoints.up("lg")]: {
			fontSize: 12,
			paddingBottom: 0,
			width: "100%",
			display: "block",
		},
	},
}));

var currentPosts = [];

function TransitionUp(props) {
	return <Slide {...props} direction='up' />;
}

export default function Winners() {
	const [selectedDate, setSelectedDate] = React.useState(
		Mon().format("YYYY-MM-DD")
	);
	const [winners, setWinners] = React.useState(false);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [postsPerPage] = React.useState(10);
	const [msg, setMsg] = React.useState("");

	const [state, setState] = React.useState({
		open2: false,
		vertical: "bottom",
		horizontal: "right",
	});
	const dispatch = useDispatch();

	const handleDateChange = date => {
		console.log(date.target.value);
		setSelectedDate(date.target.value);
		dispatch(cleanGeneratedList());
		dispatch(generateWinnersReq(date.target.value));
	};
	const theme = useSelector(state => state.data.theme);
	const data = useSelector(state => state.data);

	const classes = useStyles();

	const generateWinners = () => {
		console.log(selectedDate);
		if (selectedDate !== "") {
			const data = {
				date: selectedDate,
			};

			dispatch(generateWinnersReq(selectedDate));
		} else {
			console.log("input field required");
			setMsg("value to input field required");
			setState({ ...state, open2: true });
			setTimeout(() => {
				setState({ ...state, open2: false });
				setMsg("");
			}, 3000);
		}
	};

	const downloadWinners = () => {
		if (selectedDate !== "") {
			const data = {
				date: selectedDate,
			};

			dispatch(downloadGeneratedWinnersReq(data));
		} else {
			console.log("input field required");

			setMsg("value to input field required");
			setState({ ...state, open2: true });
			setTimeout(() => {
				setState({ ...state, open2: false });
				setMsg("");
			}, 3000);
		}
	};

	const generateWinnersForOldDate = () => {
		if (selectedDate !== "") {
			dispatch(generateForOldDate(selectedDate));
		} else {
			console.log("input field required");

			setMsg("value to input field required");
			setState({ ...state, open2: true });
			setTimeout(() => {
				setState({ ...state, open2: false });
				setMsg("");
			}, 3000);
		}
	};

	const generating = () => {
		setMsg("Please wait, data has been in process...");
		setState({ ...state, open2: true });
		setTimeout(() => {
			setState({ ...state, open2: false });
			setMsg("");
		}, 3000);
	};

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	currentPosts = data.generatedList.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = pageNumber => setCurrentPage(pageNumber);

	const { vertical, horizontal, open2 } = state;
	//console.log("gnrdlist length", data.generatedList.length);

	return (
		<div>
			<p className={classes.header}>Winners List</p>

			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={3} lg={3}>
					<Table celled striped inverted={theme}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan='3'>
									{" "}
									Generate {"&"} Download winners
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row id='bR'>
								<Table.Cell>
									<div
										className='ui input'
										style={{ width: "60%", marginLeft: "20%" }}
									>
										<input
											type='date'
											value={selectedDate}
											placeholder='Pick Date'
											style={{
												background: theme ? "#212020" : "#fff",
												color: theme ? "#ccc" : "#212121",
												userSelect: "none",
											}}
											onChange={handleDateChange}
										/>
									</div>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<Container maxWidth='sm'>
						<Grid
							container
							justify='center'
							alignItems='center'
							style={{ marginTop: 15, justifyContent: "space-around" }}
						>
							<Grid
								xs={5}
								md={5}
								lg={5}
								className={clsx(
									classes.activeBtn,
									!data.generate && classes.disableBtn
								)}
								onClick={
									data.generate && !data.winnersprogress
										? data.generateForOldDate
											? generateWinnersForOldDate
											: generateWinners
										: data.generate
										? generating
										: undefined
								}
							>
								{data.winnersprogress ? (
									<CircularProgress
										size={12}
										style={{ color: "#fff", margintop: 10 }}
									/>
								) : (
									<b className={classes.txt}>
										{data.generateForOldDate ? "Generate" : "Generate"}
									</b>
								)}
							</Grid>
							{data.generatedList.length > 0 ? (
								<Grid
									xs={5}
									md={5}
									lg={5}
									className={clsx(classes.activeBtn)}
									style={{
										background: "#21ba45",
									}}
								>
									<CSVLink
										data={data.generatedList}
										filename={"Winners List - " + selectedDate + ".csv"}
										style={{ color: "#fff" }}
									>
										<b className={classes.txt}>Download</b>
									</CSVLink>
								</Grid>
							) : (
								<Grid
									xs={5}
									md={5}
									lg={5}
									className={clsx(
										classes.activeBtn,
										data.generate && classes.disableBtn
									)}
									onClick={data.generate ? undefined : downloadWinners}
								>
									{data.winnersprogress2 ? (
										<CircularProgress
											size={12}
											style={{ color: "#fff", margintop: 10 }}
										/>
									) : (
										<b className={classes.txt}>Download</b>
									)}
								</Grid>
							)}
						</Grid>
					</Container>
				</Grid>
				{data.generatedList.length > 0 && (
					<Grid item xs={10} lg={10} className={classes.table}>
						<Table celled inverted={theme}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>serial no.</Table.HeaderCell>
									<Table.HeaderCell>Date</Table.HeaderCell>

									<Table.HeaderCell>Show Name</Table.HeaderCell>
									<Table.HeaderCell>Phone No</Table.HeaderCell>
									{/* <Table.HeaderCell>Circle</Table.HeaderCell> */}
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{currentPosts.map((data, i) => (
									<Table.Row key={i}>
										<Table.Cell>
											{currentPage === 1
												? i + 1
												: i + 1 + 10 * (currentPage - 1)}
										</Table.Cell>
										<Table.Cell>
											{Mon(data.date).format("DD-MM-YYYY")}
										</Table.Cell>
										<Table.Cell>{data.name}</Table.Cell>
										<Table.Cell>{data.phone}</Table.Cell>
										{/* <Table.Cell>{data.circle}</Table.Cell> */}
									</Table.Row>
								))}
							</Table.Body>

							{data.generatedList.length > 10 && (
								<Table.Footer>
									<Pagination
										postsPerPage={postsPerPage}
										totalPosts={data.generatedList.length}
										paginate={paginate}
										activePN={currentPage}
										col='5'
									/>
								</Table.Footer>
							)}
						</Table>
					</Grid>
				)}
			</Grid>

			{data.generatedList.length > 0 && (
				<ResponsiveTable dataShots={data.generatedList} />
			)}

			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={5} lg={4}>
					<Transition
						visible={data.generateError !== "" ? true : false}
						animation='scale'
						duration={200}
					>
						<Message style={{ marginTop: 40 }}>
							{data.generateError === "Download Data Now" ||
							data.generateError ===
								"Winners has been NOT generated yet for this date ,GENERATE NOW" ? (
								""
							) : (
								<Message.Header>Issue!</Message.Header>
							)}
							<Message.Item>{data.generateError}</Message.Item>
						</Message>
					</Transition>
				</Grid>
				<div
					className={classes.footer}
					style={{
						position: data.generatedList.length > 0 ? "unset" : "absolute",
						padding: data.generatedList.length > 0 ? 20 : "unset",
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

			<Snackbar
				id='snack'
				anchorOrigin={{ vertical, horizontal }}
				open={open2}
				message={msg}
				key={vertical + horizontal}
				TransitionComponent={TransitionUp}
			/>
		</div>
	);
}

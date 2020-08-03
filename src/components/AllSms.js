import React from "react";
import { Grid, Container, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import Mon from "moment";
import Pagination from "../util/Pagination";
import ResponsiveTable from "../util/ResponsiveTableAllCallers";

import { getAllSMS, cleanSMSByDate } from "../redux/actions/dataActions";
import {
	Icon,
	Label,
	Menu,
	Table,
	Message,
	Transition,
} from "semantic-ui-react";
import { CSVLink, CSVDownload } from "react-csv";

const useStyles = makeStyles(theme => ({
	header: {
		fontSize: 19,
		color: "#6b6b6b",
		marginTop: 100,
	},
	btn: {
		background: "#039af47d",
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
			background: "#039af4",
			transition:
				"opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease",
			boxShadow: "12px 15px 20px rgba(0,0,0,.1)",
		},

		"&:active": {
			transition: "all .1s linear	",
			transform: "translateY(3px)",
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
			position: "fixed",
			bottom: 20,
		},

		[theme.breakpoints.up("md")]: {
			fontSize: 12,
			paddingBottom: 0,
		},
		[theme.breakpoints.up("lg")]: { fontSize: 12, paddingBottom: 0 },
	},
}));

var currentPosts = [];

export default function AllSms() {
	const [selectedDate, setSelectedDate] = React.useState(
		Mon().format("YYYY-MM-DD")
	);
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = React.useState(1);
	const [postsPerPage] = React.useState(10);

	const handleDateChange = date => {
		console.log("allcallers date", date.target.value);
		setSelectedDate(date.target.value);
		dispatch(cleanSMSByDate());
	};

	const classes = useStyles();
	const theme = useSelector(state => state.data.theme);
	const data = useSelector(state => state.data);

	// const getCallers = () => {
	// 	dispatch(getAllCallers(selectedDate, "progress2"));
	// };

	const downloadCallers = () => {
		dispatch(getAllSMS(selectedDate, "progress"));
	};

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	currentPosts = data.getAllCallersByDate.slice(
		indexOfFirstPost,
		indexOfLastPost
	);
	const paginate = pageNumber => setCurrentPage(pageNumber);
	console.log(data);
	return (
		<div>
			<p className={classes.header}>All SMS</p>
			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={3} lg={3}>
					<Table celled striped inverted={theme}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan='3' style={{ position: "relative" }}>
									SMS
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
											placeholder='Pick Date'
											style={{
												background: theme ? "#212020" : "#fff",
												color: theme ? "#ccc" : "#212121",
												userSelect: "none",
											}}
											value={selectedDate}
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
							{data.getAllSmsByDate.length > 0 ? (
								<Grid
									xs={5}
									md={5}
									lg={5}
									className={classes.btn}
									style={{ background: "#21ba45" }}
								>
									<CSVLink
										data={data.getAllSmsByDate}
										filename={"AllSmsList - " + selectedDate + ".csv"}
									>
										<b className={classes.txt} style={{ color: "#fff" }}>
											Now Download
										</b>
									</CSVLink>
								</Grid>
							) : (
								<Grid
									xs={5}
									md={5}
									lg={5}
									className={classes.btn}
									onClick={downloadCallers}
									style={{
										background: data.smsprogress ? "#039af4" : "#039af47d",
									}}
								>
									{data.smsprogress ? (
										<CircularProgress
											size={12}
											style={{ color: "#fff", margintop: 10 }}
										/>
									) : (
										<b className={classes.txt}> Download</b>
									)}
								</Grid>
							)}

							{/* <Grid
								xs={5}
								md={5}
								lg={5}
								className={classes.btn}
								onClick={getCallers}
							>
								{data.progress2 ? (
									<CircularProgress
										size={12}
										style={{ color: "#fff", margintop: 10 }}
									/>
								) : (
									<b className={classes.txt}>View Callers</b>
								)}
							</Grid> */}
						</Grid>
					</Container>
				</Grid>
				{/* 
				{data.getAllCallersByDate.length > 0 && (
					<Grid item xs={10} lg={10} className={classes.table}>
						<Table celled inverted={theme}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>serial no.</Table.HeaderCell>

									<Table.HeaderCell>call sid</Table.HeaderCell>
									<Table.HeaderCell>call from</Table.HeaderCell>

									<Table.HeaderCell>call to</Table.HeaderCell>
									<Table.HeaderCell>call time</Table.HeaderCell>
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

										<Table.Cell>{data.call_sid}</Table.Cell>
										<Table.Cell>{data.call_from}</Table.Cell>
										<Table.Cell>{data.call_to}</Table.Cell>
										<Table.Cell>{data.start_time}</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>

							{data.getAllCallersByDate.length > 9 && (
								<Table.Footer>
									<Pagination
										postsPerPage={postsPerPage}
										totalPosts={data.getAllCallersByDate.length}
										paginate={paginate}
										activePN={currentPage}
										col='5'
									/>
								</Table.Footer>
							)}
						</Table>
					</Grid>
				)} */}
			</Grid>
			{/* {data.getAllCallersByDate.length > 0 && (
				<ResponsiveTable dataShots={data.getAllCallersByDate} />
			)} */}
			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={5} lg={4}>
					<Transition
						visible={data.noAllSmsByDate}
						animation='scale'
						duration={500}
					>
						<Message style={{ marginTop: 40 }}>
							<Message.Header>No Data Found!</Message.Header>
							<Message.Item>
								After Querying , No Data found For Date {selectedDate}
							</Message.Item>
						</Message>
					</Transition>
				</Grid>
				<div className={classes.footer}>
					All Rights Reserved By <b style={{ fontWeight: 400 }}>SUN TV</b>.
					Designed And Developed By{" "}
					<b style={{ color: "#039af4" }}>DISTRONIX</b>
					<img
						src={require("../images/logo.png")}
						style={{ width: 15, marginTop: -4, marginLeft: 2 }}
					/>
				</div>
			</Grid>
		</div>
	);
}

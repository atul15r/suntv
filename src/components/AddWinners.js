import React, { useState } from "react";
import { Grid, Chip, Slide, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Icon, Table, Dropdown, Button, Modal } from "semantic-ui-react";
import CSVReader from "react-csv-reader";
import Mon from "moment";
import Noti from "../util/Noti";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Pagination from "../util/Pagination";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { pushWinner, deleteWinner } from "../redux/actions/dataActions";
import { shows } from "../util/data";
import ResponsiveTable from "../util/ResponsiveTableAddWinner";
import { Archive } from "react-bootstrap-icons";
import { message } from "antd";

const useStyles = makeStyles(theme => ({
	header: {
		fontSize: 19,
		color: "#6b6b6b",
		marginTop: 100,
	},
	btn: {
		background: "#e65730",
		color: "#fff",
		borderRadius: 3,
		textTransform: "capitalize",
		cursor: "pointer",
		borderRadius: 50,
		paddingLeft: 15,
		paddingRight: 15,
		height: 30,
		position: "relative",
	},
	txt: {
		transform: "translate(-50%,-50%)",
		left: "50%",
		top: "50%",
		position: "absolute",
		color: "#fff",
		fontWeight: 500,
		width: "100%",
	},
	wrap: {
		boxShadow: "0 0 0 1px rgba(255,255,255,.1), 0 2px 4px 0 rgba(14,30,37,.12)",
		position: "relative",
	},
	addbtn: {
		marginTop: -12,
		marginLeft: 1,
		borderRadius: 0,
		background: "#fafafa",
	},
	table: {
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

	csvSearch: {
		[theme.breakpoints.up("xs")]: {
			marginTop: 55,
			height: 132,
		},
		[theme.breakpoints.up("md")]: { marginTop: 10, height: "unset" },
		[theme.breakpoints.up("lg")]: {
			marginTop: 10,
			height: "unset",
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
	trash: {
		color: "#999",
		cursor: "pointer",

		"&:hover": {
			color: "#039af4",
			transition: "0.5s",
		},
		"&:active": {
			transition: "all .1s linear	",
			transform: "translateY(3px)",
		},
	},
}));

var currentPosts = [];
var multiplePhoneNo = [];
const key = "updatable";

function TransitionUp(props) {
	return <Slide {...props} direction='up' />;
}

function AddWinners() {
	const [qid, setQid] = useState("");
	const [openModal, setOpenModal] = useState(false);

	const [result, setResult] = React.useState([]);

	const [show, setShow] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState("");
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [postsPerPage] = React.useState(10);
	const [multiplePhone, setMultiplePhone] = React.useState(false);
	const [csv, setCsv] = React.useState("");

	const [state, setState] = React.useState({
		open2: false,
		vertical: "bottom",
		horizontal: "right",
	});
	const [searchBy, setSearch] = React.useState({
		search1: "",
		search2: "",
		search3: "",
		search4: "",
		search5: "",
	});

	const dispatch = useDispatch();
	const theme = useSelector(state => state.data.theme);
	const qL = useSelector(state => state.data.winnersList);

	const classes = useStyles();

	const handleClick = event => {
		document.getElementById("hiddenFileInput").click();
	};
	const handleChange = (data, fileInfo) => {
		//	console.log(data[1], data[2]);
		console.log("sucess csv");
		setCsv(fileInfo.name);
		//console.log(multiplePhoneNo);

		data.map((data, i) => {
			if (i !== 0) {
				const data2 = {
					show: data[1],
					phone: data[2],
				};
				multiplePhoneNo.push(data2);
			}
		});
		//console.log("after fill", multiplePhoneNo);
	};

	const submitWinner = () => {
		if (multiplePhone && multiplePhoneNo.length > 0) {
			if (date === "") {
				console.log("required field input from multipliphoneno", open);
				setState({ ...state, open2: true });
				setTimeout(() => {
					setState({ ...state, open2: false });
				}, 3000);
			} else {
				setLoading(true);

				multiplePhoneNo.map((data, i) => {
					if (data) {
						// console.log("axiosss", i, data);
						if (data.show !== undefined && data.show !== "") {
							console.log(i, data.show);

							const winnersData = {
								show: data.show,
								date,
								phone: data.phone,
							};

							console.log(winnersData);
							axios
								.post("/addwinners", winnersData)
								.then(res => {
									console.log("axyios");
									setOpen(true);
									setLoading(false);
									dispatch(
										pushWinner({
											show_name: data.show,
											date,
											phone: data.phone,
										})
									);
								})
								.catch(err => {
									setOpen(false);
									setLoading(false);
								});
						}
					}
				});
			}
		} else {
			if (show === "" || phone === "" || date === "") {
				console.log("required field input", open);
				setState({ ...state, open2: true });
				setTimeout(() => {
					setState({ ...state, open2: false });
				}, 3000);
			} else {
				setLoading(true);
				console.log("axiosss");
				const data = {
					show,
					date,
					phone,
				};

				axios
					.post("/addwinners", data)
					.then(res => {
						console.log("axyios");
						setOpen(true);
						setLoading(false);
						dispatch(pushWinner({ show_name: show, date, phone }));
					})
					.catch(err => {
						setOpen(false);
						setLoading(false);
					});
			}
		}

		// setOpen(false);
		// setShow("");
		// setPhone("");
	};

	const changePhoneCsv = () => {
		setMultiplePhone(!multiplePhone);
		// setPhone("");
		// multiplePhoneNo = "";
	};

	const searcho = e => {
		setSearch({
			[e.target.name]: e.target.value,
		});
		if (e.target.name === "search5") {
			setSearch({
				search1: "",
				search2: "",
				search3: "",
				search4: "",
			});

			searchGlobal(e.target.name, e.target.value);
		} else search(e.target.name, e.target.value);
	};

	const search = debounce((name, value) => {
		var result = [];
		if (value.length > 0) {
			setCurrentPage(1);

			const pattern = `[A-Za-z.\s]*${value.toLowerCase()}[A-Za-z.\s]*`;
			const matchRegEx = new RegExp(pattern);

			if (name === "search1") {
				setSearch({
					search2: "",
					search3: "",
					search4: "",
					search5: "",
				});
				if (value - 1 <= qL.length && value > -1) {
					result.push(qL[value - 1]);
				}
			}

			if (name === "search2") {
				setSearch({
					search1: "",
					search3: "",
					search4: "",
					search5: "",
				});
				result = qL.filter(data => matchRegEx.test(data.show_name));
			} else if (name === "search3") {
				setSearch({
					search1: "",
					search2: "",
					search4: "",
					search5: "",
				});
				result = qL.filter(data => matchRegEx.test(data.date));
			} else if (name === "search4") {
				setSearch({
					search1: "",
					search2: "",
					search3: "",
					search5: "",
				});
				const matchRegEx = new RegExp(parseInt(value));

				result = qL.filter(data => matchRegEx.test(parseInt(data.phone)));
			}

			//console.log(result, "---op");
			setResult({ result });
		} else {
			setResult({ result: undefined });
		}
	}, 100);

	const searchGlobal = debounce((name, value) => {
		var result = [];
		if (value.length > 0) {
			setCurrentPage(1);
			console.log("searching in global", value);
			if (name === "search5") {
				const pattern = `[A-Za-z.\s]*${value.toLowerCase()}[A-Za-z.\s]*`;
				const matchRegE = new RegExp(pattern);
				qL.filter(data => matchRegE.test(data.show_name)).map(data => {
					result.push(data);
				});

				qL.filter(data => matchRegE.test(data.date)).map(data => {
					result.push(data);
				});

				const matchReg = new RegExp(parseInt(value));
				qL.filter(data => matchReg.test(parseInt(data.phone))).map(data => {
					result.push(data);
				});

				// console.log(result, "---op");
				setResult({ result });
			} else {
				setResult({ result: undefined });
			}
		}
	}, 100);

	React.useEffect(() => {
		//console.log(result.result);
	}, [result]);

	if (result.result !== undefined) {
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOfFirstPost = indexOfLastPost - postsPerPage;
		currentPosts = result.result.slice(indexOfFirstPost, indexOfLastPost);

		//console.log("result attached", currentPosts);
	} else {
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOfFirstPost = indexOfLastPost - postsPerPage;
		currentPosts = qL.slice(indexOfFirstPost, indexOfLastPost);
		//console.log("result default", currentPosts);
	}

	// Get current posts
	const paginate = pageNumber => {
		// setResult("");
		setCurrentPage(pageNumber);
	};

	const modalOpen = id => {
		console.log("m o id", id);
		setOpenModal(true);
		setQid(id);
	};

	const closeModal = () => {
		setOpenModal(false);
	};

	const deleteWinnerById = () => {
		//console.log("winner qid", qid);
		message.loading({
			content: "Deleting...",
			key,
			style: {
				marginTop: 43,
			},
		});

		axios
			.post("/deletewinners", { id: qid })
			.then(res => {
				console.log("successfully deleted", qid);
				dispatch(deleteWinner(qid));
				setOpenModal(false);

				if (result.length === undefined) {
					setSearch({
						search1: "",
						search2: "",
						search3: "",
						search4: "",
						search5: "",
					});
					setResult("");
				}

				message.success({
					content: "Successfully Deleted!",
					key,
					duration: 2,
					style: {
						marginTop: 43,
					},
				});
			})
			.catch(err => {
				setOpenModal(false);
			});
	};

	const { vertical, horizontal, open2 } = state;
	const { search1, search2, search3, search4, search5 } = searchBy;

	return (
		<div>
			<p className={classes.header}>Add Winner</p>
			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={4} lg={5}>
					<Table celled inverted={theme} className={classes.wrap}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Date</Table.HeaderCell>
								<Table.HeaderCell>Shows</Table.HeaderCell>
								<Table.HeaderCell>
									Winner
									{!multiplePhone ? " Phone No" : "'s CSV File"}{" "}
									<Chip
										label={multiplePhone ? "Phone" : "CSV"}
										onClick={changePhoneCsv}
									/>
								</Table.HeaderCell>{" "}
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row id='bR'>
								<Table.Cell>
									<div className='ui input' style={{ width: "100%" }}>
										<input
											type='date'
											defaultValue={Mon(new Date()).format("YYYY-MM-DD")}
											placeholder='Pick Date'
											style={{
												background: theme ? "#212020" : "#fff",
												color: theme ? "#ccc" : "#212121",
											}}
											value={date}
											onChange={e => setDate(e.target.value)}
										/>
									</div>
								</Table.Cell>

								<Table.Cell>
									<Dropdown
										disabled={multiplePhone ? true : false}
										name='name'
										placeholder='Select Show'
										fluid
										search
										selection
										options={shows}
										onChange={(e, data) => setShow(data.value)}
										style={{
											background: theme ? "#212020" : "#fff",
										}}
									/>
								</Table.Cell>

								<Table.Cell>
									<div className='ui input' style={{ width: "100%" }}>
										{multiplePhone ? (
											<input
												onClick={handleClick}
												type='text'
												placeholder='select csv file'
												value={csv}
												style={{
													background: theme ? "#212020" : "#fff",
												}}
											/>
										) : (
											<input
												type='text'
												placeholder='Phone'
												value={phone}
												onChange={e => setPhone(e.target.value)}
												style={{
													background: theme ? "#212020" : "#fff",
												}}
											/>
										)}
										<CSVReader
											cssClass='csv-reader-input'
											cssInputClass='csvInput'
											inputId='hiddenFileInput'
											onFileLoaded={handleChange}
										/>
									</div>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<Button
						style={{ background: "#039af4", color: "#fff" }}
						id='btn'
						onClick={submitWinner}
						loading={loading}
					>
						<Icon name='add' /> Add Winner
					</Button>
				</Grid>

				{qL.length > 0 && (
					<Grid container justify='center' className={classes.csvSearch}>
						<Grid item xs={1} md={2} lg={2} style={{ position: "relative" }}>
							{" "}
							<CSVLink data={qL} filename='AllWinnersList - Surya TV.csv'>
								<Chip
									id='csv'
									icon={
										<Icon
											name='arrow alternate circle down outline'
											size='large'
											style={{
												position: "absolute",
												left: 5,
												color: theme ? "#a333c8" : "#999",
											}}
										/>
									}
									label='CSV'
									clickable
									style={{
										width: 80,
										height: 30,
										fontWeight: 500,
										background: theme ? "#2b2b2b" : "#fff",
										color: theme ? "#ccc" : "#6b6b6b",
										border: theme ? "none" : "1px solid #dfdede",
										textAlign: "right",
									}}
								/>
							</CSVLink>
						</Grid>
						<Grid item xs={9} md={8} lg={8}></Grid>

						<Grid item xs={10} md={2} lg={2}>
							<div className='ui icon input' style={{ width: "100%" }}>
								<input
									type='text'
									name='search5'
									value={search5}
									onChange={e => searcho(e)}
									placeholder='Search...'
									style={{
										background: theme ? "#212020" : "#fff",
										borderRadius: 20,
										color: theme ? "#ccc" : "#212121",
									}}
								/>
								<i
									aria-hidden='true'
									className='search icon'
									style={{
										color: theme ? "#a333c8" : "#ccc",
										opacity: 1,
									}}
								></i>
							</div>{" "}
						</Grid>
					</Grid>
				)}

				{qL.length > 0 && (
					<Grid item xs={10} lg={10} className={classes.table}>
						<Table celled style={{ marginTop: 80 }} inverted={theme} selectable>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Serial No</Table.HeaderCell>
									<Table.HeaderCell>Show Name</Table.HeaderCell>
									<Table.HeaderCell>Question date</Table.HeaderCell>
									<Table.HeaderCell>Answer</Table.HeaderCell>
									<Table.HeaderCell>Trash</Table.HeaderCell>
								</Table.Row>
								<Table.Row>
									<Table.HeaderCell>
										<div className='ui input'>
											<input
												type='text'
												name='search1'
												value={search1}
												placeholder='Search...'
												onChange={e => searcho(e)}
												style={{
													background: theme ? "#212020" : "#fff",
													color: theme ? "#ccc" : "#212121",
												}}
											/>
										</div>
									</Table.HeaderCell>
									<Table.HeaderCell>
										<div className='ui input'>
											<input
												type='text'
												name='search2'
												value={search2}
												placeholder='Search...'
												onChange={e => searcho(e)}
												style={{
													background: theme ? "#212020" : "#fff",
													color: theme ? "#ccc" : "#212121",
												}}
											/>
										</div>
									</Table.HeaderCell>
									<Table.HeaderCell>
										<div className='ui input'>
											<input
												type='text'
												name='search3'
												value={search3}
												placeholder='Search...'
												onChange={e => searcho(e)}
												style={{
													background: theme ? "#212020" : "#fff",
													color: theme ? "#ccc" : "#212121",
												}}
											/>
										</div>
									</Table.HeaderCell>
									<Table.HeaderCell>
										<div className='ui input'>
											<input
												type='text'
												name='search4'
												value={search4}
												placeholder='Search...'
												onChange={e => searcho(e)}
												style={{
													background: theme ? "#212020" : "#fff",
													color: theme ? "#ccc" : "#212121",
												}}
											/>
										</div>
									</Table.HeaderCell>
									<Table.HeaderCell></Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{currentPosts.reverse().map((data, i) => (
									<Table.Row key={i}>
										<Table.Cell>
											{currentPage === 1
												? i + 1
												: i + 1 + 10 * (currentPage - 1)}
										</Table.Cell>
										<Table.Cell>{data.show_name}</Table.Cell>
										<Table.Cell>
											{Mon(data.date).format("DD-MM-YYYY")}
										</Table.Cell>
										<Table.Cell>{data.phone}</Table.Cell>
										<Table.Cell id='trash'>
											<Archive
												size={18}
												className={classes.trash}
												onClick={() => modalOpen(data.id)}
											/>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>

							{qL.length > 10 && (
								<Table.Footer>
									<Pagination
										postsPerPage={postsPerPage}
										totalPosts={
											result.result ? result.result.length : qL.length
										}
										paginate={paginate}
										activePN={currentPage}
										col='5'
									/>
								</Table.Footer>
							)}
						</Table>{" "}
					</Grid>
				)}
			</Grid>

			{currentPosts.length > 0 && (
				<ResponsiveTable
					dataShots={currentPosts}
					postsPerPage={postsPerPage}
					totalPosts={result.result ? result.result.length : qL.length}
					paginate={paginate}
					activePN={currentPage}
					col='4'
				/>
			)}

			{open && <Noti msg='Winner' />}

			<Snackbar
				id='snack'
				anchorOrigin={{ vertical, horizontal }}
				open={open2}
				message='Required value to all input field'
				key={vertical + horizontal}
				TransitionComponent={TransitionUp}
			/>

			<div className={classes.footer}>
				All Rights Reserved By <b style={{ fontWeight: 400 }}>SUN TV</b>.
				Designed And Developed By <b style={{ color: "#039af4" }}>DISTRONIX</b>
				<img
					src={require("../images/logo.png")}
					style={{ width: 15, marginTop: -4, marginLeft: 2 }}
				/>
			</div>

			<Modal size={"mini"} open={openModal} onClose={closeModal} id='blurring'>
				<Modal.Header>Delete Winner</Modal.Header>
				<Modal.Content>
					<p>Are you sure, you want to delete this winner?</p>
				</Modal.Content>
				<Modal.Actions>
					<Button color='pink' onClick={closeModal}>
						No
					</Button>
					<Button
						positive
						icon='checkmark'
						labelPosition='right'
						content='Yes'
						onClick={deleteWinnerById}
					/>
				</Modal.Actions>
			</Modal>
		</div>
	);
}

export default AddWinners;

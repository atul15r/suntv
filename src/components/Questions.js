import React, { useState } from "react";
import { Grid, Chip, Snackbar, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Icon, Table, Dropdown, Button, Modal } from "semantic-ui-react";
import { CSVLink } from "react-csv";
import { debounce } from "lodash";
import Mon from "moment";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../util/Pagination";
import axios from "axios";

import Noti from "../util/Noti";
import {
	pushQuestion,
	questionsList,
	deleteQuestion,
} from "../redux/actions/dataActions";
import { shows, answer, answer1, answer2, answer3 } from "../util/data";
import { Archive } from "react-bootstrap-icons";

import ResponsiveTable from "../util/ResponsiveTableQuestion";
import { message } from "antd";

const useStyles = makeStyles(theme => ({
	header: {
		fontSize: 19,
		color: "#6b6b6b",
		marginTop: 100,
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
	btn: {
		"&:active": {
			transition: "all .1s linear	",
			transform: "translateY(3px)",
		},
	},
}));

var currentPosts = [];
const key = "updatable";

function TransitionUp(props) {
	return <Slide {...props} direction='up' />;
}
function Questions() {
	const [result, setResult] = React.useState([]);
	const [qid, setQid] = useState("");
	const [name, setName] = useState("");
	const [date, setDate] = useState(Mon().format("YYYY-MM-DD"));
	const [error, setError] = useState("");

	const [ans_phone, setAns_phone] = useState("");
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const [currentPage, setCurrentPage] = React.useState(1);
	const [postsPerPage] = React.useState(10);
	const [searchBy, setSearch] = React.useState({
		search1: "",
		search2: "",
		search3: "",
		search4: "",
		search5: "",
		search6: "",
	});
	const [state, setState] = React.useState({
		open2: false,
		vertical: "bottom",
		horizontal: "right",
	});

	const [snack2, setSnack2] = React.useState({
		vert: "bottom",
		horizon: "center",
	});

	const dispatch = useDispatch();

	const qL = useSelector(state => state.data.questionsList);
	const theme = useSelector(state => state.data.theme);

	const searcho = e => {
		setSearch({
			...searchBy,
			[e.target.name]: e.target.value,
		});
		if (e.target.name === "search6") {
			searchGlobal(e.target.name, e.target.value);
		} else search(e.target.name, e.target.value);
	};

	const search = debounce((name, value) => {
		var result = [];
		if (value.length > 0) {
			setCurrentPage(1);

			const matchRegEx = new RegExp(parseInt(value));

			if (name === "search1") {
				setSearch({
					search2: "",
					search3: "",
					search4: "",
					search5: "",
					search6: "",
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
					search6: "",
				});
				const pattern = `[A-Za-z.\s]*${value.toLowerCase()}[A-Za-z.\s]*`;
				const matchRegEx = new RegExp(pattern);
				result = qL.filter(data => matchRegEx.test(data.q_date));
			} else if (name === "search3") {
				setSearch({
					search1: "",
					search2: "",
					search4: "",
					search5: "",
					search6: "",
				});
				result = qL.filter(data => matchRegEx.test(data.q_no));
			} else if (name === "search4") {
				setSearch({
					search1: "",
					search2: "",
					search3: "",
					search5: "",
					search6: "",
				});

				const patternn = `[A-Za-z.\s]*${value.toLowerCase()}[A-Za-z.\s]*`;
				const matchRegExx = new RegExp(patternn);
				result = qL.filter(data => matchRegExx.test(data.name));
			} else if (name === "search5") {
				setSearch({
					search1: "",
					search2: "",
					search3: "",
					search4: "",
					search6: "",
				});
				result = qL.filter(data =>
					matchRegEx.test(parseInt(data.answer_phone))
				);
			}

			console.log(result, "---op");
			setResult({ result });
		} else {
			setResult({ result: undefined });
		}
	}, 100);

	const searchGlobal = debounce((name, value) => {
		setSearch({
			search1: "",
			search2: "",
			search3: "",
			search4: "",
			search5: "",
		});
		var result = [];
		if (value.length > 0) {
			setCurrentPage(1);
			console.log("searching in global", value);
			if (name === "search6") {
				const pattern = `[A-Za-z.\s]*${value.toLowerCase()}[A-Za-z.\s]*`;
				const matchRegE = new RegExp(pattern);
				qL.filter(data => matchRegE.test(data.q_date)).map(data => {
					result.push(data);
				});

				qL.filter(data => matchRegE.test(data.name)).map(data => {
					result.push(data);
				});

				const matchReg = new RegExp(parseInt(value));
				qL.filter(data => matchReg.test(data.q_no)).map(data => {
					result.push(data);
				});
				qL.filter(data => matchReg.test(parseInt(data.answer_phone))).map(
					data => {
						result.push(data);
					}
				);

				// console.log(result, "---op");
				setResult({ result });
			} else {
				setResult({
					result: undefined,
				});
			}
		}
	}, 100);

	// Get current posts

	React.useEffect(() => {
		console.log("useEffect", result.result);
	}, [result]);

	if (result.result !== undefined) {
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOfFirstPost = indexOfLastPost - postsPerPage;
		currentPosts = result.result.slice(indexOfFirstPost, indexOfLastPost);

		console.log("result attached", currentPosts);
	} else {
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOfFirstPost = indexOfLastPost - postsPerPage;
		currentPosts = qL.slice(indexOfFirstPost, indexOfLastPost);
		//console.log("result default", currentPosts);
	}

	const paginate = pageNumber => {
		//setResult("");
		setCurrentPage(pageNumber);
	};

	const classes = useStyles();

	const modalOpen = id => {
		setOpenModal(true);
		setQid(id);
	};

	const closeModal = () => {
		setOpenModal(false);
	};

	const deleteQuestionById = () => {
		//console.log("qid", qid);
		message.loading({
			content: "Deleting...",
			key,
			style: {
				marginTop: 43,
			},
		});
		axios
			.post("/deletequestion", { id: qid })
			.then(res => {
				dispatch(deleteQuestion(qid));
				setOpenModal(false);
				if (result.length === undefined) {
					setSearch({
						search1: "",
						search2: "",
						search3: "",
						search4: "",
						search5: "",
						search6: "",
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

	const submitQuestion = () => {
		if (name !== "" && date !== "" && ans_phone !== "") {
			setLoading(true);
			const data = {
				name,
				date,
				ans_phone,
			};
			console.log("inserting", data);
			axios
				.post("/insertquestion", data)
				.then(res => {
					console.log(res.data, "submitted");
					setOpen(true);
					setLoading(false);
					dispatch(questionsList());
				})
				.catch(err => {
					if (err.response.data.status) {
						//console.log("ohyy data must be g th 29");
						setError(err.response.data.status);
						setTimeout(() => {
							setError("");
						}, 3000);
					}
					if (err.response.status === 500) {
						setName("");
						setAns_phone("");
						setDate("");

						setError("Duplicate Entry Not Allowed!!!");
						setTimeout(() => {
							setError("");
						}, 3000);
						console.log("duplicate entry occur");
					}
					setOpen(false);
					setLoading(false);
				});
		} else {
			console.log("object noooo", name, date, ans_phone);
			setState({ ...state, open2: true });
			setTimeout(() => {
				setState({ ...state, open2: false });
			}, 3000);
		}

		// setOpen(false);
		// setName("");
		// setQ_no("");
		// setAns_phone("");
		// setDate("");
	};

	const { vertical, horizontal, open2 } = state;
	const { vert, horizon, open3 } = snack2;

	const { search1, search2, search3, search4, search5, search6 } = searchBy;

	return (
		<div>
			<p className={classes.header}>Questions</p>

			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={6} lg={5}>
					<Table celled inverted={theme}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Shows</Table.HeaderCell>
								<Table.HeaderCell>Date</Table.HeaderCell>
								<Table.HeaderCell>Answer</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row id='bR'>
								<Table.Cell>
									<Dropdown
										name='name'
										placeholder='Select Show'
										fluid
										search
										selection
										options={shows}
										value={name}
										onChange={(e, data) => setName(data.value)}
										style={{ background: theme ? "#212020" : "#fff" }}
									/>
								</Table.Cell>
								<Table.Cell>
									<div className='ui input' id='dateInput'>
										<input
											type='date'
											placeholder='Pick Date'
											style={{
												background: theme ? "#212020" : "#fff",
												color: theme ? "#ccc" : "#212121",
												userSelect: "none",
											}}
											value={date}
											onChange={e => setDate(e.target.value)}
										/>
									</div>
								</Table.Cell>

								<Table.Cell>
									{" "}
									<Dropdown
										name='ans_phone'
										placeholder='Select Answer'
										fluid
										search
										selection
										value={ans_phone}
										options={
											name === "kalyanaveedu"
												? answer1
												: name === "kanmani"
												? answer2
												: name === "nayagi"
												? answer3
												: answer
										}
										onChange={(e, data) => setAns_phone(data.value)}
										style={{ background: theme ? "#212020" : "#fff" }}
									/>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<Button
						style={{ background: "#039af4", color: "#fff" }}
						id='btn'
						className={classes.btn}
						onClick={submitQuestion}
						loading={loading}
					>
						<Icon name='add' /> Add Question
					</Button>
				</Grid>

				{qL.length > 0 && (
					<Grid container justify='center' className={classes.csvSearch}>
						<Grid item xs={1} md={2} lg={2} style={{ position: "relative" }}>
							{" "}
							<CSVLink data={qL} filename='AllQuestionList - Surya TV.csv'>
								<Chip
									id='csv'
									icon={
										<Icon
											name='arrow alternate circle down outline'
											size='large'
											style={{
												position: "absolute",
												left: 5,
												color: theme ? "#039af4" : "#999",
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
									name='search6'
									value={search6}
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
									style={{ color: theme ? "#039af4" : "#ccc", opacity: 1 }}
								></i>
							</div>
						</Grid>
					</Grid>
				)}

				{qL.length > 0 && (
					<Grid item xs={10} lg={10} className={classes.table}>
						<Table
							celled
							style={{ marginTop: 80 }}
							inverted={theme}
							selectable={theme}
						>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Serial No</Table.HeaderCell>
									<Table.HeaderCell>Question date</Table.HeaderCell>
									<Table.HeaderCell>Question No</Table.HeaderCell>
									<Table.HeaderCell>Show Name</Table.HeaderCell>
									<Table.HeaderCell>Answer</Table.HeaderCell>
									<Table.HeaderCell>Trash</Table.HeaderCell>
								</Table.Row>
								<Table.Row>
									<Table.HeaderCell>
										<div className='ui input'>
											<input
												type='text'
												placeholder='Search...'
												name='search1'
												value={search1}
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
												placeholder='Search...'
												name='search2'
												value={search2}
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
												placeholder='Search...'
												name='search3'
												value={search3}
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
												placeholder='Search...'
												name='search4'
												value={search4}
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
												placeholder='Search...'
												name='search5'
												value={search5}
												onChange={e => searcho(e)}
												style={{
													background: theme ? "#212020" : "#fff",
													color: theme ? "#ccc" : "#212121",
												}}
											/>
										</div>
									</Table.HeaderCell>
									<Table.HeaderCell>
										<div className='ui input'></div>
									</Table.HeaderCell>
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
										<Table.Cell>
											{Mon(data.q_date).format("DD-MM-YYYY")}
										</Table.Cell>
										<Table.Cell>{data.q_no}</Table.Cell>
										<Table.Cell>{data.name}</Table.Cell>
										<Table.Cell>{data.answer_phone}</Table.Cell>
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
										col='6'
									/>
								</Table.Footer>
							)}
						</Table>
					</Grid>
				)}
			</Grid>

			{qL.length > 0 && (
				<ResponsiveTable
					dataShots={currentPosts}
					postsPerPage={postsPerPage}
					totalPosts={result.result ? result.result.length : qL.length}
					paginate={paginate}
					activePN={currentPage}
					col='4'
				/>
			)}
			{open && <Noti msg='Question' />}

			<Snackbar
				id='snack'
				anchorOrigin={{ vertical, horizontal }}
				open={open2}
				message='Required value to all input field'
				key={vertical + horizontal}
				TransitionComponent={TransitionUp}
			/>

			<Snackbar
				id='snack2'
				open={error !== "" ? true : false}
				message={error}
				key={vert + horizon}
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
				<Modal.Header>Delete Question</Modal.Header>
				<Modal.Content>
					<p>Are you sure, you want to delete this question?</p>
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
						onClick={deleteQuestionById}
					/>
				</Modal.Actions>
			</Modal>
		</div>
	);
}
export default React.memo(Questions);

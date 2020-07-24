import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, TableFooter } from "@material-ui/core";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import clsx from "clsx";

var currentPosts = [];

const StyledTableCell = withStyles(theme => ({
	body: {
		fontSize: 14,
		fontFamily: "open",
	},
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
		fontFamily: "open",
		fontWeight: 600,
	},
}))(TableRow);

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 700,
	},
	table2: {
		[theme.breakpoints.up("xs")]: {
			display: "block",
			// position: "absolute",
			width: "96%",
			marginLeft: 8,
			marginBottom: 50,
			marginTop: 50,
		},
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
		[theme.breakpoints.up("lg")]: {
			display: "none",
		},
	},
	table2Resp: {
		// backgroundColor: "#191818",
	},
	table2Theme: {
		backgroundColor: "#333",
	},
	head: {},
	headResp: {
		// backgroundColor: "#191818",
	},
	headTheme: {
		color: "#ccc",
		borderBottom: "1px solid #464646",
	},
}));

export default function CustomizedTables({ dataShots }) {
	const classes = useStyles();
	const [currentPage, setCurrentPage] = React.useState(1);
	const [postsPerPage] = React.useState(10);
	//const data = useSelector(state => state.data.todo);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	currentPosts = dataShots.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};

	const theme = useSelector(state => state.data.theme);

	return (
		<TableContainer
			component={Paper}
			className={clsx(classes.table2, {
				[classes.table2Resp]: !theme,
				[classes.table2Theme]: theme,
			})}
			id='rS'
		>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell
							className={clsx(classes.head, {
								[classes.headResp]: !theme,
								[classes.headTheme]: theme,
							})}
						>
							Serial No
						</StyledTableCell>
						<StyledTableCell
							align='right'
							className={clsx(classes.head, {
								[classes.headResp]: !theme,
								[classes.headTheme]: theme,
							})}
						>
							call sid
						</StyledTableCell>
						<StyledTableCell
							align='right'
							className={clsx(classes.head, {
								[classes.headResp]: !theme,
								[classes.headTheme]: theme,
							})}
						>
							call from
						</StyledTableCell>
						<StyledTableCell
							align='right'
							className={clsx(classes.head, {
								[classes.headResp]: !theme,
								[classes.headTheme]: theme,
							})}
						>
							call to
						</StyledTableCell>
						<StyledTableCell
							align='right'
							className={clsx(classes.head, {
								[classes.headResp]: !theme,
								[classes.headTheme]: theme,
							})}
						>
							call time
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{currentPosts.map((row, i) => (
						<StyledTableRow key={i}>
							<StyledTableCell
								component='th'
								scope='row'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{currentPage === 1 ? i + 1 : i + 1 + 10 * (currentPage - 1)}
							</StyledTableCell>
							<StyledTableCell
								align='right'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{row.call_sid}
							</StyledTableCell>
							<StyledTableCell
								align='right'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{row.call_from}
							</StyledTableCell>
							<StyledTableCell
								align='right'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{row.call_to}
							</StyledTableCell>
							<StyledTableCell
								align='right'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{row.call_time}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
				<TableFooter>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={dataShots.length}
						paginate={paginate}
						activePN={currentPage}
						col='5'
					/>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}

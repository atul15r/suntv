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
import clsx from "clsx";
import Mon from "moment";
import { Menu, Table as Tabb, Pagination as Pag } from "semantic-ui-react";

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

export default function CustomizedTables({
	dataShots,
	postsPerPage,
	totalPosts,
	paginate,
	activePN,
	col,
}) {
	const classes = useStyles();

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	const hc = (e, { activePage }) => {
		console.log(activePage);

		paginate(activePage);
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
							Show Name
						</StyledTableCell>
						<StyledTableCell
							align='right'
							className={clsx(classes.head, {
								[classes.headResp]: !theme,
								[classes.headTheme]: theme,
							})}
						>
							Question Date
						</StyledTableCell>
						<StyledTableCell
							align='right'
							className={clsx(classes.head, {
								[classes.headResp]: !theme,
								[classes.headTheme]: theme,
							})}
						>
							Answer
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dataShots.reverse().map((row, i) => (
						<StyledTableRow key={i}>
							<StyledTableCell
								component='th'
								scope='row'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{activePN === 1 ? i + 1 : i + 1 + 10 * (activePN - 1)}
							</StyledTableCell>
							<StyledTableCell
								align='right'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{row.show_name}
							</StyledTableCell>
							<StyledTableCell
								align='right'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{Mon(row.date).format("DD-MM-YYYY")}
							</StyledTableCell>
							<StyledTableCell
								align='right'
								className={clsx(classes.head, {
									[classes.headResp]: !theme,
									[classes.headTheme]: theme,
								})}
							>
								{row.phone}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
				<TableFooter>
					<Tabb.Row>
						<Tabb.HeaderCell colSpan={col}>
							<Menu floated='right' pagination>
								<Pag
									activePage={activePN}
									onPageChange={hc}
									size='mini'
									totalPages={pageNumbers.length}
									inverted={theme}
								/>
							</Menu>
						</Tabb.HeaderCell>
					</Tabb.Row>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}

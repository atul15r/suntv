import React from "react";
import {
	Icon,
	Label,
	Menu,
	Table,
	Dropdown,
	Button,
	Input,
	Pagination as Pag,
} from "semantic-ui-react";
import { useSelector } from "react-redux";

const Pagination = ({ postsPerPage, totalPosts, paginate, activePN, col }) => {
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
		<Table.Row>
			<Table.HeaderCell colSpan={col}>
				<Menu floated='right' pagination>
					<Pag
						activePage={activePN}
						onPageChange={hc}
						size='mini'
						totalPages={pageNumbers.length}
						inverted={theme}
					/>
				</Menu>
			</Table.HeaderCell>
		</Table.Row>
	);
};

export default Pagination;

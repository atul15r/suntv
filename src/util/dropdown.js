import * as React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownField = ({
	field: { name, value },
	form: { touched, errors, setFieldValue },
	options,
	children: _,
	...props
}) => {
	const errorText = touched[name] && errors[name];
	return (
		<Dropdown
			fluid
			selection
			options={options}
			value={value}
			onChange={(_, { value }) => setFieldValue(name, value)}
			error={errorText}
			{...props}
		/>
	);
};
export default DropdownField;

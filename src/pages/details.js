import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, capitalize } from "@material-ui/core";
import {
	Icon,
	Image,
	Segment,
	Step,
	Form,
	Button,
	Dropdown,
} from "semantic-ui-react";
import { Formik, Field } from "formik";

import SunTv from "../images/sun.png";
import { Link } from "react-router-dom";

import { login } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { validateDetails } from "../util/validators";
import { stateList } from "../util/data";
import { values } from "lodash";
import DropdownField from "../util/dropdown";
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
		//marginTop: 14,
		textTransform: "capitalize",
		fontWeight: 800,
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
const initialValues = {
	holdername: "",
	accountno: "",
	ifsccode: "",
	age: "",
	city: "",
	state: "",
	check: false,
};
const onSubmit = values => {
	console.log("formik values", values);
};
const validate = values => {
	const errors = {};
	const regEx = /^[0-9]+$/;

	if (values.holdername.trim() === "") {
		errors.holdername = true;
	}
	if (values.accountno.trim() === "") {
		errors.accountno = true;
	} else {
		if (!values.accountno.match(regEx)) {
			errors.accountno = true;
		}
	}

	if (values.ifsccode.trim() === "") {
		errors.ifsccode = true;
	}
	if (values.age.trim() === "") {
		errors.age = true;
	} else {
		if (!values.age.match(regEx)) {
			errors.age = true;
		}
	}
	if (values.city.trim() === "") {
		errors.city = true;
	}
	if (values.state.trim() === "") {
		errors.state = true;
	}
	if (!values.check) {
		errors.check = true;
	}
	return errors;
};
export default function Login(props) {
	const dispatch = useDispatch();

	const classes = useStyles();

	return (
		<Grid container justify='center' alignItems='center'>
			<Grid
				item
				xs={10}
				md={4}
				lg={3}
				style={{
					position: "relative",
				}}
			>
				<Grid
					container
					justify='center'
					alignItems='center'
					direction='column'
				></Grid>
				<Grid
					container
					justify='center'
					alignItems='center'
					style={{ position: "absolute", height: 170, marginTop: 40 }}
				>
					<div
						style={{
							width: "100%",
							height: 70,
							background: "#f8f8f86e",
							border: "1px solid #eee",
							borderBottom: "none",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<img src={SunTv} style={{ width: 70, height: 45 }} />
						<b className={classes.header}>SURYA TV</b>
					</div>
					<Segment
						style={{
							marginBottom: 70,
							marginTop: 0,
							width: "100%",
							border: "1px solid #eee",
							boxShadow: "none",
							borderRadius: 0,
						}}
					>
						<Formik
							initialValues={initialValues}
							validate={validate}
							onSubmit={(values, { setSubmitting, resetForm }) => {
								console.log(values);
								setTimeout(() => {
									setSubmitting(false);
									resetForm();
								}, 2000);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
								dirty,
								isValid,
							}) => (
								<div>
									<Form onSubmit={handleSubmit} loading={isSubmitting}>
										<p
											style={{
												color: "#999",
												letterSpacing: 1,
												textTransform: "capitalize",
												marginBottom: 20,
											}}
										>
											fill bank details
										</p>
										<Form.Input
											fluid
											label='Phone no.'
											placeholder='Phone no.'
											value={props.match.params.phoneId}
											disabled
										/>
										<Form.Input
											fluid
											name='holdername'
											label='Bank Holder Name'
											placeholder='Bank Holder Name'
											onChange={handleChange}
											onBlur={handleBlur}
											value={capitalize(values.holdername)}
											error={
												errors.holdername &&
												touched.holdername &&
												errors.holdername
											}
										/>
										<Form.Group widths='equal'>
											<Form.Input
												fluid
												name='accountno'
												label='Bank Account no.'
												placeholder='Bank Account no.'
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.accountno}
												error={
													errors.accountno &&
													touched.accountno &&
													errors.accountno
												}
											/>
											<Form.Input
												fluid
												name='ifsccode'
												label='Bank IFSC Code'
												placeholder='Bank IFSC Code'
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.ifsccode}
												error={
													errors.ifsccode && touched.ifsccode && errors.ifsccode
												}
											/>
										</Form.Group>
										<Form.Group widths='equal'>
											<Form.Input
												fluid
												name='age'
												label='Age'
												placeholder='Age'
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.age}
												error={errors.age && touched.age && errors.age}
											/>
											<Form.Input
												fluid
												label='City'
												placeholder='City'
												name='city'
												onChange={handleChange}
												onBlur={handleBlur}
												value={capitalize(values.city)}
												error={errors.city && touched.city && errors.city}
											/>
										</Form.Group>{" "}
										<Field
											placeholder='Select State'
											options={stateList}
											name='state'
											component={DropdownField}
											style={{ marginBottom: 15 }}
										/>
										<Form.Checkbox
											id='check'
											name='check'
											label='I accept the Terms and Conditions'
											onChange={handleChange}
											onBlur={handleBlur}
											error={errors.check && touched.check && errors.check}
										/>
										<Button
											fluid
											style={{
												background: "#d92f20",
												fontWeight: 500,
												fontFamily: "open",
												color: "#fff",
											}}
											type='submit'
											disabled={!(dirty && isValid)}
										>
											Submit
										</Button>
									</Form>
								</div>
							)}
						</Formik>
					</Segment>
				</Grid>
			</Grid>
		</Grid>
	);
}

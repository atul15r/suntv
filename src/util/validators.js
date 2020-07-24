module.exports.validateDetails = (
	holdername,
	accountno,
	ifsccode,
	age,
	city,
	state,
	check
) => {
	const errors = {};
	const regEx = /^[0-9]+$/;
	if (holdername.trim() === "") {
		errors.holdername = true;
	}
	if (accountno.trim() === "") {
		errors.accountno = true;
	} else {
		if (!accountno.match(regEx)) {
			errors.accountno = true;
		}
	}

	if (ifsccode.trim() === "") {
		errors.ifsccode = true;
	}
	if (age.trim() === "") {
		errors.age = true;
	} else {
		if (!age.match(regEx)) {
			errors.age = true;
		}
	}
	if (city.trim() === "") {
		errors.city = true;
	}
	if (state.trim() === "") {
		errors.state = true;
	}
	if (!check) {
		errors.check = true;
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

import {
	QUESTIONS_LIST,
	WINNERS_LIST,
	DELETE_WINNER,
	ERRORS,
	LOADING,
	CLEAR_ERRORS,
	THEME,
	CURRENT_USER,
	TOTAL_CALLERS,
	TOTAL_CALLERS_TODAY,
	TOTAL_UNIQUE,
	TOTAL_UNIQUE_TODAY,
	Get_ALLCALLERS_BYDATE,
	NO_ALLCALLERS_BYDATE,
	NULL,
	PROGRESS,
	PROGRESS2,
	PUSH_QUESTION,
	PUSH_WINNER,
	GENERATE_LIST,
	GENERATE_LIST_CLEAN,
	GENERATE_ERROR,
	WINNERS_PROGRESS,
	WINNERS_PROGRESS2,
	ELIGIBLE_PROGRESS,
	ELIGIBLE_PROGRESS2,
	GET_ELIGIBLE_WINNERS,
	NO_ELIGIBLE_WINNERS,
	REMOVE_ELIGIBLE_WINNERS,
	TODO,
	GENERATE,
	GENERATE_FOR_OLD_DATE,
	DELETE_QUESTION,
} from "../types";
import axios from "axios";
import Mon from "moment";
import { Base64 } from "js-base64";
import { hash, loggedInStatus } from "../../util/data";

export const todo = () => dispatch => {
	axios
		.get("https://jsonplaceholder.typicode.com/todos")
		.then(res => {
			console.log(res.data);
			dispatch({
				type: TODO,
				payload: res.data,
			});
		})
		.catch(err => console.log(err));
};

export const questionsList = values => dispatch => {
	axios
		.post("/getquestion")
		.then(res => {
			console.log("question list run", res.data.data);
			dispatch({
				type: QUESTIONS_LIST,
				payload: res.data.data,
			});
		})

		.catch(err => console.log(err));
};

export const pushQuestion = data => dispatch => {
	dispatch({
		type: PUSH_QUESTION,
		payload: data,
	});
};

export const deleteQuestion = id => dispatch => {
	dispatch({
		type: DELETE_QUESTION,
		payload: id,
	});
};

export const winnersList = values => dispatch => {
	axios
		.post("/showwinners")
		.then(res => {
			//console.log("winners list", res.data);
			dispatch({
				type: WINNERS_LIST,
				payload: res.data.data,
			});
		})

		.catch(err => console.log(err));
};
export const pushWinner = data => dispatch => {
	dispatch({
		type: PUSH_WINNER,
		payload: data,
	});
};

export const deleteWinner = id => dispatch => {
	dispatch({
		type: DELETE_WINNER,
		payload: id,
	});
};

export const getAllCallers = (date, progress) => dispatch => {
	console.log("redux all callers", date);
	if (progress === "progress") {
		dispatch({ type: PROGRESS, payload: true });
		dispatch({ type: PROGRESS2, payload: false });
	}
	if (progress === "progress2") {
		dispatch({ type: PROGRESS, payload: false });

		dispatch({ type: PROGRESS2, payload: true });
	}
	axios
		.post("/allcallers", { date: date })
		.then(res => {
			// console.log(res.data);
			// console.log(progress);
			if (progress === "progress") {
				dispatch({ type: PROGRESS, payload: false });
			}
			if (progress === "progress2") {
				dispatch({ type: PROGRESS2, payload: false });
			}

			dispatch({
				type: Get_ALLCALLERS_BYDATE,
				payload: res.data.data,
			});
			dispatch({
				type: NO_ALLCALLERS_BYDATE,
				payload: false,
			});
			if (res.data.data.length === 0) {
				//console.log("no data found");
				dispatch({
					type: NO_ALLCALLERS_BYDATE,
					payload: true,
				});

				setTimeout(() => {
					dispatch({
						type: NO_ALLCALLERS_BYDATE,
						payload: false,
					});
				}, 4000);
			}
		})

		.catch(err => {
			if (progress === "progress") {
				dispatch({ type: PROGRESS, payload: false });
			}
			if (progress === "progress2") {
				dispatch({ type: PROGRESS2, payload: false });
			}
			//console.log(err);
		});
};

export const cleanCallersByDate = () => dispatch => {
	dispatch({
		type: NULL,
		payload: "",
	});
};

//winners list

export const generateWinnersReq = date => dispatch => {
	dispatch({ type: WINNERS_PROGRESS, payload: true });

	if (date < Mon().format("YYYY-MM-DD")) {
		//console.log("date is less than");

		axios
			.post("/wingenstatus", {
				date: date,
			})
			.then(res => {
				if (res.data === 1) {
					//console.log("data already hv");

					dispatch({
						type: GENERATE,
						payload: false,
					});
					dispatch({ type: WINNERS_PROGRESS, payload: false });
				} else if (res.data === 0) {
					console.log("as data 0 ,we activate 2nd method");

					dispatch({
						type: GENERATE_FOR_OLD_DATE,
						payload: true,
					});
					dispatch({ type: WINNERS_PROGRESS, payload: false });

					dispatch({
						type: GENERATE,
						payload: true,
					});

					dispatch({
						type: GENERATE_ERROR,
						payload:
							"Winners has been NOT generated yet for this date ,GENERATE NOW",
					});
					setTimeout(() => {
						dispatch({ type: GENERATE_ERROR, payload: "" });
					}, 4000);
				}
			})
			.catch(err => {
				dispatch({ type: WINNERS_PROGRESS, payload: false });
				dispatch({ type: GENERATE_ERROR, payload: "Some Error Occur!!!" });
				setTimeout(() => {
					dispatch({ type: GENERATE_ERROR, payload: "" });
				}, 4000);
			});
	} else if (date === Mon().format("YYYY-MM-DD")) {
		console.log("from redux date", date);
		axios
			.post("/wingenstatus", {
				date: date,
			})
			.then(res => {
				if (res.data === 1) {
					dispatch({
						type: GENERATE,
						payload: false,
					});
					dispatch({ type: WINNERS_PROGRESS, payload: false });
				} else if (res.data === 0) {
					axios
						.post("/genwinners", {
							date: date,
						})
						.then(res => {
							setTimeout(() => {
								dispatch({ type: WINNERS_PROGRESS, payload: false });
								dispatch({
									type: GENERATE,
									payload: false,
								});
								//console.log(err.response.data.status);
								dispatch({
									type: GENERATE_ERROR,
									payload: "Download Data Now",
								});
								setTimeout(() => {
									dispatch({ type: GENERATE_ERROR, payload: "" });
								}, 2000);
							}, 30000);
						})
						.catch(err => {
							if (err.response.data.status) {
								dispatch({ type: WINNERS_PROGRESS, payload: false });
								dispatch({
									type: GENERATE,
									payload: true,
								});
								//console.log(err.response.data.status);
								dispatch({
									type: GENERATE_ERROR,
									payload: "Please try after 11PM",
								});
								setTimeout(() => {
									dispatch({ type: GENERATE_ERROR, payload: "" });
								}, 3000);
							} else {
								dispatch({ type: WINNERS_PROGRESS, payload: false });
								dispatch({
									type: GENERATE,
									payload: true,
								});
								//console.log(err.response.data.status);
								dispatch({
									type: GENERATE_ERROR,
									payload: "Some Error Occur",
								});
								setTimeout(() => {
									dispatch({ type: GENERATE_ERROR, payload: "" });
								}, 3000);
							}
						});
				}
			})
			.catch(err => {
				dispatch({ type: WINNERS_PROGRESS, payload: false });
				dispatch({
					type: GENERATE,
					payload: true,
				});
				//console.log(err.response.data.status);
				dispatch({
					type: GENERATE_ERROR,
					payload: "Some Error Occur",
				});
				setTimeout(() => {
					dispatch({ type: GENERATE_ERROR, payload: "" });
				}, 3000);
			});

		//console.log("date is equla than");
	} else {
		//console.log("date is greter than");
		dispatch({ type: WINNERS_PROGRESS, payload: false });
		dispatch({
			type: GENERATE,
			payload: true,
		});
		dispatch({
			type: GENERATE_ERROR,
			payload: `Date Must not Be Greater Than ${Mon().format("YYYY-MM-DD")}`,
		});
		setTimeout(() => {
			dispatch({ type: GENERATE_ERROR, payload: "" });
		}, 3000);
	}
};

//generate for old date

export const generateForOldDate = date => dispatch => {
	console.log("exec for old date");
	dispatch({ type: GENERATE_ERROR, payload: "" });
	dispatch({ type: WINNERS_PROGRESS, payload: true });

	axios
		.post("/genwinners", {
			date: date,
		})
		.then(res => {
			//console.log("generating winners for old date");

			setTimeout(() => {
				dispatch({ type: WINNERS_PROGRESS, payload: false });
				dispatch({
					type: GENERATE,
					payload: false,
				});

				dispatch({
					type: GENERATE_FOR_OLD_DATE,
					payload: false,
				});
			}, 30000);
		})
		.catch(err => {
			dispatch({
				type: WINNERS_PROGRESS,
				payload: false,
			});
			dispatch({
				type: GENERATE,
				payload: true,
			});
			dispatch({
				type: GENERATE_FOR_OLD_DATE,
				payload: false,
			});
			dispatch({
				type: GENERATE_ERROR,
				payload: "Some Error Occur",
			});
			setTimeout(() => {
				dispatch({ type: GENERATE_ERROR, payload: "" });
			}, 3000);
		});
};

//download generated list
export const downloadGeneratedWinnersReq = data => dispatch => {
	dispatch({ type: WINNERS_PROGRESS2, payload: true });

	axios
		.post("/winners", data)
		.then(res => {
			//console.log("154iojn", res.data);

			if (res.data.data.length > 0) {
				dispatch({ type: WINNERS_PROGRESS2, payload: false });
				dispatch({ type: GENERATE_LIST, payload: res.data.data });
			} else {
				dispatch({ type: WINNERS_PROGRESS2, payload: false });
				dispatch({
					type: GENERATE_ERROR,
					payload: `No Data Found For Date ${data.date} !`,
				});
				setTimeout(() => {
					dispatch({ type: GENERATE_ERROR, payload: "" });
				}, 4000);
			}
		})
		.catch(err => {
			//console.log(err);
			dispatch({ type: WINNERS_PROGRESS2, payload: false });

			dispatch({ type: GENERATE_ERROR, payload: "Some Error Occur" });
			setTimeout(() => {
				dispatch({ type: GENERATE_ERROR, payload: "" });
			}, 4000);
		});
};

export const cleanGeneratedList = () => dispatch => {
	dispatch({ type: GENERATE_LIST_CLEAN, payload: "" });
	dispatch({
		type: GENERATE,
		payload: true,
	});
	dispatch({
		type: GENERATE_FOR_OLD_DATE,
		payload: false,
	});
};

export const getdEligibleWinners = (data, progress) => dispatch => {
	if (progress === "eligibleprogress") {
		dispatch({ type: ELIGIBLE_PROGRESS, payload: true });
		dispatch({ type: ELIGIBLE_PROGRESS2, payload: false });
	}
	if (progress === "eligibleprogress2") {
		dispatch({ type: ELIGIBLE_PROGRESS, payload: false });
		dispatch({ type: ELIGIBLE_PROGRESS2, payload: true });
	}
	axios
		.post("/geteligible", data)
		.then(res => {
			console.log("eligible", res.data, "yyyyyy", res.data[0]);
			// console.log(progress);
			if (progress === "eligibleprogress") {
				dispatch({ type: ELIGIBLE_PROGRESS, payload: false });
			}
			if (progress === "eligibleprogress2") {
				dispatch({ type: ELIGIBLE_PROGRESS2, payload: false });
			}

			dispatch({
				type: GET_ELIGIBLE_WINNERS,
				payload: res.data,
			});
			dispatch({
				type: NO_ELIGIBLE_WINNERS,
				payload: false,
			});

			if (Object.keys(res.data).length < 1) {
				//console.log("no data found");
				dispatch({
					type: NO_ELIGIBLE_WINNERS,
					payload: true,
				});

				setTimeout(() => {
					dispatch({
						type: NO_ELIGIBLE_WINNERS,
						payload: false,
					});
				}, 4000);
			} else {
				//console.log("length>0");
			}
		})

		.catch(err => {
			if (progress === "eligibleprogress") {
				dispatch({ type: ELIGIBLE_PROGRESS, payload: false });
			}
			if (progress === "eligibleprogress2") {
				dispatch({ type: ELIGIBLE_PROGRESS2, payload: false });
			}
			console.log(err);
		});
};

export const cleanEligibleWinnersList = () => dispatch => {
	//console.log("cleaning eligible winners");
	dispatch({
		type: REMOVE_ELIGIBLE_WINNERS,
		payload: "",
	});
};

export const loading = () => dispatch => {
	dispatch({ type: LOADING, payload: true });
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};

export const totalCallers = () => dispatch => {
	// console.log("innnn");

	const data = {
		start: Mon().format("YYYY-MM-DD") + " 00:00:00",
		end: Mon().format("YYYY-MM-DD") + " 23:59:59",
	};

	axios
		.post("/totalunique")
		.then(res => {
			// console.log("totalunique", res.data.count);

			// console.log("total unique");
			dispatch({ type: TOTAL_UNIQUE, payload: res.data.count });
		})
		.catch(err => {
			//console.log(err);
			dispatch({ type: TOTAL_UNIQUE, payload: 0 });
		});

	axios
		.post("/totalcallers")
		.then(res => {
			// console.log("total callers", res.data);
			dispatch({ type: TOTAL_CALLERS, payload: res.data.count });
		})
		.catch(err => {
			//console.log(err);
			dispatch({ type: TOTAL_CALLERS, payload: 0 });
		});

	axios
		.post("/totalcallerstoday", data)
		.then(res => {
			// console.log("totalcallerstoday", res.data);
			dispatch({ type: TOTAL_CALLERS_TODAY, payload: res.data.count });
		})
		.catch(err => {
			dispatch({ type: TOTAL_CALLERS_TODAY, payload: 0 });
		});

	axios
		.post("/totaluniquetoday", data)
		.then(res => {
			// console.log("totaluniquetoday", res.data);
			dispatch({ type: TOTAL_UNIQUE_TODAY, payload: res.data.count });
		})
		.catch(err => {
			dispatch({ type: TOTAL_UNIQUE_TODAY, payload: 0 });
		});
};

//defined

export const Logout = () => dispatch => {
	//console.log("logout succedded");
	localStorage.clear();
	var metaThemeColor = document.querySelector("meta[name=theme-color]");
	metaThemeColor.setAttribute("content", "#ffffff");
	document.body.style.backgroundColor = "#fff";

	localStorage.setItem("theme", "day");

	dispatch({
		type: CURRENT_USER,
		payload: false,
	});
	dispatch({
		type: THEME,
		payload: false,
	});
};

export const sync = () => dispatch => {
	if (localStorage.getItem("theme") === "night") {
		dispatch({
			type: THEME,
			payload: true,
		});
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#242424");
		document.body.style.backgroundColor = "#131212";
	} else {
		dispatch({
			type: THEME,
			payload: false,
		});
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#ffffff");
		document.body.style.backgroundColor = "#fafafa";
	}

	if (localStorage.getItem(hash) === loggedInStatus) {
		dispatch({
			type: CURRENT_USER,
			payload: true,
		});
	} else {
		dispatch({
			type: CURRENT_USER,
			payload: false,
		});
	}
};

export const toggleTheme = data => dispatch => {
	if (data.trim() === "day") {
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#ffffff");
		document.body.style.backgroundColor = "#fafafa";

		localStorage.setItem("theme", "day");
		dispatch({
			type: THEME,
			payload: false,
		});
	} else {
		var metaThemeColor = document.querySelector("meta[name=theme-color]");
		metaThemeColor.setAttribute("content", "#242424");
		document.body.style.backgroundColor = "#131212";

		localStorage.setItem("theme", "night");
		dispatch({
			type: THEME,
			payload: true,
		});
	}
};

export const login = (data, history) => dispatch => {
	localStorage.setItem(Base64.encode("suntvloggedIn"), Base64.encode("true"));
	dispatch({
		type: CURRENT_USER,
		payload: true,
	});
	history.push("/");
};

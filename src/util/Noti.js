import React from "react";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp(props) {
	const { enqueueSnackbar } = useSnackbar();

	// const handleClick = () => {
	// 	enqueueSnackbar("I love snacks.");
	// };

	// const handleClickVariant = variant => () => {
	// 	// variant could be success, error, warning, info, or default
	// 	enqueueSnackbar("This is a success message!", { variant });
	// };
	React.useEffect(() => {
		console.log(props.msg);
		enqueueSnackbar(`Data Submitted Successfully.`, {
			variant: "success",
		});
	}, []);
	return <React.Fragment></React.Fragment>;
}

export default function IntegrationNotistack() {
	return (
		<SnackbarProvider maxSnack={3}>
			<MyApp />
		</SnackbarProvider>
	);
}

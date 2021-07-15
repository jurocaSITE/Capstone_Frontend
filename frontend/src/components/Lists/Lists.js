import "./Lists.css";
import React from "react";
import {
	AppBar,
	Button,
	CArd,
	CardActions,
	CardContent,
	CardMedia,
	CssBaseline,
	Grid,
	Toolbar,
	Typography,
	Container,
} from "@material-ui/core";
import useStyles from "./styles";
import ListCard from "../ListCard/ListCard";
// import ImportContacts from "@material-ui/icons"

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Lists() {
	const classes = useStyles();
	return (
		// <div className="Lists">
		// 	{/* <CssBaseline /> */}
		// 	<div className="top">
		// 		<h1 className="title">Library</h1>
		// 	</div>
		// 	<div className="default-lists">
		// 		<h2>default lists</h2>
		// 	</div>
		// </div>
		<div className="Lists">
			<CssBaseline />
			<main>
				<div>
					<Container>
						<div className="top">
							<h1 className="title">Library</h1>
						</div>
						<div className={classes.container}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button variant="contained" color="primary">
										See my photos
									</Button>
								</Grid>
								<Grid item>
									<Button variant="outline" color="primary">
										secondary aciton
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					<Grid container spacing={4}>
						{cards.map((card) => (
							<ListCard key={card} />
						))}
					</Grid>
				</Container>
			</main>
		</div>
	);
}

export default Lists;

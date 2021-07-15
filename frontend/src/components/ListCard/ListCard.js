import "./ListCard.css";
import React from "react";
import {
	Button,
	Card,
	Collapse,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	IconButton,
	CardHeader,
	Avatar,
	CardActions,
} from "@material-ui/core";
import useStyles from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

function ListCard() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div className="ListCard">
			<Card className={classes.root}>
				{/* <CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							R
						</Avatar>
					}
					title="Shrimp and Chorizo Paella"
					subheader="September 14, 2016"
				/> */}
				<CardMedia
					className={classes.media}
					image="https://source.unsplash.com/random"
					title="Paella dish"
				/>
				<CardContent>
					By
					<br />
					Username
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<MoreVertIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Method:</Typography>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering, add saffron
							and set aside for 10 minutes.
						</Typography>
						<Typography paragraph>
							Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
							over medium-high heat. Add chicken, shrimp and chorizo, and cook,
							stirring occasionally until lightly browned, 6 to 8 minutes.
							Transfer shrimp to a large plate and set aside, leaving chicken
							and chorizo in the pan. Add pimentón, bay leaves, garlic,
							tomatoes, onion, salt and pepper, and cook, stirring often until
							thickened and fragrant, about 10 minutes. Add saffron broth and
							remaining 4 1/2 cups chicken broth; bring to a boil.
						</Typography>
						<Typography paragraph>
							Add rice and stir very gently to distribute. Top with artichokes
							and peppers, and cook without stirring, until most of the liquid
							is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
							reserved shrimp and mussels, tucking them down into the rice, and
							cook again without stirring, until mussels have opened and rice is
							just tender, 5 to 7 minutes more. (Discard any mussels that don’t
							open.)
						</Typography>
						<Typography>
							Set aside off of the heat to let rest for 10 minutes, and then
							serve.
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
			{/* <Grid item xs={12} sm={6} md={4}>
				<Card className={classes.card}>
					<CardMedia
						className={classes.cardMedia}
						image="https://source.unsplash.com/random"
						title="Image title"
					/>
					<CardContent className={classes.cardContent}>
						<div>
							<h3>Heading</h3>
						</div>
						<div>
							By
							<br />
							username
							<Button>
								<MoreHorizIcon />
							</Button>
						</div>
					</CardContent>
				</Card>
			</Grid> */}
		</div>
	);
}

export default ListCard;

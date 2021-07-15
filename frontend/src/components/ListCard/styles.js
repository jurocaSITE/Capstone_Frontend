import { makeStyles } from "@material-ui/core/styles";
import { WrapText } from "@material-ui/icons";
import { GiFlexibleLamp } from "react-icons/gi";

// const useStyles = makeStyles((theme) => ({
// container: {
// 	backgroundColor: theme.palette.background.paper,
// 	padding: theme.spacing(8, 0, 6),
// },
// card: {
// 	height: "100%",
// 	display: "flex",
// 	flexDirection: "column",
// },
// cardMedia: {
// 	paddingTop: "56.25%",
// },
// cardContent: {
// 	flexGrow: 1,
// },

// }));

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		// backgroundColor: red[500],
	},
}));

export default useStyles;

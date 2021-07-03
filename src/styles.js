import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(7,0,6),
        backgroundColor: theme.palette.background.paper
    },
    cardGrid: {
        padding: '20px 0'
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }
}));

export default useStyles;

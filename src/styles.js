import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(15,0,2),
    },
    root: {
        flexGrow: 1,
        marginTop: 60,
    },
    grid: {

    },
    text: {
        fontFamily: "Ubuntu",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 24,
        padding: theme.spacing(3,3,0)
    },
    text2: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        padding: theme.spacing(1,3,0)
    },
    textSub: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        padding: theme.spacing(1,1,0)
    },
    textHeading: {
        fontFamily: "Ubuntu",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 24,
        padding: theme.spacing(1,1,0),
        color: '#2D2C30'
    },
    textButton: {
        fontFamily: "Ubuntu",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 12,
        color: '#1445F5',
        //padding: theme.spacing(4,3,0),
        marginTop: 20,
        marginLeft: 17
    },
    inSystem: {
        height : 168,
        borderRadius: 16,
        boxShadow: "0px 0px 8px rgba(196, 196, 196, 0.25)"
    },
    notInSystem: {
        border: "2px solid #FFFFFF",
        height : 168,
        borderRadius: 16,
        boxShadow: "0px 0px 8px rgba(196, 196, 196, 0.25)",
        background: '#F5F7F6'
    }
}));

export default useStyles;

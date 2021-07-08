import React from 'react';
import {
    CssBaseline,
    Grid,
    Container,
    AppBar,
    Toolbar,
    Typography,
    Box
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FeTestApi from "./FeTestApi";
import Company from "./Company"
import { withStyles } from '@material-ui/core/styles';
import logo from './tinksmatlogo.jpg';
import logotwo from './logotwo.PNG';
import Paper from "@material-ui/core/Paper";

const useStyles = theme => ({
    container: {
        padding: theme.spacing(15,0,2),
    },
    root: {
        flexGrow: 1
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
        padding: theme.spacing(4,3,0),
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
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initializeDefaultValues();
    }

    initializeDefaultValues() {
        return {
            listOfCompanies: []
        }
    }

    async componentDidMount() {
        await this.getDetails();
    }


    getDetails = async () => {
        await FeTestApi.get("/my")
            .then(res => {
                let data = res.data;
                this.createCompany(data);
            }).catch(err => console.log("error: " + err))
    }

    createCompany(data) {
        this.listOfCompanies = [];
        const tempList = [];
        for (let i = 0; i < data.length; i++) {
            tempList.push(new Company(data[i].id, data[i].registryCode, data[i].name));
        }
        this.setState({
            listOfCompanies: tempList
        })
    }

    postCompanyToSystem = async (regCode) => {
        await FeTestApi.post('', {registryCode: regCode
        })
        await this.getDetails();
    }

    isCompanyIdNull(id) {
        return id === null;
    }



    render() {
        const { classes } = this.props;
        return (
            <>
                <CssBaseline />
                <AppBar position="static"  style={{ background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <img src={logo} alt="logo" width={"130"}/>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.container}>
                        <Container maxWidth={false}>
                            <Grid container spacing={2} >
                                <Grid item> <Box boxShadow={7}
                                                 borderRadius={16}
                                                 display="flex"
                                                 justifyContent="center"
                                                 alignItems="center"
                                                 height={88}
                                                 width={88}>
                                    <img src={logotwo} alt="logotwo" width={"80"} align={"center"}/>
                                </Box></Grid>
                                <Grid item>
                                    <Typography className={classes.textHeading} gutterBottom>
                                    Minu firmad
                                </Typography>
                                    <Typography className={classes.textSub}>
                                        EE Äriregistri andmetel on Sinuga seotud järgmised firmad.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                    <Container maxWidth={false} className={classes.root}>
                        <Grid container spacing={3} >
                            {this.state.listOfCompanies.map((company) => (
                                <Grid item key={company.registryCode} xs={3} className={classes.grid}>
                                    <Paper className={this.isCompanyIdNull(company.id) ? classes.notInSystem : classes.inSystem}>
                                        <Typography className={classes.text}>
                                            {company.name}
                                        </Typography>
                                        <Typography gutterBottom className={classes.text2}>
                                            Reg.nr: {company.registryCode}
                                        </Typography>
                                            <div>
                                                {this.isCompanyIdNull(company.id) ?
                                                    <Button onClick={this.postCompanyToSystem.bind(this, company.registryCode)} className={classes.textButton} >
                                                        Lisa süsteemi
                                                    </Button> :
                                                    null
                                                }
                                            </div>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                    </Container>
                </main>
            </>
        )
    }
}

export default withStyles(useStyles)(App);

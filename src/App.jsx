import React from 'react';
import {
    Card,
    CardContent,
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

const useStyles = theme => ({
    container: {
        padding: theme.spacing(15,0,2),
    },
    root: {
        flexGrow: 1
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
                                    <Typography variant={"h5"} align={"Left"} color="textPrimary" gutterBottom style={{ fontWeight: 600 }}>
                                    Minu firmad
                                </Typography>
                                    <Typography variant={"subtitle"} align={"left"} color={"textSecondary"} paragraph>
                                        EE Äriregistri andmetel on Sinuga seotud järgmised firmad.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                    <Container maxWidth={false} className={classes.root}>
                        <Grid container spacing={2} >
                            {this.state.listOfCompanies.map((company) => (
                                <Grid item key={company.registryCode} xs={3} className={classes.grid}>
                                    <Box boxShadow={3} borderRadius={15}>
                                    <Card style={{height:150}} >
                                        <CardContent>
                                        <Typography variant={"h5"} style={{ fontWeight: 600 }}>
                                            {company.name}
                                        </Typography>
                                        <Typography variant={"subtitle"}>
                                            Reg.nr: {company.registryCode}
                                        </Typography>
                                    </CardContent>
                                        <CardContent>
                                            <div>
                                                {this.isCompanyIdNull(company.id) ?
                                                    <Button onClick={this.postCompanyToSystem.bind(this, company.registryCode)} color={"primary"} style={{fontWeight: 600}}>
                                                        Lisa süsteemi
                                                    </Button> :
                                                    <Typography> Süsteemis olemas</Typography>
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
                                    </Box>
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

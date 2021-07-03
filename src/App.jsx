import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CssBaseline,
    Grid,
    Container,
    AppBar,
    Toolbar,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FeTestApi from "./FeTestApi";
import Company from "./Company"



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
        return (
            <>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant={"h4"}>
                            Tinksmat
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div>
                        <Container maxWidth={"sm"}>
                            <Typography variant={"h3"} align={"center"} color="textPrimary" gutterBottom>
                                Minu firmad
                            </Typography>
                            <Typography variant={"h6"} align={"center"} color={"textSecondary"} paragraph>
                                EE Äriregistri andmetel on Sinuga seotud järgmised firmad.
                            </Typography>
                        </Container>
                    </div>
                    <Container maxWidth={"md"}>
                        <Grid container spacing={4}>
                            {this.state.listOfCompanies.map((company) => (
                                <Grid item xs={4}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant={"h6"}>
                                                {company.name}
                                            </Typography>
                                            <Typography>
                                                {company.registryCode}
                                            </Typography>
                                        </CardContent>
                                        <CardContent>
                                            <div>
                                                {this.isCompanyIdNull(company.id) ?
                                                <Button onClick={this.postCompanyToSystem.bind(this, company.registryCode)}>
                                                    Lisa süsteemi
                                                </Button> :
                                                    <Typography variant={"h6"}> Süsteemis olemas</Typography>
                                            }
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </>
        )
    }
}

export default App;

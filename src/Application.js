import React, {useEffect, useState} from 'react';
import {Container, Grid, Typography,} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FeTestApi from "./FeTestApi";
import Company from "./Company"
import Paper from "@material-ui/core/Paper";
import Appbar from "./Components/AppBar"
import TopPage from "./Components/TopPage"
import useStyles from "./styles";

export default function FETest() {
    const [listOfCompanies, setListCompany] = useState([]);

    useEffect(() => {
        getDetails().then(() => [])
    }, [])


    const getDetails = async () => {
        await FeTestApi.get("/my")
            .then(res => {
                let data = res.data;
                createCompany(data);
            }).catch(err => console.log("error: " + err))
    }

    const createCompany = (data) => {
        setListCompany(listOfCompanies.splice(0, listOfCompanies.length));
        const tempList = [];
        for (let i = 0; i < data.length; i++) {
            tempList.push(new Company(data[i].id, data[i].registryCode, data[i].name));
        }
        setListCompany(listOfCompanies.concat(tempList));
    }

    const postCompanyToSystem = async (regCode) => {
        await FeTestApi.post('', {
            registryCode: regCode
        })
        await getDetails();
    }

    const isCompanyIdNull = (id) => {
        return id === null;
    }

    const classes = useStyles();

    return (
        <>
            <Appbar/>
            <main>
                <TopPage/>
                <Container maxWidth={false} className={classes.root}>
                    <Grid container spacing={3}>
                        {listOfCompanies.map((company) => (
                            <Grid item key={company.registryCode} xs={3} className={classes.grid}>
                                <Paper className={isCompanyIdNull(company.id) ? classes.notInSystem : classes.inSystem}>
                                    <Typography className={classes.text}>
                                        {company.name}
                                    </Typography>
                                    <Typography gutterBottom className={classes.text2}>
                                        Reg.nr: {company.registryCode}
                                    </Typography>
                                    <div>
                                        {isCompanyIdNull(company.id) ?
                                            <Button onClick={postCompanyToSystem.bind(this, company.registryCode)}
                                                    className={classes.textButton}>
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

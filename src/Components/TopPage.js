import React from 'react'
import {Box, Container, Grid, Typography} from "@material-ui/core";
import logotwo from "../logotwo.PNG";
import useStyles from "../styles";

export default function TopPage() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Container maxWidth={false}>
                <Grid container spacing={2}>
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
    )
}

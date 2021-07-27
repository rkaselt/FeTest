import React from 'react'
import {AppBar, CssBaseline, Toolbar} from "@material-ui/core";
import logo from "../tinksmatlogo.jpg";

export default function Appbar() {
    return (
        <div>
            <CssBaseline/>
            <AppBar position="static" style={{background: 'transparent', boxShadow: 'none', marginTop: 60}}>
                <Toolbar>
                    <img src={logo} alt="logo" width={"130"}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

import React from "react";
import {Switch, Route } from 'react-router-dom';
import HomePage from "../components/homePage";

import "antd/dist/antd.min.css";
import "./index.css";


const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
        </Switch>
    );
}

export default App;

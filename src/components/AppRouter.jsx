import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {publicRoutes} from "../router/Routes";
import {AppContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isLoading} = useContext(AppContext)

    if (isLoading) {
        return <Loader/>
    }
    return (

        <Switch>
            {publicRoutes.map(route =>
                <Route key={route.path} component={route.component} path={route.path} exact={route.exact}/>
            )}
            <Redirect to={"/patients"}/>
        </Switch>
    );
};

export default AppRouter;
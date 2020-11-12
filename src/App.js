import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import Login from './screens/login';
import SignUp from './screens/signup';
import Footer from './widgets/footer';
import MyNav from './widgets/myNav';


export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <MyNav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/services" />
                    <Route path="/404" />
                    <Redirect to="/404" />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}
import React, { Component } from 'react';
import Header from './layout/Header';
import { connect } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFond from './pages/NotFond404';
import AccessDenied from './pages/AccessDenied';
import startup from '../actions/startup';

class App extends Component {
  componentWillMount = () => {
    this.props.startup();
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/signup"
              component={this.props.isAuthenticated ? AccessDenied : SignUpPage}
            />
            <Route
              path="/signin"
              component={this.props.isAuthenticated ? AccessDenied : SignInPage}
            />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="*" component={NotFond} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { startup }
)(App);

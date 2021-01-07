
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";

import  Index  from './views/Index';
import  Login  from "./views/Login";
import NavMenu from "./components/NavMenu";
import Register from "./views/Register";
import store from "./redux/store";

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore } from "./redux/store";

export default class App extends Component {
  static displayName = App.name;

  render() {
  return (
    <Provider store={store}>
      <PersistGate loading={"..Loading"} persistor={persistedStore}>
        <div className="main">
          <BrowserRouter>
            <NavMenu />
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
  }
}




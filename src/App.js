import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

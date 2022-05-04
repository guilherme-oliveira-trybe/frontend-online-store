import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import './App.css';
import Checkout from './pages/Checkout';

class App extends Component {
  constructor() {
    super();

    this.state = {
      numOfCartItems: 0,
    };
  }

  componentDidMount() {
    this.getCartLength();
  }

  getCartLength = () => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const numOfCartItems = JSON.parse(localStorage.getItem('cartItems')).length;
    this.setState({
      numOfCartItems,
    });
  }

  sendToCart = (productObj) => {
    this.addToLocalStorage(productObj);
  }

  addToLocalStorage = (productObj) => {
    const prevCartItems = JSON.parse(localStorage.getItem('cartItems'));
    const cartItems = [...prevCartItems, productObj];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    this.setState({
      numOfCartItems: cartItems.length,
    });
  }

  render() {
    const { numOfCartItems } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Home
                numOfCartItems={ numOfCartItems }
                sendToCart={ (arg) => this.sendToCart(arg) }
              />) }
          />
          <Route
            exact
            path="/cart"
            component={ Cart }
          />
          <Route
            path="/product/:id"
            render={ (props) => (
              <Product
                { ...props }
                numOfCartItems={ numOfCartItems }
                sendToCart={ (arg) => this.sendToCart(arg) }
              />) }
          />
          <Route
            exact
            path="/checkout"
            component={ Checkout }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

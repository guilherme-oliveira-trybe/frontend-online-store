import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <input
            type="button"
            value="Carrinho"
          />
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
        <Search />
      </div>
    );
  }
}

export default Home;

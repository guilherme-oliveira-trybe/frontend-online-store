import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';

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

        <Categories />
      </div>
    );
  }
}

export default Home;

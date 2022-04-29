import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import Categories from '../components/Categories';

class Home extends Component {
  render() {
    return (
      <main>
        <Link to="/cart" data-testid="shopping-cart-button">
          <button
            type="button"
            value="Carrinho"
          >
            Seu carrinho
            {' '}
            <i className="fa fa-shopping-cart" />
          </button>
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
        <Search />
      </main>
    );
  }
}

export default Home;

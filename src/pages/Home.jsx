import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search';
import Categories from '../components/Categories';

class Home extends Component {
  render() {
    const { numOfCartItems, sendToCart } = this.props;
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
            <span data-testid="shopping-cart-size">
              {numOfCartItems}
            </span>
          </button>
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories sendToCart={ sendToCart } />
        <Search sendToCart={ sendToCart } />
      </main>
    );
  }
}

Home.propTypes = {
  numOfCartItems: PropTypes.number,
  sendToCart: PropTypes.func,
}.isRequired;

export default Home;

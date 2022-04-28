import React, { Component } from 'react';
import Card from '../components/Card';
import { itemName } from '../services/api';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      itemsResult: [],
    };
  }

  componentDidMount = () => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    JSON.parse(localStorage.getItem('cartItems'));
  }

  sendToCart = (productObj) => {
    this.addToLocalStorage(productObj);
    console.log('clicou');
  }

  addToLocalStorage = (productObj) => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    } else {
      const prevCartItems = JSON.parse(localStorage.getItem('cartItems'));
      const CartItems = [...prevCartItems, productObj];
      localStorage.setItem('cartItems', JSON.stringify(CartItems));
    }
  }

  inputHandleChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  }

  itemName = async () => {
    const { search } = this.state;
    const items = await itemName(search);
    this.setState({
      search: '',
      itemsResult: [...items.results],
    });
  }

  render() {
    const { search, itemsResult } = this.state;
    const minLenght = 0;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          name="product"
          onChange={ this.inputHandleChange }
          value={ search }
        />
        <button
          data-testid="query-button"
          type="submit"
          disabled={ search.length < minLenght }
          onClick={ this.itemName }
        >
          Pesquisar
        </button>
        <div className="search-preview">
          {itemsResult
            .map((product) => (
              <div
                key={ product.id }
                data-testid="product"
              >
                <Card
                  productId={ product.id }
                  title={ product.title }
                  thumbnail={ product.thumbnail }
                  price={ product.price }
                  onClick={ () => this.sendToCart(product) }
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Search;

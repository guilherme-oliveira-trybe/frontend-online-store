import React, { Component } from 'react';
import Card from '../components/Card';
import { itemName } from '../services/api';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      // loading: false,
      search: '',
      itemsResult: [],
    };
  }

  inputHandleChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  }

  itemName = async () => {
    const { search } = this.state;
    const items = await itemName(search);
    // this.setState(
    //   async () => {
    //     await this.setState({
    //       search: '',
    //       itemsResult: [...items.results],
    //     });
    //   },
    // );
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
            .map(({ id, title, thumbnail, price }) => (
              <div
                key={ id }
                data-testid="product"
              >
                <Card
                  productId={ id }
                  title={ title }
                  thumbnail={ thumbnail }
                  price={ price }
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import { itemName } from '../services/api';
// import { Link } from 'react-router-dom';

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
    console.log(items.results);
    this.setState(
      // { loading: true },
      async () => {
        this.setState({
          search: '',
          itemsResult: [...items.results],
          // loading: false,
        });
      },
    );
  }

  // renderItems = () => {
  //   const { search } = this.state;
  //   console.log(itemName(search));
  //   const searchResult = itemName(search);

  //   return searchResult.map((item) => console.log(item));
  // }

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
              <div key={ id } data-testid="product">
                <h1>{title}</h1>
                <img
                  src={ thumbnail }
                  alt={ title }
                />
                <p>
                  {' '}
                  {price}
                </p>
              </div>

            ))}
        </div>
      </div>
    );
  }
}

export default Search;

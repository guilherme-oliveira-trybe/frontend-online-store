import React, { Component } from 'react';
import { itemName } from '../services/api';
// import { Link } from 'react-router-dom';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      search: '',
      itemsResult: [],
    };
  }

  inputHandleChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  }

  searchArtists = async () => {
    const { search } = this.state;
    const items = await itemName(search);
    console.log(items.results);
    this.setState(
      { loading: true },
      async () => {
        this.setState({
          search: '',
          itemsResult: [...items.results],
          loading: false,
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
    const { search } = this.state;
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
          onClick={ this.searchArtists }
        >
          Pesquisar
        </button>
        <div className="search-preview">
          preview
        </div>
      </div>
    );
  }
}

export default Search;

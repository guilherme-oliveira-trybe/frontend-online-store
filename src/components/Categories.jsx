import React, { Component } from 'react';
import { getCategories, itemCategory } from '../services/api';
import Card from './Card';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      itemsResult: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  onClick = async ({ target }) => {
    const { id } = target;
    await this.itemCategory(id);
  }

  itemCategory = async (id) => {
    const items = await itemCategory(id);
    this.setState({
      itemsResult: [...items.results],
    });
  }

  render() {
    const { categories, itemsResult } = this.state;
    return (
      <div className="navigation-container">
        <h1>Categorias:</h1>
        <nav>
          {categories.map(({ id, name }) => (
            <div key={ id }>
              <input
                type="button"
                data-testid="category"
                value={ name }
                onClick={ this.onClick }
                id={ id }
              />
            </div>
          ))}
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
        </nav>
      </div>
    );
  }
}

export default Categories;

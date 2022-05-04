import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories, itemCategory } from '../services/api';
import Card from './Card';
import './Categories.css';

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
    const { sendToCart } = this.props;
    const { categories, itemsResult } = this.state;
    return (
      <>
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
          </nav>
        </div>
        <div className="product-container">
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
                  onClick={ () => sendToCart(product) }
                  shipping={ product.shipping.free_shipping }
                />
              </div>
            ))}
        </div>
      </>
    );
  }
}

Categories.propTypes = {
  sendToCart: PropTypes.func,
}.isRequired;

export default Categories;

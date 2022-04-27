import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;
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
              />
            </div>
          ))}
        </nav>
      </div>
    );
  }
}

export default Categories;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { productId, thumbnail, title, price } = this.props;
    return (
      <div>
        <Link
          to={ `/product/${productId}` }
          data-testid="product-detail-link"
        >
          <h1>{title}</h1>
          <img
            src={ thumbnail }
            alt={ title }
          />
          <p>
            {' '}
            {`R$ ${price}`}
          </p>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  productId: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

export default Card;

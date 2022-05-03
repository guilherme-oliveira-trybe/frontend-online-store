import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { productId, thumbnail, title, price, onClick, shipping } = this.props;
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
          { shipping && <p data-testid="free-shipping"> Frete Grátis </p> }
        </Link>
        <input
          data-testid="product-add-to-cart"
          type="button"
          value="Adicionar ao carrinho"
          onClick={ onClick }
        />
      </div>
    );
  }
}

Card.propTypes = {
  productId: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default Card;

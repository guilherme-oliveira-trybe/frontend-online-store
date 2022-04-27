import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { thumbnail, title, price } = this.props;
    return (
      <div>
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
    );
  }
}

Card.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

export default Card;

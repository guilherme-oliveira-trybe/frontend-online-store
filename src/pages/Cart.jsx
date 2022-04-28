import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
    };
  }

  componentDidMount = () => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({
      cartItems,
    });
  }

  getProductQuantity(id) {
    const { cartItems } = this.state;
    const numOfItems = cartItems
      .filter((product) => id === product.id).length;
    return numOfItems;
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        {
          !cartItems
            ? (
              <h2 data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </h2>
            )
            : cartItems
              .map(({ id, thumbnail, title, price }) => (
                <div key={ id }>
                  <h1 data-testid="shopping-cart-product-name">
                    {title}
                  </h1>
                  <img
                    src={ thumbnail }
                    alt={ title }
                  />
                  <p>{`R$ ${price}`}</p>
                  <span>Quantidade: </span>
                  <span data-testid="shopping-cart-product-quantity">
                    { this.getProductQuantity(id) }
                  </span>
                </div>
              ))
        }
      </div>
    );
  }
}

export default Cart;

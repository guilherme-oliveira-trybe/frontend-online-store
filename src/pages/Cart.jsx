import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
      isCartEmpty: true,
    };
  }

  componentDidMount = () => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState(
      ({
        cartItems,
      }), () => this.checkCartProducts(),
    );
  }

  getProductQuantity(id) {
    const { cartItems } = this.state;
    const numOfItems = cartItems
      .filter((product) => id === product.id).length;
    return numOfItems;
  }

  checkCartProducts = () => {
    const { cartItems } = this.state;
    const isCartEmpty = cartItems.length === 0;
    this.setState({
      isCartEmpty,
    });
  }

  increaseItem(id) {
    const { cartItems } = this.state;
    const add = cartItems.find((item) => id === item.id);
    console.log(add);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, add],
    }));
  }

  decreaseItem(id) {
    const { cartItems } = this.state;
    cartItems.splice(id, 1);
    this.setState({
      cartItems,
    });
  }

  totalPrice(price, id) {
    const quantity = this.getProductQuantity(id);
    const total = quantity * price;
    return total;
  }

  render() {
    const { cartItems, isCartEmpty } = this.state;
    return (
      <div>
        {
          isCartEmpty
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
                  <div>
                    <span>Quantidade: </span>
                    <input
                      data-testid="product-decrease-quantity"
                      type="button"
                      value="-"
                      onClick={ () => this.decreaseItem(id) }
                    />
                    <span data-testid="shopping-cart-product-quantity">
                      { this.getProductQuantity(id) }
                    </span>
                    <input
                      data-testid="product-increase-quantity"
                      type="button"
                      value="+"
                      onClick={ () => this.increaseItem(id) }
                    />
                    <span>{`Total: R$ ${this.totalPrice(price, id)}`}</span>
                  </div>
                </div>
              ))
        }
      </div>
    );
  }
}

export default Cart;

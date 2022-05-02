import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
      filteredCartItems: [],
      isCartEmpty: true,
    };
  }

  componentDidMount = () => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState(
      {
        cartItems,
      },
      () => {
        this.checkCartProducts();
        this.filterCartItems();
      },
    );
  };

  getProductQuantity(id) {
    const { cartItems } = this.state;
    const numOfItems = cartItems.slice();
    return numOfItems.filter((product) => id === product.id).length;
  }

  filterCartItems = () => {
    const { cartItems } = this.state;
    const filteredCartItems = cartItems.filter(
      (product, i, arr) => i === arr.findIndex((curr) => curr.id === product.id),
    );

    this.setState({
      filteredCartItems,
    });
  };

  checkCartProducts = () => {
    const { cartItems } = this.state;
    const isCartEmpty = cartItems.length === 0;
    this.setState({
      isCartEmpty,
    });
  };

  findItemIndex = (items, id) => {
    const noResponse = -1;
    let response = noResponse;
    items.map((item, index) => { if (item.id === id) response = index; return 0; });
    return response;
  }

  // decreaseItem(id) {
  //   const { cartItems } = this.state;
  //   cartItems.splice(id, 1);
  //   this.setState({
  //     cartItems,
  //   });
  // }

  addToLocalStorage = (productObj) => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    } else {
      const prevCartItems = JSON.parse(localStorage.getItem('cartItems'));
      const CartItems = [...prevCartItems, productObj];
      localStorage.setItem('cartItems', JSON.stringify(CartItems));
    }
  }

  increaseItem(item, avb) {
    if (item.available_quantity > avb) {
      this.setState((prevState) => ({
        cartItems: [...prevState.cartItems, item],
      }));
      this.addToLocalStorage(item);
    }
  }

  decreaseItem(id) {
    const { cartItems } = this.state;
    const newCartItems = cartItems.slice();
    const index = this.findItemIndex(newCartItems, id);
    if (index < 0) return;
    newCartItems.splice(index, 1);
    this.setState({
      cartItems: newCartItems,
    });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  }

  totalPrice(price, id) {
    const quantity = this.getProductQuantity(id);
    const total = quantity * price;
    return total;
  }

  render() {
    const { filteredCartItems, isCartEmpty } = this.state;
    return (
      <div>
        {isCartEmpty ? (
          <h2 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h2>
        ) : (
          filteredCartItems.map((item) => (
            <div key={ item.id }>
              <h1 data-testid="shopping-cart-product-name">{item.title}</h1>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{`R$ ${item.price}`}</p>
              <div>
                <span>Quantidade: </span>
                <input
                  data-testid="product-decrease-quantity"
                  type="button"
                  value="-"
                  onClick={ () => this.decreaseItem(item.id) }
                />
                <span data-testid="shopping-cart-product-quantity">
                  {this.getProductQuantity(item.id)}
                </span>
                <input
                  data-testid="product-increase-quantity"
                  type="button"
                  value="+"
                  // onClick={ () => this.increaseItem(id) }
                  onClick={ () => this.increaseItem(item,
                    this.getProductQuantity(item.id)) }
                />
                <span>{`Total: R$ ${this.totalPrice(item.price, item.id)}`}</span>
              </div>
            </div>
          ))
        )}
        <Link to="/checkout" data-testid="checkout-products">
          <button
            type="button"
            value="Finalizar"
          >
            Finalizar Compra
          </button>
        </Link>
      </div>
    );
  }
}

export default Cart;

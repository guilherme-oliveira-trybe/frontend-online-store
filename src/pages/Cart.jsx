import React, { Component } from 'react';

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
      ({
        cartItems,
      }), () => {
        this.checkCartProducts();
        this.filterCartItems();
      },
    );
  }

  getProductQuantity(id) {
    const { cartItems } = this.state;
    console.log(cartItems);
    console.log(cartItems.length);

    const numOfItems = cartItems.splice();
    if (numOfItems !== undefined) {
      return numOfItems.filter((product) => id === product.id).length;
    }
    // if(numOfItems)
    // console.log(numOfItems);
    // if (numOfItems === undefined) return 1;
    // if (numOfItems === undefined) return 1;
    // const numOfItems = cartItems
    //   .filter((product) => id === product.id).length;
    // return numOfItems;
  }

  filterCartItems = () => {
    const { cartItems } = this.state;
    const filteredCartItems = cartItems
      .filter((product, i, arr) => i === arr
        .findIndex((curr) => curr.id === product.id));
    this.setState({
      filteredCartItems,
    });
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
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, add],
    }));
    // }), () => localStorage.setItem('cartItems', JSON.stringify(cartItems)));
    // const prevCartItems = JSON.parse(localStorage.getItem('cartItems'));
    // const cartItemsTeste = [...prevCartItems, cartItems];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  decreaseItem(id, index) {
    const { cartItems } = this.state;
    // console.log(cartItems);
    // console.log(id);
    // console.log(index);
    const tempCartItems = cartItems.slice();
    const removed = tempCartItems.splice(index, 1);
    // console.log(tempCartItems);
    console.log(removed);
    this.setState({
      cartItems: tempCartItems,
      // cartItems: newcartItems,
    });
    // }, () => localStorage.setItem('cartItems', JSON.stringify(cartItems)));
    // const prevCartItems = JSON.parse(localStorage.getItem('cartItems'));
    // const cartItemsTeste = [...prevCartItems, cartItems];
    localStorage.setItem('cartItems', JSON.stringify(tempCartItems));
  }

  // decreaseItem(id) {
  //   const { cartItems } = this.state;
  //   cartItems.splice(id, 1);
  //   this.setState({
  //     cartItems,
  //   });
  // }

  totalPrice(price, id) {
    const quantity = this.getProductQuantity(id);
    const total = quantity * price;
    return total;
  }

  render() {
    const { filteredCartItems, isCartEmpty } = this.state;
    return (
      <div>
        {
          isCartEmpty
            ? (
              <h2 data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </h2>
            )
            : filteredCartItems
              .map(({ id, thumbnail, title, price }, index) => (
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
                      onClick={ () => this.decreaseItem(id, index) }
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

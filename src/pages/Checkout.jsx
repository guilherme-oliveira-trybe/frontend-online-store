import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      filteredCartItems: [],
      sumItems: [],
      subtotal: 0,
    };
  }

  componentDidMount = () => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState(({
      cartItems,
    }), () => this.filterCartItems());
  }

  getProductQuantity(id) {
    const { cartItems } = this.state;
    // const numOfItems = cartItems;
    const numOfItems = cartItems.slice();
    return numOfItems.filter((product) => id === product.id).length;
  }

  getSubtotal() {
    const { sumItems } = this.state;
    const result = sumItems.reduce((acc, curr) => acc + curr, 0);
    console.log(result);
    return result;
  }

  setSubtotal(total) {
    const { subtotal } = this.state;
    this.setState({
      subtotal: subtotal + total,
    });
  }

  // formHandler = ({ target: { name, value } }) => {
  //   this.setState((prevState) => ({
  //     customerForm: {
  //       ...prevState.customerForm,
  //       [name]: value,
  //     },
  //   }), () => this.validadeSubmission());
  // }

  // validadeSubmission = () => {
  //   const {
  //     customerForm: {
  //       fullName,
  //       email,
  //       cpf,
  //       address,
  //       cep,
  //       phone,
  //       homeNumber,
  //       city,
  //       estate,
  //       complement,
  //     },
  //   } = this.state;
  //   const errorCases = [
  //     !fullName.length,
  //     !email.length,
  //     !cpf,
  //     !address,
  //     !cep,
  //     !phone,
  //     !homeNumber,
  //     !city,
  //     !estate,
  //     !complement,
  //   ];
  //   const validForm = errorCases
  //     .every((error) => error === false);
  //   this.setState({
  //     validForm,
  //   });
  // }

  filterCartItems = () => {
    const { cartItems } = this.state;
    const filteredCartItems = cartItems.filter(
      (product, i, arr) => i === arr.findIndex((curr) => curr.id === product.id),
    );

    this.setState({
      filteredCartItems,
    });
  };

  setSubtotal = () => {
    const { filteredCartItems } = this.state;
    const result = filteredCartItems
      .reduce((acc, curr) => acc + (curr.price * this.getProductQuantity(curr.id)), 0);
    console.log(result);
    return result;
  }

  totalPrice(price, id) {
    const quantity = this.getProductQuantity(id);
    console.log(price);
    console.log(quantity);
    const total = quantity * price;
    return total;
  }

  render() {
    const { filteredCartItems } = this.state;
    return (
      <>
        <div>
          <Link to="/cart">
            <button
              type="button"
              value="Voltar"
            >
              Voltar
            </button>
          </Link>
        </div>
        <div>
          <fieldset>
            {filteredCartItems.map((item) => (
              <div key={ item.id }>
                <h3>{item.title}</h3>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{`R$ ${item.price}`}</p>
                <p>
                  {`Total de itens ${this.getProductQuantity(item.id)}`}
                </p>
                <span>
                  {`Total: R$ ${this.totalPrice(item.price, item.id)
                    .toFixed(2)}`}
                </span>
              </div>
            ))}
            <div>
              <h1>{`Subtotal: R$ ${this.setSubtotal().toFixed(2)}`}</h1>
            </div>
          </fieldset>
        </div>
        <br />
        <div>
          <Form
            onChange={ this.formHandler }
          />
        </div>
      </>
    );
  }
}

export default Checkout;

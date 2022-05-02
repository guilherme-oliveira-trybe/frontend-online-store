import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      filteredCartItems: [],
      sumItems: [],
      customerForm: {
        fullName: '',
        email: '',
        cpf: '',
        address: '',
        cep: '',
        phone: '',
        homeNumber: '',
        city: '',
        estate: '',
        complement: '',
      },
      validForm: false,
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
        this.filterCartItems();
      },
    );
  };

  getProductQuantity(id) {
    const { cartItems } = this.state;
    const numOfItems = cartItems.slice();
    return numOfItems.filter((product) => id === product.id).length;
  }

  getSubtotal() {
    const { sumItems } = this.state;
    return sumItems.reduce((acc, curr) => acc + curr, 0);
  }

  formHandler = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      reviewForm: {
        ...prevState.reviewForm,
        [name]: value,
      },
    }), () => this.validadeSubmission());
  }

  validadeSubmission = () => {
    const {
      customerForm: {
        fullName,
        email,
        cpf,
        address,
        cep,
        phone,
        homeNumber,
        city,
        estate,
        complement,
      },
    } = this.state;
    const errorCases = [
      !fullName.length,
      !email.length,
      !cpf,
      !address,
      !cep,
      !phone,
      !homeNumber,
      !city,
      !estate,
      !complement,
    ];
    const validForm = errorCases
      .every((error) => error === false);
    this.setState({
      validForm,
    });
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

  totalPrice(price, id) {
    const quantity = this.getProductQuantity(id);
    const total = quantity * price;
    return total;
  }

  render() {
    const { filteredCartItems, sumItems } = this.state;
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
                <span>{`Total: R$ ${this.totalPrice(item.price, item.id)}`}</span>
                {sumItems.push(this.totalPrice(item.price, item.id))}
                {console.log(sumItems)}
              </div>
            ))}
            <div>
              <h1>{`Subtotal: R$ ${this.getSubtotal()}`}</h1>
            </div>
          </fieldset>
        </div>
        <br />
        <div>
          <fieldset>
            <h3>Informações do Comprador</h3>
            <input
              type="text"
              name="full-name"
              placeholder="Obrigatório"
              value="Nome Completo"
              onChange={ this.formHandler }
              data-testid="checkout-fullname"
            />
            <input
              type="text"
              name="email"
              placeholder="Obrigatório"
              value="email"
              onChange={ this.formHandler }
              data-testid="checkout-email"
            />
            <input
              type="text"
              name="address"
              placeholder="Obrigatório"
              value="Endereço"
              onChange={ this.formHandler }
              data-testid="checkout-address"
            />
            <input
              type="text"
              name="cpf"
              placeholder="Obrigatório"
              value="CPF"
              onChange={ this.formHandler }
              data-testid="checkout-cpf"
            />
            <input
              type="text"
              name="phone"
              placeholder="Obrigatório"
              value="Telefone"
              onChange={ this.formHandler }
              data-testid="checkout-phone"
            />
            <input
              type="text"
              name="cep"
              placeholder="Obrigatório"
              value="CEP"
              onChange={ this.formHandler }
              data-testid="checkout-cep"
            />
          </fieldset>
          <br />
          <fieldset>
            <h3>Método de Pagamento</h3>
            <div>
              Boleto
              <input
                type="radio"
                name="rating"
                id="1-rating"
                value="1"
                // onChange={ this.formHandler }
              />
            </div>
            <div>
              Cartão de Crédito
              <input
                type="radio"
                name="rating"
                id="1-rating"
                value="2"
                // onChange={ this.formHandler }
              />
              <input
                type="radio"
                name="rating"
                id="1-rating"
                value="3"
                // onChange={ this.formHandler }
              />
              <input
                type="radio"
                name="rating"
                id="1-rating"
                value="4"
                // onChange={ this.formHandler }
              />
            </div>
          </fieldset>
        </div>
        <button
          type="button"
          value="Comprar"
        >
          Comprar
        </button>
      </>
    );
  }
}

export default Checkout;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

class Form extends Component {
  constructor() {
    super();
    this.state = {
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

  clearState = () => {
    this.setState({
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
    });
  }

  formHandler = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      customerForm: {
        ...prevState.customerForm,
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

  render() {
    const { customerForm: { fullName, email, cpf, address, cep,
      phone, homeNumber, city, estate, complement }, validForm } = this.state;
    return (
      <div>
        <fieldset>
          <h3>Informações do Comprador</h3>
          <Input
            type="text"
            name="fullName"
            placeHolder="Nome Completo"
            value={ fullName }
            onChange={ this.formHandler }
            dataTestid="checkout-fullname"
          />
          <Input
            type="text"
            name="email"
            placeHolder="Email"
            value={ email }
            onChange={ this.formHandler }
            dataTestid="checkout-email"
          />
          <Input
            type="text"
            name="address"
            placeHolder="Endereço"
            value={ address }
            onChange={ this.formHandler }
            dataTestid="checkout-address"
          />
          <Input
            type="text"
            name="cpf"
            placeHolder="CPF"
            value={ cpf }
            onChange={ this.formHandler }
            dataTestid="checkout-cpf"
          />
          <Input
            type="text"
            name="cep"
            placeHolder="CEP"
            value={ cep }
            onChange={ this.formHandler }
            dataTestid="checkout-cep"
          />
          <Input
            type="text"
            name="phone"
            placeHolder="Telefone"
            value={ phone }
            onChange={ this.formHandler }
            dataTestid="checkout-phone"
          />
          <Input
            type="text"
            name="homeNumber"
            placeHolder="Número"
            value={ homeNumber }
            onChange={ this.formHandler }
          />
          <Input
            type="text"
            name="estate"
            placeHolder="Estado"
            value={ estate }
            onChange={ this.formHandler }
          />
          <Input
            type="text"
            name="city"
            placeHolder="Cidade"
            value={ city }
            onChange={ this.formHandler }
          />
          <Input
            type="text"
            name="complement"
            placeHolder="Complementos"
            value={ complement }
            onChange={ this.formHandler }
          />
        </fieldset>
        <br />
        <fieldset>
          <h3>Método de Pagamento</h3>
          <div>
            Boleto
            <label htmlFor="boleto">
              <input
                id="boleto"
                type="radio"
                name="payment"
                value="boleto"
                onChange={ this.formHandler }
              />
            </label>
          </div>
          <hr />
          <div>
            Cartão de Crédito:
            <br />
            <label htmlFor="american-express">
              <input
                id="american-express"
                type="radio"
                name="payment"
                value="american-express"
                onChange={ this.formHandler }
              />
              American Express
            </label>
            <label htmlFor="visa">
              <input
                id="visa"
                type="radio"
                name="payment"
                value="visa"
                onChange={ this.formHandler }
              />
              Visa
            </label>
            <label htmlFor="mastercard">
              <input
                id="mastercard"
                type="radio"
                name="payment"
                value="mastercard"
                onChange={ this.formHandler }
              />
              Mastercard
            </label>
          </div>
        </fieldset>
        <button
          type="button"
          value="Comprar"
          disabled={ !validForm }
          onClick={ this.clearState }
        >
          Comprar
        </button>
      </div>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  cpf: PropTypes.string,
  cep: PropTypes.string,
  phone: PropTypes.string,
  homeNumber: PropTypes.string,
  estate: PropTypes.string,
  city: PropTypes.string,
  complement: PropTypes.string,
}.isRequired;

export default Form;

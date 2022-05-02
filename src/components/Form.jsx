import React, { Component } from 'react';
import Input from './Input';
import PropTypes from 'prop-types';
import Util from '../utils/util';

class Form extends Component {
  render() {
    const { state: { name, email, address, cpf, cep, phone, homeNumber, estate, city, complement } } = this.props;
    return (
      <div>
        <fieldset>
          <h3>Informações do Comprador</h3>
          <Input
            type="text"
            name="full-name"
            placeHolder="Nome Completo"
            value={ name }
            onChange={ Util.formHandler }
            data-testid="checkout-fullname"
          />
          <Input
            type="text"
            name="emai"
            placeHolder="Email"
            value={ email }
            onChange={ this.formHandler }
            data-testid="checkout-email"
          />
          <Input
            type="text"
            name="address"
            placeHolder="Endereço"
            value={ address }
            onChange={ this.formHandler }
            data-testid="checkout-address"
          />
          <Input
            type="text"
            name="cpf"
            placeHolder="CPF"
            value={ cpf }
            onChange={ this.formHandler }
            data-testid="checkout-cpf"
          />
          <Input
            type="text"
            name="cep"
            placeHolder="CEP"
            value={ cep }
            onChange={ this.formHandler }
            data-testid="checkout-cep"
          />
          <Input
            type="text"
            name="pheon-number"
            placeHolder="Telefone"
            value={ phone }
            onChange={ this.formHandler }
            data-testid="checkout-phone-number"
          />
          <Input
            type="text"
            name="house-number"
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
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  dataTestid: PropTypes.string,
}.isRequired;

export default Form;

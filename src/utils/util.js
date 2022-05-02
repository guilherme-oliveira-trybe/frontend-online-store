import React, { Component } from 'react';

export default class Util extends Component {
  formHandler = ({ target: { name, value } }) => {
    console.log('teste util');
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
}

// export const formHandler = ({ target: { name, value } }) => {
//   console.log('teste util');
//   this.setState((prevState) => ({
//     reviewForm: {
//       ...prevState.reviewForm,
//       [name]: value,
//     },
//   }), () => this.validadeSubmission());
// };

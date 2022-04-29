import React, { Component } from 'react';

export default class ReviewForm extends Component {
  constructor() {
    super();

    this.state = {
      reviewForm: {
        email: '',
        rating: 1,
        review: '',
      },
      userReview: {},
      prevUserReview: [],
      validForm: false,
    };
  }

  componentDidMount() {
    this.getUserReview();
  }

  getUserReview = () => {
    if (!JSON.parse(localStorage.getItem('userReview'))) {
      localStorage.setItem('userReview', JSON.stringify([]));
    }
    const prevUserReview = JSON.parse(localStorage.getItem('userReview'));
    this.setState({
      prevUserReview,
    });
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
      reviewForm: {
        email,
        rating,
      },
    } = this.state;
    const errorCases = [
      !email.length,
      !rating.length,
    ];
    const validForm = errorCases
      .every((error) => error === false);
    this.setState({
      validForm,
    });
  }

  submitReview = () => {
    const { reviewForm } = this.state;
    const userReview = reviewForm;
    this.setState({
      userReview,
      reviewForm: {
        email: '',
        rating: 1,
        review: '',
      },
    }, () => {
      this.validadeSubmission();
      this.saveReview();
    });
  }

  saveReview = () => {
    const { userReview, prevUserReview } = this.state;
    localStorage.setItem('userReview', JSON.stringify([...prevUserReview, userReview]));
  }

  render() {
    const {
      reviewForm: {
        email,
        review,
      },
      userReview,
      prevUserReview,
      validForm,
    } = this.state;
    return (
      <div>
        <form>
          <fieldset>
            <legend>Avalie seu produto</legend>
            <fieldset>
              <legend>Email</legend>
              <input
                type="text"
                name="email"
                placeholder="Obrigatório"
                value={ email }
                onChange={ this.formHandler }
                data-testid="product-detail-email"
              />
            </fieldset>
            <fieldset>
              <legend>Que nota você dá para este produto?</legend>
              <input
                type="radio"
                name="rating"
                id="1-rating"
                value="1"
                onChange={ this.formHandler }
                data-testid="1-rating"
              />
              <input
                type="radio"
                name="rating"
                id="2-rating"
                value="2"
                onChange={ this.formHandler }
                data-testid="2-rating"
              />
              <input
                type="radio"
                name="rating"
                id="3-rating"
                value="3"
                onChange={ this.formHandler }
                data-testid="3-rating"
              />
              <input
                type="radio"
                name="rating"
                id="4-rating"
                value="4"
                onChange={ this.formHandler }
                data-testid="4-rating"
              />
              <input
                type="radio"
                name="rating"
                id="5-rating"
                value="5"
                onChange={ this.formHandler }
                data-testid="5-rating"
              />
            </fieldset>
            <fieldset>
              <legend>Escreva uma avaliação</legend>
              <input
                type="text"
                name="review"
                placeholder="Opcional"
                value={ review }
                onChange={ this.formHandler }
                data-testid="product-detail-evaluation"
              />
            </fieldset>
            <input
              type="button"
              value="Avaliar"
              disabled={ !validForm }
              data-testid="submit-review-btn"
              onClick={ this.submitReview }
            />
          </fieldset>
        </form>
        <div className="user-curr-review">
          { !!Object.entries(userReview).length
          && (
            <>
              <span>{`${userReview.email} `}</span>
              <span>{`${userReview.rating} ESTRELAS`}</span>
              <p>{userReview.review}</p>
            </>
          )}
        </div>
        { prevUserReview
          && (
            <div className="user-reviews">
              {
                prevUserReview
                  .map((reviewer, index) => (
                    <div key={ index }>
                      <span>{`${reviewer.email} `}</span>
                      <span>{`${reviewer.rating} ESTRELAS`}</span>
                      <p>{reviewer.review}</p>
                    </div>
                  ))
              }
            </div>
          ) }
      </div>
    );
  }
}

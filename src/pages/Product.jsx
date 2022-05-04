import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { itemDetails } from '../services/api';
import Loading from '../components/Loading';
import ReviewForm from '../components/ReviewForm';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: '',
      productDetails: [],
      productAttributes: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    await this.getProductId();
    await this.fetchItemDetails();
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    JSON.parse(localStorage.getItem('cartItems'));
  }

  getProductId = async () => {
    const { match: { params: product } } = this.props;
    const productId = product.id;
    this.setState({
      productId,
    });
  }

  fetchItemDetails = async () => {
    const { productId } = this.state;
    this.setState(
      ({
        loading: true,
      }), async () => {
        const productDetails = await itemDetails(productId);
        this.setState({
          loading: false,
          productDetails,
        }, () => this.getItemAttributes());
      },
    );
  }

  getItemAttributes = () => {
    const { productDetails } = this.state;
    const productAttributes = productDetails.attributes;
    // console.log(productDetails.shipping.free_shipping);
    this.setState({
      productAttributes,
    });
  }

  render() {
    const { numOfCartItems, sendToCart } = this.props;
    const {
      loading,
      productDetails: {
        condition,
        price,
        title,
        thumbnail,
        shipping,
      },
      productDetails,
      productAttributes,
    } = this.state;
    let result = false;
    if (shipping) {
      result = shipping.free_shipping;
    }

    return (
      <section>
        <nav>
          <Link to="/cart" data-testid="shopping-cart-button">
            <button
              type="button"
              value="Carrinho"
            >
              Seu carrinho
              {' '}
              <i className="fa fa-shopping-cart" />
              <span data-testid="shopping-cart-size">
                {numOfCartItems}
              </span>
            </button>
          </Link>
        </nav>
        { loading
          ? <Loading /> : (
            <>
              <div className="product-images">
                <img
                  src={ thumbnail }
                  alt={ title }
                />
              </div>
              <div className="product-card">
                { condition === 'new' ? <p>Novo</p> : <p>Usado</p> }
                <h1 data-testid="product-detail-name">{title}</h1>
                <p>{`R$ ${price}`}</p>
                { result && <p data-testid="free-shipping"> Frete Grátis </p> }
                <input
                  data-testid="product-detail-add-to-cart"
                  type="button"
                  value="Adicionar ao carrinho"
                  onClick={ () => sendToCart(productDetails) }
                />
              </div>
              <div className="product-description">
                <h2>Detalhes do Produto</h2>
                <div>
                  {
                    productAttributes
                      .map((attr) => (
                        <div key={ attr.name }>
                          <span>{`${attr.name}: `}</span>
                          <span>{attr.value_name}</span>
                        </div>
                      ))
                  }
                </div>
              </div>
              <ReviewForm />
            </>
          ) }
      </section>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  numOfCartItems: PropTypes.number,
  sendToCart: PropTypes.func,
}.isRequired;

export default Product;

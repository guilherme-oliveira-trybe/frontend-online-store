import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { itemDetails } from '../services/api';
import Loading from '../components/Loading';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: '',
      productDetails: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    await this.getProductId();
    await this.fetchItemDetails();
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
        });
      },
    );
  }

  render() {
    const {
      loading,
      productDetails: {
        condition,
        price,
        title,
        thumbnail,
      },
    } = this.state;
    return (
      <section>
        <div>
          <nav>
            <Link
              to="/"
            >
              Voltar
            </Link>
            <Link
              to="/cart"
            >
              Carrinho
            </Link>
          </nav>
        </div>
        <div>
          <img
            src={ thumbnail }
            alt={ title }
          />
        </div>
        { loading
          ? <Loading /> : (
            <div>
              { condition === 'new' ? <p>Novo</p> : <p>Usado</p> }
              <h1 data-testid="product-detail-name">{title}</h1>
              <p>{`R$ ${price}`}</p>
            </div>
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
}.isRequired;

export default Product;

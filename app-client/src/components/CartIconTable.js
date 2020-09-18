import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchCartByUser, deleteProductCart } from "../actions/cart";

class CartIconTable extends Component {
  
  componentDidMount() {
    const { loggedUserId } = this.props;
    if (loggedUserId) {
      this.props.fetchCartByUser(loggedUserId);
    }
  }

  render() {
    // console.log("CartIconTable", this.props);
    const { products } = this.props;

    return (
      <React.Fragment>
        {products.length > 0 ? (
          products.map((product, idx) => (
            <div className="cart-item" key={idx}>
              <div className="flex" style={{ padding: 8, width: "100%" }}>
                <img src={product.image} alt={product.title} width={40} />
                <div className="item-with-price">
                  <span className="block ml-2 text-xs">{product.title}</span>
                  <span className="block ml-2 text-left text-sm">
                    ${product.price} &times; {product.quantity}
                  </span>
                </div>
              </div>
              <div className="px-2 text-right border-b mb-1">
                <button
                  onClick={() => this.props.deleteProductCart(product._id)}
                  className="text-red-400 hover:text-red-500 underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm py-5">No Products Yet</p>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.cart.items, 
    loggedUserId: state.auth._id,
  };
}

export default connect(mapStateToProps, { fetchCartByUser, deleteProductCart })(
  CartIconTable
);

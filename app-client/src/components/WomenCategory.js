import React, { Component } from "react";
import { connect } from "react-redux";
import { IonSpinner } from "@ionic/react";

import ShopItem from "./shop/ShopItem";
import { fetchProductsByCategory } from "../actions/product";

class WomenCategory extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { category } = this.props;

    setTimeout(() => {
      if (category) {
        this.props.fetchProductsByCategory(category);
      }
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    const { products } = this.props;

    return (
      <div className="container mx-auto bg-white pb-8">
        <div className="p-5">
          <h1 className="text-center uppercase font-bold text-xl tracking-wide">
            For Her
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 px-6 pt-5">
          {this.state.isLoading ? (
            <div>
              <IonSpinner name="bubbles" /> Fetching products...
            </div>
          ) : (
            products.map((product, idx) => (
              <ShopItem key={idx} product={product} />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // const path = ownProps.match.path;
  // const pathStripped = path.replace(/\//g, "");
  return {
    products: state.product.items,
    category: "women",
  };
};

export default connect(mapStateToProps, { fetchProductsByCategory })(
  WomenCategory
);

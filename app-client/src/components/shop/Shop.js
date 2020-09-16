import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IonSpinner } from "@ionic/react";

import ShopItem from "./ShopItem";
import { fetchProducts } from "../../actions/product";

import forMen from "../../images/men.png";
import forWomen from "../../images/women.png";
import forGadget from "../../images/gadgets.png";

class Shop extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchProducts();
      this.setState({ isLoading: false });
    }, 2000);
  }

  renderProducts(products) {
    if (products.length === 0) {
      return (
        <div className="text-center">
          <IonSpinner name="bubbles" /> Fetching products...
        </div>
      );
    } else {
      return products.map((product, idx) => (
        <ShopItem product={product} key={idx} />
      ));
    }
  }

  render() {
    const { products } = this.props;

    return (
      <>
        <div className="bg-white container lg:w-full mx-auto categories">
          <h1 className="text-center text-2xl md:text-left md:text-base">
            Categories
          </h1>
        </div>
        <div className="bg-white container lg:w-full mb-5 mx-auto flex-none md:flex pb-10 px-4">
          {!this.state.isLoading ? (
            <div style={{ height: 100, paddingRight: 20 }} className="mb-5">
              <Link to="/shop/women">
                <div
                  style={{ backgroundImage: `url(${forWomen})` }}
                  className="category-bg"
                ></div>
                <div className="category-title bg-white text-center md:text-left">
                  <h1>Women's Apparel</h1>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full md:w-24 h-24">
              <IonSpinner name="bubbles" />
            </div>
          )}

          {!this.state.isLoading ? (
            <div style={{ height: 100, paddingRight: 20 }} className="mb-5">
              <Link to="/shop/men">
                <div
                  style={{ backgroundImage: `url(${forMen})` }}
                  className="category-bg"
                ></div>
                <div className="category-title bg-white text-center md:text-left">
                  <h1>Men's Apparel</h1>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full md:w-24 h-24">
              <IonSpinner name="bubbles" />
            </div>
          )}

          {!this.state.isLoading ? (
            <div style={{ height: 100, paddingRight: 20 }} className="mb-5">
              <Link to="/shop/gadgets">
                <div
                  style={{ backgroundImage: `url(${forGadget})` }}
                  className="category-bg"
                ></div>
                <div className="category-title bg-white text-center md:text-left">
                  <h1>Mobiles &amp; Gadgets</h1>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full md:w-24 h-24">
              <IonSpinner name="bubbles" />
            </div>
          )}
        </div>
        <div className="container mx-auto lg:w-full bg-white pb-8">
          <div className="p-5">
            <h1 className="text-center uppercase font-bold text-xl tracking-wide">
              Shop All
            </h1>
          </div>
          <div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-4 sm:px-5 pt-0 md:pt-5 mx-6 md:mx-0">
            {this.renderProducts(products)}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.items || [],
});

export default connect(mapStateToProps, { fetchProducts })(Shop);

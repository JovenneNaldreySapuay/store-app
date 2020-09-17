import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CardElement } from "@stripe/react-stripe-js";

import InlineError from "../InlineError";
import CardInput from "./CardInput";

import { fetchCartByUser } from "../../actions/cart";
import { addCheckoutProduct } from "../../actions/checkout";
import computeTotal from "../../utils/computeTotal";

class CheckoutPage extends Component {
  state = {
    message: "",
    shipping_option: "",
    payment_method: "",
    email: "",
    isProcessing: false,
    redirect: false,
    errors: {},
  };

  handlePaypalCheckout = async (e) => {
    e.preventDefault();
  };

  handleCODCheckout = (e) => {
    e.preventDefault();
  };

  handleStripeCheckout = async (e) => {
    e.preventDefault();

    const { userid, products, shipping_fee, stripe, elements } = this.props;

    const { message, shipping_option, payment_method, email } = this.state;

    let subtotal = 0;

    subtotal = computeTotal(products);

    const total = subtotal + shipping_fee;

    let qtyArray = [];
    let totalQty = 0;

    products.forEach((item) => {
      qtyArray.push(item.quantity);
      totalQty = qtyArray.reduce((a, b) => a + b, 0);
      return totalQty;
    });

    const errors = this.validate(this.state);
    console.log("errors", errors);

    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0;

    // stripe not loaded... yet
    if (!stripe || !elements) {
      return;
    }

    // if no errors, proceed...
    if (isValid) {
      const checkoutProduct = {
        products: products,
        shipping_option: shipping_option,
        payment_method: payment_method,
        message: message,
        shipping_fee: shipping_fee,
        quantity: totalQty,
        total: total,
        userid: userid,
        email: email,
      };

      // console.log("Checkout Data:", checkoutProduct);

      this.setState({ isProcessing: true });

      const response = await this.props.addCheckoutProduct(checkoutProduct);

      // console.log("Client Response", response);

      const clientSecret = response.data["client_secret"];

      // console.log("clientSecret", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        },
      });

      // console.log("confirmCardPayment result:", result);

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);

        this.setState({ isProcessing: false });
        this.setState({ redirect: false });

      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          console.log('Money is in the bank!');
          this.setState({ redirect: true });
        }
      }
    }
  };

  componentDidMount() {
    const { _id } = this.props.user;
    this.props.fetchCartByUser(_id);
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = (values) => {
    const errors = {};

    const { shipping_option, payment_method, email } = this.state;

    if (!shipping_option) errors.shipping_option = "Please select shipping option";
    if (!payment_method) errors.payment_method = "Please select payment method";
    if (!email) errors.email = "Please enter an email";

    return errors;
  };

  render() {
    const { products, user, shipping_fee } = this.props;

    const { errors } = this.state;

    const subTotal = computeTotal(products);

    const total = subTotal + shipping_fee;

    const fullAddress = `${user.address}, ${user.city}, ${user.province}, ${user.country}, ${user.zipcode}`;

    // console.log("CheckoutPage", this.props);

    return (
      <div className="container mx-auto bg-white pt-3">
        <div className="p-5 mt-2">
          <h1 className="text-center uppercase font-bold text-xl tracking-wide">
            Checkout
          </h1>
        </div>

        {products.length > 0 ? (
          <div className="w-11/12 mx-auto">
            <div className="delivery-address p-3 my-3 bg-blue-100 mb-5">
              <h2 className="text-black pb-2 font-semibold">
                Delivery Address
              </h2>
              <p>
                <span className="font-semibold">
                  {user.fullName} ({user.phone}){" "}
                </span>
                <span className="text-gray-700">{fullAddress}</span>
              </p>
            </div>

            <h1 className="text-center mb-2 font-semibold text-xl tracking-wide">
              Products Ordered
            </h1>

            <table
              border="1"
              className="checkout-table border w-full mt-3 mb-2 hidden md:table"
            >
              <thead>
                <tr>
                  <th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide"></th>
                  <th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide">
                    Item Name
                  </th>
                  <th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide">
                    Unit Price
                  </th>
                  <th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide">
                    Quantity
                  </th>
                  <th className="p-2 text-xs text-gray-900 uppercase font-bold tracking-wide">
                    Item Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="p-1 border">
                        <img
                          className="border border-grey-200 m-auto"
                          title={item.title}
                          src={item.image}
                          alt={item.title}
                          width={50}
                        />
                      </td>
                      <td className="p-1 border text-center">{item.title}</td>
                      <td className="p-1 border text-center">${item.price}</td>
                      <td className="p-1 border text-center">
                        {item.quantity}
                      </td>
                      <td className="p-1 border text-center">${item.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="block md:hidden border p-2 mb-3 rounded">
              {products.map((item, idx) => {
                return (
                  <div key={idx} className="mb-2">
                    <img
                      className="border"
                      src={item.image}
                      alt={item.title}
                      width={100}
                    />
                    <p>
                      <span className="font-semibold text-gray-600">
                        Item Name:
                      </span>{" "}
                      {item.title}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">
                        Unit Price:
                      </span>{" "}
                      ${item.price}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">
                        Quantity:
                      </span>{" "}
                      {item.quantity}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <div className="border border-grey-200 mb-6 w-full lg:w-6/12 px-3 py-4 rounded">
                <div className="leave-message pb-2">
                  <p className="font-semibold">Leave a message:</p>
                  <input
                    className="border p-2 w-full"
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Your message..."
                    onChange={this.handleOnChange}
                  />
                </div>

                <div
                  onChange={this.handleOnChange}
                  className="shipping-option py-2"
                >
                  <p className="font-semibold">Shipping Option:</p>
                  <p>
                    <input
                      type="radio"
                      id="std"
                      defaultChecked
                      name="shipping_option"
                      value="Standard Delivery"
                    />
                    <label htmlFor="std">&nbsp;Standard Delivery</label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="ninjavan"
                      name="shipping_option"
                      value="Ninja Van"
                    />
                    <label htmlFor="ninjavan">&nbsp;Ninja Van</label>
                  </p>
                  {errors.shipping_option && (
                    <InlineError text={errors.shipping_option} />
                  )}
                </div>

                <div
                  onChange={this.handleOnChange}
                  className="payment-method py-2"
                >
                  <p className="font-semibold">Payment Method:</p>
                  <p className="hidden">
                    <input
                      type="radio"
                      disabled
                      id="cod"
                      name="payment_method"
                      value="COD"
                    />
                    <label htmlFor="cod">&nbsp;COD</label>{" "}
                    <span className="text-gray-400 italic ml-2 text-xs">
                      Coming soon...
                    </span>
                  </p>
                  <p className="hidden">
                    <input
                      type="radio"
                      disabled
                      id="paypal"
                      name="payment_method"
                      value="PayPal"
                    />
                    <label htmlFor="paypal">&nbsp;PayPal</label>{" "}
                    <span className="text-gray-400 italic ml-2 text-xs">
                      Coming soon...
                    </span>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="credit"
                      name="payment_method"
                      value="Credit Card"
                    />
                    <label htmlFor="credit">&nbsp;Credit Card</label>
                  </p>
                  {errors.payment_method && (
                    <InlineError text={errors.payment_method} />
                  )}
                </div>

                <div className="payment-summary py-2">
                  <p>
                    Merchandise Subtotal:{" "}
                    <span className="font-semibold">${subTotal}</span>
                  </p>
                  <p>
                    Shipping Total:{" "}
                    <span className="font-semibold">
                      ${this.props.shipping_fee}
                    </span>
                  </p>
                  <p className="total-payable mb-4">
                    Total Payment:{" "}
                    <span className="font-semibold">${total}</span>
                  </p>
                </div>

                {this.state.payment_method === "Credit Card" && (
                  <div className="stripe-section bg-gray-200 p-3">
                    <label
                      htmlFor="email"
                      className="text-gray-500 font-semibold"
                    >
                      Email:&nbsp;
                    </label>
                    <input
                      className="border p-2"
                      type="text"
                      name="email"
                      id="email"
                      value="demoemail@shopeeh.com"
                      placeholder="Email address"
                      onChange={this.handleOnChange}
                    />
                    {errors.email && <InlineError text={errors.email} />}

                    <label
                      htmlFor="credit"
                      className="text-gray-500 font-semibold"
                    >
                      Credit Card:&nbsp;
                    </label>
                    <CardInput />

                    <div className="demo-card mt-1">
                      <h2 className="font-semibold text-gray-700">
                        Use this test credit card info:
                      </h2>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Card number:
                        </span>{" "}
                        4242 4242 4242 4242
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          MM / YY:
                        </span>{" "}
                        12 / 23
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          CVC:
                        </span>{" "}
                        381
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          ZIP:
                        </span>{" "}
                        22222
                      </p>
                    </div>
                    <div className="payment-cta mt-1 mb-3 flex justify-end">
                      <button
                        onClick={this.handleStripeCheckout}
                        className="btn mt-3"
                      >
                        {this.state.isProcessing
                          ? "Processing..."
                          : "Checkout with Stripe"}
                      </button>
                    </div>
                  </div>
                )}

                {this.state.redirect && <Redirect to="/success" />}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-center mb-2">No products to checkout</h1>
            <p className="text-center">
              <Link to="/">
                <button className="btn">Shop Now</button>
              </Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.cart.items,
    userid: state.auth._id,
    user: state.auth,
    shipping_fee: 5,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCheckoutProduct: addCheckoutProduct,
      fetchCartByUser: fetchCartByUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);

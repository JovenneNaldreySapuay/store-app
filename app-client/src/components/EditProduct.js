import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import InlineError from "./InlineError";

import { fetchSingleProduct, updateProduct } from "../actions/product";

class EditProduct extends Component {
  state = {
    data: {
      _id: "",
      title: "",
      description: "",
      slug: "",
      price: "",
      category: "",
      stock: "",
    },
    loading: false,
    redirect: false,
    errors: {},
  };

  componentDidMount() {
    const { productId } = this.props;

    if (productId) {
      this.props.fetchSingleProduct(productId);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.product._id !== state.data._id) {
      const {
        _id,
        title,
        description,
        slug,
        price,
        category,
        stock,
      } = props.product;

      return {
        data: {
          _id,
          title,
          description,
          slug,
          price,
          category,
          stock,
        },
      };
    }

    return null;
  }

  handleOnSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    const isValid = Object.keys(errors).length === 0;

    this.setState({ errors });

    const { data } = this.state;

    if (isValid) {
      // console.log("Updated Product:", data);

      this.props.updateProduct(data);

      this.setState({
        loading: true,
        redirect: true,
      });
    }
  };

  handleOnChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];

      this.setState({
        errors,
        data: {
          ...this.state.data,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      this.setState({
        data: {
          ...this.state.data,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  validate = (values) => {
    const errors = {};

    const {
      title,
      description,
      slug,
      price,
      category,
      stock,
    } = this.state.data;

    if (!title) errors.title = "Can't be blank";
    if (!description) errors.description = "Can't be blank";
    if (!slug) errors.slug = "Can't be blank";
    if (!price) errors.price = "Can't be blank";
    if (!category) errors.category = "Can't be blank";
    if (!stock) errors.stock = "Can't be blank";

    return errors;
  };

  render() {
    const {
      errors,
      loading,
      redirect,
      data: { title, description, slug, price, category, stock },
    } = this.state;

    const { product } = this.props;

    if (!product) {
      return <div>Loading...</div>;
    }

    console.log(this.props);

    return (
      <React.Fragment>
        <div className="bg-white md:w-6/12 mx-auto w-11/12">
          <div className="p-4 text-sm text-gray-800">
            <h1 className="text-4xl text-gray-700 font-bold leading-none mb-8">
              Edit Product
            </h1>

            <div>
              <Form onSubmit={this.handleOnSubmit} loading={loading}>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title" className="text-gray-600 pb-1 block">
                    Title
                  </label>
                  <input
                    className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    type="text"
                    name="title"
                    id="title"
                    value={title || ""}
                    onChange={this.handleOnChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.description}>
                  <label
                    htmlFor="description"
                    className="text-gray-600 pb-1 block"
                  >
                    Description
                  </label>
                  <textarea
                    className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    name="description"
                    id="description"
                    value={description || ""}
                    rows="10"
                    cols="30"
                    onChange={this.handleOnChange}
                  ></textarea>
                  {errors.description && (
                    <InlineError text={errors.description} />
                  )}
                </Form.Field>

                <Form.Field error={!!errors.slug}>
                  <label htmlFor="slug" className="text-gray-600 pb-1 block">
                    Slug
                  </label>
                  <input
                    className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    type="text"
                    name="slug"
                    id="slug"
                    value={slug || ""}
                    onChange={this.handleOnChange}
                  />
                  {errors.slug && <InlineError text={errors.slug} />}
                </Form.Field>

                <Form.Field error={!!errors.price}>
                  <label htmlFor="price" className="text-gray-600 pb-1 block">
                    Price
                  </label>
                  <input
                    className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    type="text"
                    name="price"
                    id="price"
                    value={price || ""}
                    onChange={this.handleOnChange}
                  />
                  {errors.price && <InlineError text={errors.price} />}
                </Form.Field>

                <Form.Field error={!!errors.category}>
                  <label
                    htmlFor="category"
                    className="text-gray-600 pb-1 block"
                  >
                    Category
                  </label>
                  <input
                    className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    type="text"
                    name="category"
                    id="category"
                    value={category || ""}
                    onChange={this.handleOnChange}
                  />
                  {errors.category && <InlineError text={errors.category} />}
                </Form.Field>

                <Form.Field error={!!errors.stock}>
                  <label htmlFor="stock" className="text-gray-600 pb-1 block">
                    Stock
                  </label>
                  <input
                    className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    type="text"
                    name="stock"
                    id="stock"
                    value={stock || ""}
                    onChange={this.handleOnChange}
                  />
                  {errors.stock && <InlineError text={errors.stock} />}
                </Form.Field>

                <button
                  disabled={this.props.user.role === "admin_demo"}
                  className="bg-blue-500 inline-block w-32 text-white p-2 rounded mt-3 text-center"
                >
                  Save Changes
                </button>

                <Link
                  to="/admin/products"
                  className="bg-transparent border border-gray-700 inline-block w-16 text-gray-700 p-2 rounded ml-2 mt-3 text-center"
                >
                  Cancel
                </Link>
              </Form>
              {redirect && <Redirect to="/admin/products" />}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { _id } = ownProps.match.params;

  return {
    productId: _id,
    product: state.product.item,
    user: state.auth,
  };
};

export default connect(mapStateToProps, { fetchSingleProduct, updateProduct })(
  EditProduct
);

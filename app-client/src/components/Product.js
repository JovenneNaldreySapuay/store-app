import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Popup from './Popup';
import ProductReviews from './ProductReviews';
// import ProductCard from './ProductCard';

import { fetchSingleProduct } from '../actions/product';
import { addProductCart } from '../actions/cart';

class Product extends Component {
	state = {
		quantity: 1,
		isLogged: false,
		isShowPopup: false
	}

	componentDidMount() {
		// const { id, slug } = this.props;
		const { id } = this.props;
		if (id) {
			this.props.fetchSingleProduct(id);
		}
	}

	handleOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value 
		});
	}
	
	handleOnSubmit = (e) => {
		e.preventDefault();

		const { 
			title,
			slug, 
			image, 
			price,
			_id
		} = this.props.product;

		const { quantity } = this.state;
		
		const total = quantity * price;
		
		const product = { 
			title,
			slug, 
			image,
			price, 
			quantity, 
			total,
			_id
		};			
		
		// console.log("add to cart:", product);
		
		this.props.addProductCart(product);
		this.showPopup();
  	}	

  	showPopup = () => {
		this.setState({
		  isShowPopup: true
		}, () => { setTimeout(this.closePopup, 2000) });
	}

	closePopup = () => {
		this.setState({
		  isShowPopup: false
		});
	}

	randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1))
	}

	render() {
		// console.log("Single Product:", this.props);
		
		const { product, isAuthenticated } = this.props;
				
		return (
			<div className="p-3" style={{ width: 700, margin: '0 auto' }}>
				{(this.state.isShowPopup) && <Popup message="Item added to your cart" />}
					
				{(Object.keys(product).length === 0) ?
				<div>
					Loading... <i className="fa fa-refresh fa-spin"></i>
				</div> :
				<div>
				<div className="product-details border border-grey-100 p-2">
				<div>
					<img 
					className="border border-grey-100"
					src={product.image} alt={product.title} width={150} />
				</div>

				<div className="mb-5">
					<h2>{product.title}</h2>
					<p>Price: ${product.price}</p>
					<p>Ratings: {product.rating}</p>					
					<form onSubmit={this.handleOnSubmit}>
					<p><label htmlFor="quantity">Quantity:&nbsp;</label>
					<input 
						type="text" 
						id="quantity"
						name="quantity"
						style={{width: 40}}  
						className="border text-center"
						value={this.state.quantity}
						onChange={this.handleOnChange} 
						readOnly
					/>
					<button 
						className="border bg-gray-500 px-2" 
						> -
					</button>
					<button 
						className="border bg-gray-500 px-2" 
						> +
					</button>
					</p>
					
					<button 
					disabled={isAuthenticated ? false : true}
					className="bg-blue-500 text-white rounded p-2 mt-2"
					>Add to cart
					</button> {!isAuthenticated && <span>Please create an <Link className="underline text-blue-700" to="/signup">account</Link> or <Link className="underline text-blue-700" to="/login">login</Link> to buy this item</span>}

					</form>

					<p className="mt-3 text-grey-700">
					<i class="far fa-eye"></i> 
					{this.randomInt(3, 10)} people are currently looking at this product
					</p>
				</div>
				</div>

				<div className="description bg-green-100 p-3 border my-5">
					<h1>Product Description</h1>
					<p>{product.description}</p>
					<p>Stocks: {product.stock} available</p>
				</div>
				
				<ProductReviews productId={this.props.id} />
				</div>
				}
				
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {

	const { _id } = ownProps.match.params;

	return { 
		id: _id,
		product: state.product.item,
	    isAuthenticated: !!state.auth.token,
	};
}

export default connect(
	mapStateToProps, 
	{ addProductCart, fetchSingleProduct }
	)(Product);

import React, { Component } from 'react';
		
class CartForm extends Component {
		
	handleOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value 
		});
	}

	handleOnSubmit = (e) => {
		e.preventDefault();

		const { quantity } = this.state;
		
		this.props.saveCart(quantity);
	}

	render() {
		return (
			<form onSubmit={this.handleOnSubmit}>
				<p><label htmlFor="quantity">Quantity:&nbsp;</label>
					<input 
						type="text" 
						id="quantity"
						name="quantity"  
						className="border text-center"
						value={this.state.quantity}
						onChange={this.handleOnChange} 
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
					className="bg-blue-500 hover:bg-blue-700 text-white rounded p-2 mt-2"
					>Add to cart
				</button>	
			</form>
		);
	}	
}

export default CartForm;
import React, { Component } from 'react';
import ShopItem from './ShopItem';
		
class ShopListings extends Component {
	state = {
        filterText: '',
    }

	render() {
		const rows = [];

		this.props.products.map((product, index) => {
			if (product.title.toLowerCase().indexOf(this.state.filterText.toLowerCase()) === -1) return null;

			return(
				rows.push(<ShopItem key={index} product={product} />)
			);
		});

		return (
			<div>
				{ rows }
			</div>
		);

	}
}

export default ShopListings;
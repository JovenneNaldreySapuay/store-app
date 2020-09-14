import React, {useState, useEffect, useMemo} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchProducts} from '../actions/product';

const Search = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { fetchProducts, location: { search } } = props;
    
    const queryString = search;
    const regex = /=(.+)/;
    const matched = queryString.match(regex);
    const cleanedStr = matched[1].replace(/%20/g, " ");
    
    useEffect(() => {
        const getData = () => {
            setLoading(true);
            
            fetchProducts().then(response => {
                setProducts(response.data);
                setLoading(false);
            })            
        };

        getData();

    }, [fetchProducts]);

    const foundItems = useMemo(() => {
        let computedProducts = products;

        if (cleanedStr) {
            computedProducts = computedProducts.filter(product => product.title.toLowerCase().includes(cleanedStr.toLowerCase()));
        }
    
        return computedProducts;

    }, [products, cleanedStr]);

    return (
        <div className="container mx-auto lg:w-full bg-white pb-8 h-screen"> 
            {!loading ? 
                foundItems.length > 0 ? 
                    <>
                    <h1 className="pt-5 font-semibold px-5">Search Result(s)</h1>
                    <div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-4 sm:px-5 pt-5">
                    {foundItems.map((item, idx) => {
                        return (
                            <Link to={`/shop/${item.slug}/${item._id}`} key={idx}>
                            <div className="product product--bg">
                                <div className="image-wrapper">
                                    <img className="product__image product__border" src={item.image} alt={item.title} width={100} height={190} />
                                </div>
                                <div className="px-2 py-0">
                                    <h2>{item.title}</h2>
                                    <p>${item.price}</p>

                                    {item.stock < 1 ?
                                        <p className="product--nostock">Out of stocks</p> :
                                        <p className="product--instock">{item.stock} {item.stock === 1 ? 'stock' : 'stocks'} available</p>
                                    }
                                </div>	
                            </div>
                            </Link>
                        )
                    })} 
                    </div>
                    </>
                : <div className="px-5 pt-5 text-center">We couldn't find a <span style={{fontWeight:'bold'}}>{cleanedStr}</span> for sale. Try another search.</div>
            : <div>Loading items... <i className="fa fa-refresh fa-spin"></i></div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
		products: state.product.items || [],	
	};
}

export default connect(mapStateToProps, { fetchProducts })(Search);
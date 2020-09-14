import React from "react";
import {Link, useLocation} from "react-router-dom";
import { connect } from 'react-redux';
import * as auth from '../actions/auth';

import SearchInput from './SearchInput';
import CartIconTable from './CartIconTable';
import { searchProducts } from '../actions/product';

const TestComponent = (props) => {
    let location = useLocation();
    
    const getFirstName = () => {
        let fullName = props.user.fullName;
        const fname = fullName.replace(/ .*/,'');
        return fname;
    }

    console.log("TestComponent", location);

    // if (location.pathname === '/cart') {
    //     return null;
    // }

    return (
        <header id="header"> 
                <div className="p-3" style={{ background: "linear-gradient(-180deg,#f53d2d,#f63)" }}> 
                    <div className="m-auto w-4/5">
                        <div className="flex justify-between">
                        <div className="follow text-gray-200"><p>Follow us on <a href="https://www.instagram.com/shopee_ph/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a></p></div>
                        <div className="dropdown inline-block relative">
                        <button className="text-gray-700 font-semibold inline-flex items-center">
                        <span className="mr-1 text-gray-100">{getFirstName()}</span>
                        <svg 
                        className="text-gray-100 h-4 w-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> 
                        </svg>
                        </button>
                        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-10">
                        {props.user.role === "admin" &&
                            <li><Link to="/admin" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Admin</Link></li>
                        }
                        <li><Link to="/account" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">My Account</Link></li>
                        <li><Link to="/account/my-purchase" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">My Purchase</Link></li>
                        <li><Link to="/account/notifications" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Notifications</Link></li>      
                        <li><button 
                        className="bg-red-500 hover:bg-red-300 text-white w-full py-1 px-2"
                        onClick="">
                        Logout
                        </button></li>
                        </ul>
                        </div>
                        </div>
                    </div>
                    <div className="logo-section mt-2 py-3">
                        <div className="m-auto w-4/5">
                            <div className="flex justify-between">
                                <Link className="text-white font-semibold" to="/">Shopeeh</Link>
                                
                                <div className="dropdown inline-block relative">
                                <button className="text-gray-700 font-semibold inline-flex items-center">
                                <span className="mr-1 text-gray-100">Cart</span>
                                </button>
                                <div className="dropdown-menu absolute hidden text-gray-700 pt-1">
                                <CartIconTable />
                                </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                </div>
                {/* Make this a Component */}  
                {(location.pathname !== '/cart') &&
                <div className="products-category bg-gray-300 p-3">
                    <h3 className="text-center uppercase text-white font-bold tracking-wide">Categories</h3>
                    <nav className="app-nav">
                        <ul className="flex justify-center">
                            <li className="inline-block p-3"><Link className="hover:underline" to="/">All</Link></li>
                            <li className="inline-block p-3"><Link className="hover:underline" to="/shop/women">Women's Apparel</Link></li>
                            <li className="inline-block p-3"><Link className="hover:underline" to="/shop/men">Men's Apparel</Link></li>
                            <li className="inline-block p-3"><Link className="hover:underline" to="/shop/gadgets">Gadgets</Link></li>
                        </ul>
                    </nav>
                    <div className="m-auto w-64">
                        <SearchInput 
                            handleOnChange=""
                            handleOnSubmit=""
                        />
                    </div>
                </div>
                }                
            </header>
    )
}

const mapStateToProps = (state) => {
    return { 
      isAuthenticated: !!state.auth.token,
      user: state.auth
    };
  }
  
  export default connect(mapStateToProps, { logout: auth.logout, searchProducts })(TestComponent);
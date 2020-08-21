import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as auth from '../actions/auth';

import SearchInput from './SearchInput';
import { searchProducts } from '../actions/product';

class Header extends Component {
    
    state = {
        q: '',
    }
 
    setQueryText = (e) => {
        this.setState({ q: e.target.value })
    }
  
    runSearch = (e) => {
        e.preventDefault();

        const { q } = this.state;

        if (! q) return;
      
        this.props.searchProducts(q)

        console.log(`Searching for ${q} in our Database...`);

        this.setState({ q: '' })
    }

    getFirstName() {
        let fullName = this.props.user.fullName;
        const fname = fullName.replace(/ .*/,'');
        return fname;
    }

    renderNav() {
    switch(this.props.isAuthenticated) {
        case null: 
            return;
        case false: 
            return (
                <header id="header"> 
                <div className="bg-red-400 p-3"> 
                    <div className="flex justify-between">
                        <div className="follow text-gray-200"><p>Follow us on Facebook | Instagram</p></div>
                        <div className="user">
                            <span className="underline text-gray-200">contact@shoppers.com</span>      
                        </div>
                    </div>
                    <div className="logo-section flex justify-between mt-2 py-3">
                        <Link className="text-white" to="/">Shopper's Ave.</Link>
                        
                        <div className="account">
                            <Link 
                                to="/signup" 
                                className="border border-white rounded px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-transparent focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out px-4"
                            >
                            Create Account
                            </Link>
                    
                            <Link 
                                to="/login" 
                                className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out ml-2 px-6"
                            >
                            Login
                            </Link>    
                        </div>
                    </div>
                    {/* Make this a Component */}
                    <h3 className="text-center uppercase">Categories</h3>
                    <nav className="app-nav">
                        <ul className="flex justify-center">
                            <li className="text-gray-200 inline-block p-3"><Link to="/shop">All</Link></li>
                            <li className="text-gray-200 inline-block p-3"><Link to="/shop/women">Women's Apparel</Link></li>
                            <li className="text-gray-200 inline-block p-3"><Link to="/shop/men">Men's Apparel</Link></li>
                            <li className="text-gray-200 inline-block p-3"><Link to="/shop/gadgets">Gadgets</Link></li>
                        </ul>
                    </nav>
                    <div className="m-auto w-64">
                        <SearchInput 
                            handleOnChange={this.setQueryText}
                            handleOnSubmit={this.runSearch}
                        />
                    </div>
                </div>
            </header>   
            )

        default: 
            return (
                <header id="header"> 
                <div className={this.props.isAuthenticated ? 'bg-blue-600 p-3' : 'bg-red-500 p-3'}> 
                    <div className="flex justify-between">
                        <div className="follow text-gray-200"><p>Follow us on Facebook | Instagram</p></div>
                        <div className="user">
                            <span className="underline text-gray-200">{this.getFirstName()}</span>        
                            <ul className="bg-gray-400 p-2">
                                {this.props.user.role === "admin" && 
                                <li className="mb-2 text-center"><Link 
                                className="text-red-400 hover:text-red-600 uppercase font-semibold underline"
                                to="/admin"
                                >
                                Admin Only
                                </Link></li> 
                                }
                                <li className="mb-2 text-center"><Link className="hover:underline hover:text-red-500" to="/account">My Account</Link></li>
                                <li className="mb-2 text-center"><Link className="hover:underline hover:text-red-500" to="/account/my-purchase">My Purchase</Link></li>
                                <li className="mb-2 text-center"><Link className="hover:underline hover:text-red-500" to="/account/notifications">Notifications</Link></li>
                                <li className="text-center">
                                <button 
                                    className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2" 
                                    onClick={() => this.props.logout()}>
                                Logout
                                </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="logo-section flex justify-between mt-2 py-3">
                        <Link className="text-white" to="/">Shopper's Ave.</Link>
                       
                        <div>
                            <Link 
                            className="text-gray-200 hover:underline uppercase"
                            to="/cart"
                            >
                            View Cart
                            </Link>
                        </div>

                    </div>
                </div>
                {/* Make this a Component */}
                <div className="products-category bg-gray-300 p-3">
                    <h3 className="text-center uppercase">Categories</h3>
                    <nav className="app-nav">
                        <ul className="flex justify-center">
                            <li className="inline-block p-3"><Link to="/shop">All</Link></li>
                            <li className="inline-block p-3"><Link to="/shop/women">Women's Apparel</Link></li>
                            <li className="inline-block p-3"><Link to="/shop/men">Men's Apparel</Link></li>
                            <li className="inline-block p-3"><Link to="/shop/gadgets">Gadgets</Link></li>
                        </ul>
                    </nav>
                    <div className="m-auto w-64">
                        <SearchInput 
                            handleOnChange={this.setQueryText}
                            handleOnSubmit={this.runSearch}
                        />
                    </div>

                </div>
            </header>
            )
    }
  }

  render() {
    
    return (
        <React.Fragment>
            {this.renderNav()}
        </React.Fragment>  
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    isAuthenticated: !!state.auth.token,
    user: state.auth
  };
}

export default connect(mapStateToProps, { logout: auth.logout, searchProducts })(Header);

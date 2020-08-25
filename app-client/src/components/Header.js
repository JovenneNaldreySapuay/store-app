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
                <div className="p-3" style={{ background: "linear-gradient(-180deg,#f53d2d,#f63)" }}> 
                    <div className="m-auto w-4/5">
                        <div className="flex justify-between">
                            <div className="follow text-gray-200"><p>Follow us on Facebook | Instagram</p></div>
                            <div className="user">
                                <span className="underline text-gray-200">contact@shopeeh.com</span>      
                            </div>
                        </div>
                        <div className="logo-section flex justify-between mt-2 py-3">
                            <Link className="text-white font-semibold" to="/">Shopeeh</Link>
                            
                            <div className="account">
                                <Link 
                                    to="/signup" 
                                    className="border border-white rounded px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-transparent focus:outline-none transition duration-150 ease-in-out px-4"
                                >
                                Create Account
                                </Link>
                        
                                <Link 
                                    to="/login" 
                                    className="px-3 py-2 rounded-md text-sm font-medium leading-5 bg-gray-200 focus:outline-none transition duration-150 ease-in-out ml-2 px-6"
                                >
                                Login
                                </Link>    
                            </div>
                        </div>
                    </div>
                    {/* Make this a Component */}
                    <h3 className="text-center uppercase text-white font-bold tracking-wide">Categories</h3>
                    <nav className="app-nav">
                        <ul className="flex justify-center">
                            <li className="text-gray-100 inline-block p-3"><Link className="hover:underline" to="/">All</Link></li>
                            <li className="text-gray-100 inline-block p-3"><Link className="hover:underline" to="/shop/women">Women's Apparel</Link></li>
                            <li className="text-gray-100 inline-block p-3"><Link className="hover:underline" to="/shop/men">Men's Apparel</Link></li>
                            <li className="text-gray-100 inline-block p-3"><Link className="hover:underline" to="/shop/gadgets">Gadgets</Link></li>
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
                <div className="p-3" style={{ background: "linear-gradient(-180deg,#f53d2d,#f63)" }}> 
                    <div className="m-auto w-4/5">
                        <div className="flex justify-between">
                        <div className="follow text-gray-100"><p>Follow us on Facebook | Instagram</p></div>

                        <div className="dropdown inline-block relative">
                        <button className="text-gray-700 font-semibold inline-flex items-center">
                        <span className="mr-1 text-gray-100">{this.getFirstName()}</span>
                        <svg 
                        className="text-gray-100 h-4 w-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> 
                        </svg>
                        </button>
                        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                        {this.props.user.role === "admin" &&
                            <li><Link to="/admin" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Admin</Link></li>
                        }
                        <li><Link to="/account" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">My Account</Link></li>
                        <li><Link to="/account/my-purchase" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">My Purchase</Link></li>
                        <li><Link to="/account/notifications" className="bg-gray-300 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Notifications</Link></li>      
                        <li><button 
                        className="bg-red-500 hover:bg-red-300 text-white w-full py-1 px-2"
                        onClick={() => this.props.logout()}>
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
                               
                                <div>
                                    <Link 
                                    className="text-gray-100 hover:underline uppercase"
                                    to="/cart"
                                    >
                                    View Cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Make this a Component */}                
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

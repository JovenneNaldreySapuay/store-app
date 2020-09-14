import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as auth from '../actions/auth';

import SearchInput from './SearchInput';
import CartIconTable from './CartIconTable';


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
        this.props.history.push('/search?keyword='+ q);

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
                            <div className="follow text-gray-200"><p>Follow us on <a href="https://www.instagram.com/shopee_ph/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a></p></div>
                            <div className="user">
                                <span className="underline text-gray-200">contact@shopeeh.com</span>      
                            </div>
                        </div>
                        <div className="logo-section flex justify-between items-center mt-2 py-2">
                            <Link className="text-white font-semibold" to="/">Shopee</Link>
                            
                            <div className="m-auto w-64">
                                <SearchInput 
                                    handleOnChange={this.setQueryText}
                                    handleOnSubmit={this.runSearch}
                                />
                            </div>

                            <div className="account">
                                <Link 
                                    to="/signup" 
                                    className="border border-white rounded px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-transparent focus:outline-none transition duration-150 ease-in-out"
                                >
                                Create Account
                                </Link>
                        
                                <Link 
                                    to="/login" 
                                    className="px-3 py-2 rounded-md text-sm font-medium leading-5 bg-gray-200 focus:outline-none transition duration-150 ease-in-out ml-2"
                                >
                                Login
                                </Link>    
                            </div>
                        </div>
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
                        <div className="follow text-gray-200"><p>Follow us on <a href="https://www.instagram.com/shopee_ph/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a></p></div>

                        <div className="dropdown inline-block relative">
                        <button className="text-gray-700 font-semibold inline-flex items-center">
                        <span className="mr-1 text-gray-100">{this.getFirstName()}</span>
                        <svg 
                        className="text-gray-100 h-4 w-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> 
                        </svg>
                        </button>
                        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-10">
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
                            <div className="flex justify-between items-center">
                                <Link className="text-white font-semibold" to="/">Shopee</Link>
                                
                                <div className="m-auto w-64">
                                    <SearchInput 
                                        handleOnChange={this.setQueryText}
                                        handleOnSubmit={this.runSearch}
                                    />
                                </div>

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

export default connect(mapStateToProps, { logout: auth.logout })(withRouter(Header));


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { isEmpty } from "../../validation/isEmpty"

import { withRouter, Link } from "react-router-dom";

import {searchProduct , getStore} from "../../actions/productActions";

export class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            searchBox: false
        }
    }
    UNSAFE_componentWillMount() {
        this.props.getStore();
    }
    openSearch(e)  {
        // this.setState({
        //     searchBox: !this.state.searchBox
        // })
    }
    searchProduct(e) {
        e.preventDefault();
        // e.stopPropagation();
        console.log("butP",e.target)
        const keyw = e.target.value;
        this.props.searchProduct(keyw);
        // this.props.history.push('/search/'+keyw);
        // return false;
    }
    render() {
        const activeStore = this.props.products.store_slug || 0;
        const stores = this.props.products.productStore;
        const cart = this.props.products.cartItems;
        // console.log(cart);
        var cartlength = 0;
        Object.values(cart).map(item => {
            cartlength+=item
        })


        const base_url = `${process.env.PUBLIC_URL}`;
        if(isEmpty(stores)) return (<React.Fragment></React.Fragment>)
        return (
            <React.Fragment>
                <header className="header-area clearfix">
                    <div className="nav-close">
                        <i className="fa fa-close" aria-hidden="true"></i>
                    </div>
                    <div className="logo">
                        <Link to="/">
                            {/* <img src="img/core-img/logo.png" alt="" /> */}
                            <h2>Clothen<span>tiK</span></h2>
                        </Link>
                    </div>
                    {/* {this.state.searchBox? */}
                    <div className="search_box">
                        <form >
                            <input type="text" name="search" className="search_val" placeholder="Search a Product" />
                            <button type="button" onSubmit={(e) => this.searchProduct(e)}><i className="fa fa-search"></i></button>
                        </form>
                    </div>
                     {/* :""} */}
                    <nav className="stp-nav">
                        <ul>
                            <li className={activeStore === "home"?"active":""}><Link to="/">Home</Link></li>
                            {stores.map((store,i) => {
                                return (
                            <li key={i} className={activeStore === store.StoreKey?"active":""}><Link to={"/"+store.StoreKey}>{store.StoreName}</Link></li>
                                )
                            })}
                            
                        </ul>
                    </nav>
                    
                    <div className="cart-fav-search mb-100">
                        <Link to="/cart" className="cart-nav"><img src={base_url+'/img/core-img/cart.png'} alt="" /> Cart <span>({cartlength})</span></Link>
                        {/* <Link to="#" className="fav-nav"><img src={base_url+"/img/core-img/favorites.png"} alt="" /> Favourite</Link> */}
                        <Link to="#" className={this.state.searchBox?"search-nav active":"search-nav"} onClick={(e) => this.openSearch(e)}><img src={base_url+"/img/core-img/search.png"} alt="" /> Search</Link>
                    </div>
                    <div className="social-info d-flex justify-content-between">
                        <Link to="#"><i className="fa fa-pinterest" aria-hidden="true"></i></Link>
                        <Link to="#"><i className="fa fa-instagram" aria-hidden="true"></i></Link>
                        <Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                        <Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = {
    getStore,searchProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

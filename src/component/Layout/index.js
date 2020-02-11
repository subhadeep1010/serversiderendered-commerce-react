import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Sidebar from '../Sidebar';
import Home from "../Home"
import Footer from '../Footer';
import Store from '../Store';
import Product from '../Product';
import Cart from '../Cart';
import Checkout from '../Checkout';
import Search from '../Search';


import jwt_decode from "jwt-decode";
import {loadCart,setCurrentStore} from "../../actions/productActions";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStore:null
          }
    } 
    callbackChild (data) {
        // if(this.props.match && this.props.match.params.class_id) {
            // console.log(data);
            // this.props.products.setCurrentStore(data);
          
        
        // console.log("dsadsa",this.state.activeClass);
        // console.log("found",this.props);
      }
    componentDidMount() {
        if (typeof window !== 'undefined') {
            if (window.localStorage['ecm:ct-im']) {
                const decode = jwt_decode(window.localStorage['ecm:ct-im']);
                delete decode["iat"];
                this.props.loadCart(decode);
            }
        }
        // console.log("hahah",Routes,renderRoutes(Routes));
    }
    render() {
        return (
            <>
                <div className="main-content-wrapper d-flex clearfix">
                    <Sidebar />
                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} /> } />
                        <Route exact path="/cart" render={(props) => <Cart {...props} /> } />
                        <Route exact path="/checkout" render={(props) => <Checkout {...props} /> } />
                        <Route exact path="/search/:search" render={(props) => <Search {...props} /> } />
                        <Route path="/:store/:category/:product" render={(props) => <Product {...props} /> } />
                        <Route path="/:store" render={(props) => <Store {...props} /> } />
                        
                    </Switch>
                    
                </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = {
    loadCart,setCurrentStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

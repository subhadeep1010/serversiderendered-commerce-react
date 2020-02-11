import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {getCartProductDetail,resetCartDetails} from "../../actions/productActions";
import { isEmpty } from '../../validation/isEmpty';
import { Link } from 'react-router-dom';

class Cart extends Component {
    UNSAFE_componentWillMount() {
        const props = this.props;
        const {cartItems} = props.products;
        const itemsC = Object.keys(cartItems).map(e => e.split("-")[1]);
        // console.log('cartP',itemsC);
        props.getCartProductDetail(itemsC);
    }
    componentDidUpdate(nextProps) {
        const props = this.props;
        const {cartItems,cartItemsDetails} = props.products;
        if(!isEmpty(cartItems) && cartItemsDetails.length == 0) {
            // Object.entries(cartItems).map(([key,q],i) => {
            //     props.getCartProductDetail(key);
            // });
            const itemsC = Object.keys(cartItems).map(e => e.split("-")[1]);
            // console.log('cartP',itemsC);
            props.getCartProductDetail(itemsC);
        }
    }
    componentWillUnmount() {
        this.props.resetCartDetails();
    }
    render() {
        const props = this.props;
        var totalAmount = 0;
        const {cartItems,cartItemsDetails} = props.products;
        console.log("nowassad",cartItems,cartItemsDetails);
        return (
            <React.Fragment>
                <div className="cart-table-area section-padding-100">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="cart-title mt-50">
                                    <h2>Shopping Cart</h2>
                                </div>

                                <div className="cart-table clearfix">
                                    <table className="table table-responsive">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItemsDetails.map((item,i) => {
                                                // const productD = props.getCartProductDetail(key);
                                                // if(isEmpty(productD)) return false;
                                                // else {
                                                // console.log("now",key,i,productD);
                                                totalAmount=totalAmount+(cartItems["pro-"+item.ProductID] * Number((item.ProductPrice).replace(",","")));
                                                return (
                                                    <tr key={i}>
                                                        <td className="cart_product_img">
                                                            <img src="img/bg-img/cart1.jpg" alt="Product"/>
                                                        </td>
                                                        <td className="cart_product_desc">
                                                            <h5>{item.ProductName}</h5>
                                                        </td>
                                                        <td className="price">
                                                            <span>Rs. {item.ProductPrice}</span>
                                                        </td>
                                                        <td className="qty">
                                                            <div className="qty-btn d-flex">
                                                                <p>Quatity</p>
                                                                <div className="quantity">
                                                                    {/* <span className="qty-minus" ><i className="fa fa-minus" aria-hidden="true"></i></span> */}
                                                                    <input type="number" disabled className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" defaultValue={cartItems["pro-"+item.ProductID]} />
                                                                    {/* <span className="qty-plus" ><i className="fa fa-plus" aria-hidden="true"></i></span> */}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                                // }   
                                            })}
                                            

                                            {isEmpty(cartItems)?<div className="mt-15 text-center"><h2>No Items in cart</h2></div>:""}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {!isEmpty(cartItems)?
                                <div className="col-12 col-lg-4">
                                    <div className="cart-summary">
                                        <h5>Cart Total</h5>
                                        <ul className="summary-table">
                                            <li><span>subtotal:</span> <span>Rs.{totalAmount}</span></li>
                                            <li><span>delivery:</span> <span>Free</span></li>
                                            <li><span>total:</span> <span>Rs. {totalAmount}</span></li>
                                        </ul>
                                        <div className="cart-btn mt-100">
                                            <Link to="/checkout" className="btn stp-btn w-100">Checkout</Link>
                                        </div>
                                    </div>
                                </div>
                            :""}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = {
    getCartProductDetail,resetCartDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

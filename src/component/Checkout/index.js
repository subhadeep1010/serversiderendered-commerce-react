import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {getCartProductDetail, resetCartDetails, placeOrder} from "../../actions/productActions";

import { isEmpty } from '../../validation/isEmpty';

export class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            checkoutInfo: {
                first_name: null,
                last_name: null,
                email: null,
                phone: null,
                address_1: null,
                address_2: null,
                pincode: null,
                city: null,
                state: null,
            },
            totalAmount: 0
        };
    }
    UNSAFE_componentWillMount() {
        const props = this.props;
        const {cartItems,cartItemsDetails} = props.products;
        const itemsC = Object.keys(cartItems).map(e => e.split("-")[1]);
        // console.log('cartP',itemsC);
        props.getCartProductDetail(itemsC);
        
        // if(isEmpty(cartItems)) props.history.push("/");
    }
    componentDidUpdate(nextProps) {
        const props = this.props;
        const {cartItems,cartItemsDetails} = props.products;
        if(cartItemsDetails.length == 0) {
            const itemsC = Object.keys(cartItems).map(e => e.split("-")[1]);
            props.getCartProductDetail(itemsC);
        }
    }
    componentWillUnmount() {
        this.props.resetCartDetails();
    }
    updateCheckoutInfo(e) {
        // this.setState({
        //     checkoutInfo: {
        //         ...this.state.checkoutInfo,
        //         [e.target.name]: e.target.value
        //     }
            
        // })
        this.props.products.checkoutInfo = {
            ...this.props.products.checkoutInfo,
            [e.target.name]: e.target.value
        }
    }
    setPaymentMode(e) {
        // console.log(e.target.id);
        // this.setState({
        //     checkoutInfo: {
        //         ...this.state.checkoutInfo,
        //         paymentMode: e.target.id
        //     }
        // })
        this.props.products.checkoutInfo = {
            ...this.props.products.checkoutInfo,
            paymentMode: e.target.id
        }
    } 
    placeOrder(e) {
        e.preventDefault();
        // console.log("state",this.state);
        var flag = false;
        Object.entries(this.props.products.checkoutInfo).map(([key,val]) => {
            if(isEmpty(val) && key!=="note") {
                flag = true;
            }
        })
        
        if(flag == true) {
            window.alertbox("Please fill in all the Details");
        }
        else if(isEmpty(this.props.products.checkoutInfo.paymentMode)) {
            window.alertbox("Please select the Payment Mode");
        }
        else {
            const orderDet = {
                ...this.props.products.checkoutInfo,
                products: {...this.props.products.cartItems}
            }
            this.props.placeOrder(orderDet,this.props);
        }
    }
    render() {
        var totalAmount = 0;
        const {cartItems,cartItemsDetails} = this.props.products;
        if(totalAmount==0) {
            
            if(!isEmpty(cartItemsDetails)) {
                cartItemsDetails.forEach((a) => {
                    totalAmount = totalAmount+ (cartItems["pro-"+a.ProductID] * Number((a.ProductPrice).replace(",","")));
                })
            }
            // this.setState({
            //     totalAmount: totalAmount
            // })
        }
        console.log("tootal",totalAmount)
        if(isEmpty(cartItems)) return (<React.Fragment><h3>No items in Cart</h3></React.Fragment>)
        return (
            <React.Fragment>
                <div className="cart-table-area section-padding-100">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="checkout_details_area mt-50 clearfix">

                                    <div className="cart-title">
                                        <h2>Checkout</h2>
                                    </div>

                                    <form action="#" method="post">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <input type="text" className="form-control" name="first_name" defaultValue={""} placeholder="First Name *" required onChange={(e) => this.updateCheckoutInfo(e)}/>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="text" className="form-control" name="last_name" defaultValue={""} placeholder="Last Name *" required onChange={(e) => this.updateCheckoutInfo(e)}/>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <input type="email" className="form-control" name="email" placeholder="Email *" defaultValue={""} required onChange={(e) => this.updateCheckoutInfo(e)}/>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <input type="text" className="form-control" name="phone" placeholder="10 digit Mobile Number *" defaultValue={""} required onChange={(e) => this.updateCheckoutInfo(e)} />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <input type="text" className="form-control" name="address_1" placeholder="House No., Building Name *" defaultValue={""} required onChange={(e) => this.updateCheckoutInfo(e)}/>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <input type="text" className="form-control mb-3" name="address_2" placeholder="Street Name, Area, Colony *" defaultValue={""} required onChange={(e) => this.updateCheckoutInfo(e)}/>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="text" className="form-control" name="city" placeholder="City *" defaultValue={""} required onChange={(e) => this.updateCheckoutInfo(e)}/>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="text" className="form-control" name="state" placeholder="State *" defaultValue={""} required onChange={(e) => this.updateCheckoutInfo(e)}/>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <input type="text" className="form-control" name="pincode" placeholder="Pincode *" defaultValue={""}  required onChange={(e) => this.updateCheckoutInfo(e)}/>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <textarea name="comment" className="form-control w-100" name="note" cols="30" rows="10" placeholder="Leave a note on your order" onChange={(e) => this.updateCheckoutInfo(e)}></textarea>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="cart-summary">
                                    <h5>Cart Total</h5>
                                    <ul className="summary-table">
                                    <li><span>subtotal:</span> <span>Rs.{totalAmount}</span></li>
                                        <li><span>delivery:</span> <span>Free</span></li>
                                        <li><span>total:</span> <span>Rs. {totalAmount}</span></li>
                                    </ul>

                                    <div className="payment-method">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="radio" className="custom-control-input" name="payment" id="cod" defaultChecked={false} onChange={(e) => this.setPaymentMode(e)} />
                                            <label className="custom-control-label"   htmlFor="cod">Cash on Delivery</label>
                                        </div>
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="radio" className="custom-control-input" name="payment" id="card" defaultChecked={false} onChange={(e) => this.setPaymentMode(e)} />
                                            <label className="custom-control-label"   htmlFor="card">Debit/Credit Card <img className="ml-15" src="img/core-img/paypal.png" alt="" /></label>
                                        </div>
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="radio" className="custom-control-input" name="payment" id="wallet" defaultChecked={false} onChange={(e) => this.setPaymentMode(e)} />
                                            <label className="custom-control-label"   htmlFor="wallet">Wallets <i className="fa fa-google-wallet ml-15"></i></label>
                                        </div>
                                    </div>

                                    <div className="cart-btn mt-100">
                                        <button className="btn stp-btn w-100" onClick={(e) => this.placeOrder(e)}>Place Order</button>
                                    </div>
                                </div>
                            </div>
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
    getCartProductDetail,resetCartDetails,placeOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getAllProducts,setCurrentStore } from "../../actions/productActions";
import './home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    // static propTypes = {
    //     products: PropTypes.object.isRequired
    // }
    UNSAFE_componentWillMount() {
        //  console.log("hoooo",this.props.match );
        // this.props.getAllProducts();
        // if(this.props.match && this.props.match.params.store) {
            // console.log(this.props.match.params.store);
            // this.props.callbackP("home");
            this.props.setCurrentStore("home");
        // }
    }
    UNSAFE_componentWillReceiveProps(nextState) {
        // console.log("sa",nextState);
        if(nextState.match.params.store !== this.props.match.params.store) {
            //  console.log("hoooo",this.props.match );
            // if(this.props.match && this.props.match.params.store) {
                // console.log(this.props.match.params.store);
                // this.props.callbackP("home");
                this.props.setCurrentStore("home");
            // }
        }
    }

    render() {
        // const { productsList } = this.props.products;
        // console.log("got it",productsList);
        return (
            <React.Fragment>
                <div className="products-catagories-area clearfix">
                    
                    <div className="pro-category clearfix mb-50">
                        <div className="pro-category-header">
                            <div className="category-name">
                                <h4>Latest Products</h4>
                            </div>
                            <Link to="#" className="btn stp-btn small mr-15">View All &nbsp;<i className="fa fa-long-arrow-right"></i></Link>
                        </div>
                        <div className="pro-category-body">
                            <div className="single-products-category clearfix">
                                <Link to="">
                                    <img src="img/bg-img/1.jpg" alt="" />
                                    <div className="hover-content">
                                        <div className="line"></div>
                                        <h6 className="pr-brand">Asus</h6>
                                        <h6 className="pr-name">Zenfone Max Pro M2</h6>
                                        <p>Rs 11,999</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="single-products-category clearfix">
                                <Link to="">
                                    <img src="img/bg-img/4.jpg" alt="" />
                                    <div className="hover-content">
                                        <div className="line"></div>
                                        <h6 className="pr-brand">Mi</h6>
                                        <h6 className="pr-name">Redmi Note 8 Pro</h6>
                                        <p>Rs. 19,999</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pro-category clearfix mb-50">
                        <div className="pro-category-header">
                            <div className="category-name">
                                <h4>Featured Items</h4>
                            </div>
                            <Link to="#" className="btn stp-btn small mr-15">View All &nbsp;<i className="fa fa-long-arrow-right"></i></Link>
                        </div>
                        <div className="pro-category-body">
                            <div className="single-products-category clearfix">
                                <Link to="">
                                    <img src="img/bg-img/2.jpg" alt="" />
                                    <div className="hover-content">
                                        <div className="line"></div>
                                        <h6 className="pr-brand">Asus</h6>
                                        <h6 className="pr-name">Zenfone Max Pro M2</h6>
                                        <p>Rs 11,999</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="single-products-category clearfix">
                                <Link to="">
                                    <img src="img/bg-img/3.jpg" alt="" />
                                    <div className="hover-content">
                                        <div className="line"></div>
                                        <h6 className="pr-brand">Mi</h6>
                                        <h6 className="pr-name">Redmi Note 8 Pro</h6>
                                        <p>Rs. 19,999</p>
                                    </div>
                                </Link>
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
    getAllProducts,setCurrentStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from "react-router-dom";

import { getSingleProduct,addToCart,setCurrentStore } from "../../actions/productActions";
import { isEmpty } from '../../validation/isEmpty';

class Product extends Component {
    
    UNSAFE_componentWillMount() {
        //  console.log("hoooo",this.props.match );
        this.props.getSingleProduct(this.props.match.params.product);
        if(this.props.match && this.props.match.params.store) {
            // console.log(this.props.match.params.store);
            // this.props.callbackP(this.props.match.params.store );
            this.props.setCurrentStore(this.props.match.params.store);
        }
    }
    componentWillUpdate(nextState) {
        // console.log("sa",nextState);
        if(nextState.match.params.store !== this.props.match.params.store) {
            //  console.log("hoooo",this.props.match );
            if(this.props.match && this.props.match.params.store) {
                // console.log(this.props.match.params.store);
                // this.props.callbackP(nextState.match.params.store );
                this.props.setCurrentStore(this.props.match.params.store);
            }
        }
    }
    addToCart(e)  {
        e.preventDefault();
        const { singleProduct } = this.props.products;
        if(singleProduct.ProductStock < 1) return false;
        this.props.addToCart(singleProduct.ProductID);
    }
    render() {
        const breadcrumb = this.props.match.params;
        const { singleProduct } = this.props.products;
        // console.log("got it single",singleProduct);
        // if(isEmpty(singleProduct)) return (<React.Fragment></React.Fragment>)
        const ratings = [];
        for(let p=0;p<singleProduct.ProductRating;p++) {
            ratings.push(<i key={p} className="fa fa-star" aria-hidden="true"></i>)
        }
        return (
            <React.Fragment>
                <div className="single-product-area section-padding-100 clearfix">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mt-50">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        <li className="breadcrumb-item"><Link to={"/"+breadcrumb.store}>{breadcrumb.store}</Link></li>
                                        <li className="breadcrumb-item"><Link to={"/"+breadcrumb.store+"/"+breadcrumb.category}>{breadcrumb.category}</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">{singleProduct.ProductName}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-lg-7">
                                <div className="single_product_thumb">
                                    <div id="product_details_slider" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li className="active" data-target="#product_details_slider" data-slide-href="0" style={{backgroundImage: 'url(../../../img/product-img/pro-big-1.jpg)'}}>
                                            </li>
                                            <li data-target="#product_details_slider" data-slide-href="1" style={{backgroundImage: 'url(../../../img/product-img/pro-big-2.jpg)'}}>
                                            </li>
                                            <li data-target="#product_details_slider" data-slide-href="2" style={{backgroundImage: 'url(../../../img/product-img/pro-big-3.jpg)'}}>
                                            </li>
                                            <li data-target="#product_details_slider" data-slide-href="3" style={{backgroundImage: 'url(../../../img/product-img/pro-big-4.jpg)'}}>
                                            </li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <Link className="gallery_img">
                                                    <img className="d-block w-100" src="../../../img/product-img/pro-big-1.jpg" alt="First slide"/>
                                                </Link>
                                            </div>
                                            <div className="carousel-item">
                                                <Link className="gallery_img">
                                                    <img className="d-block w-100" src="../../../img/product-img/pro-big-2.jpg" alt="Second slide"/>
                                                </Link>
                                            </div>
                                            <div className="carousel-item">
                                                <Link className="gallery_img">
                                                    <img className="d-block w-100" src="../../../img/product-img/pro-big-3.jpg" alt="Third slide"/>
                                                </Link>
                                            </div>
                                            <div className="carousel-item">
                                                <Link className="gallery_img">
                                                    <img className="d-block w-100" src="../../../img/product-img/pro-big-4.jpg" alt="Fourth slide"/>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5">
                                <div className="single_product_desc">
                                    <div className="product-meta-data">
                                        <div className="line"></div>
                                        <p className="product-price">Rs. {singleProduct.ProductPrice}</p>
                                        <Link to="product-details.html">
                                            <h6>{singleProduct.ProductName}</h6>
                                        </Link>
                                        <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                                            <div className="ratings">
                                                {ratings}
                                            </div>
                                            <div className="review">
                                                <Link to="#">Write A Review</Link>
                                            </div>
                                        </div>
                                        {singleProduct.ProductStock>1?
                                            <p className="avaibility"><i className="fa fa-circle"></i> In Stock</p>
                                            :""
                                        }
                                    </div>

                                    <div className="short_overview my-5">
                                        <p>{singleProduct.ProductShortDesc}</p>
                                    </div>

                                    <form className="cart clearfix" method="post">
                                        <button type="submit" name="addtocart" className={singleProduct.ProductStock < 1 ?"btn stp-btn disabled":"btn stp-btn"} onClick={(e) => this.addToCart(e)}>Add to cart</button>
                                        <button type="submit" name="buynow" className={singleProduct.ProductStock < 1 ?"btn stp-btn disabled":"btn stp-btn"} onClick={(e) => this.buyNow(e)}>Buy Now</button>
                                    </form>

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
    getSingleProduct,
    addToCart,
    setCurrentStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)

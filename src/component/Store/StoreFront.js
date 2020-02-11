import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCategoryProducts, setCurrentCategory } from "../../actions/productActions";
import { isEmpty } from '../../validation/isEmpty';
import { Link } from 'react-router-dom';

export class StoreFront extends Component {
    
    UNSAFE_componentWillMount() {
        this.props.getCategoryProducts(this.props.match.params.category);
        
    }
    componentDidUpdate(nextState) {
        // console.log("aas",this.props.match.params.category)
        if(nextState.match.params.category !== this.props.match.params.category) {
            // console.log("sa",nextState.match,this.props.match);
            this.props.getCategoryProducts(this.props.match.params.category);
        }
        if(isEmpty(this.props.match.params.category)) {
            this.props.setCurrentCategory("");
        }
    }
    componentWillUnmount() {
            this.props.setCurrentCategory("");
    }

    render() {
        const {categoryProducts} = this.props.products;

        if(isEmpty(categoryProducts)) return (
        
        <React.Fragment>
            <div className="stp_product_area section-padding-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-center mt-15">No Products in Stock</h3>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>);


        return (
            <React.Fragment>
                <div className="stp_product_area section-padding-100">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                                    <div className="total-products">
                                        <p>Showing 1-8 0f 25</p>
                                        <div className="view d-flex">
                                            <Link to="#"><i className="fa fa-th-large" aria-hidden="true"></i></Link>
                                            <Link to="#"><i className="fa fa-bars" aria-hidden="true"></i></Link>
                                        </div>
                                    </div>
                                    <div className="product-sorting d-flex">
                                        <div className="sort-by-date d-flex align-items-center mr-15">
                                            <p>Sort by</p>
                                            <form action="#" method="get">
                                                <select name="select" id="sortBydate">
                                                    <option value="value">Date</option>
                                                    <option value="value">Newest</option>
                                                    <option value="value">Popular</option>
                                                </select>
                                            </form>
                                        </div>
                                        <div className="view-product d-flex align-items-center">
                                            <p>View</p>
                                            <form action="#" method="get">
                                                <select name="select" id="viewProduct">
                                                    <option value="value">12</option>
                                                    <option value="value">24</option>
                                                    <option value="value">48</option>
                                                    <option value="value">96</option>
                                                </select>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            {categoryProducts.map((product,i) => {
                                const ratings = [];
                                for(let p=0;p<product.ProductRating;p++) {
                                    ratings.push(<i key={p} className="fa fa-star" aria-hidden="true"></i>)
                                }
                                return (
                                    <div key={i} className="col-12 col-sm-4 col-md-12 col-xl-4">
                                        <div className="single-product-wrapper">
                                            <Link to={"/"+this.props.match.params.store+"/"+this.props.match.params.category+"/"+product.ProductKey}>
                                                <div className="product-img">
                                                    <img src={!isEmpty(product.ProductImage)?product.ProductImage:"../../img/product-img/product2.jpg"} alt=""/>
                                                    <img className="hover-img" alt=""/>
                                                </div>

                                                <div className="product-description d-flex align-items-center justify-content-between">
                                                    <div className="product-meta-data">
                                                        <div className="line"></div>
                                                        <p className="product-price">Rs. {product.ProductPrice}</p>
                                                        
                                                            <h6>{product.ProductName}</h6>
                                                        
                                                    </div>
                                                    <div className="ratings-cart text-right">
                                                        <div className="ratings">
                                                            {ratings}
                                                        </div>
                                                        {/* <div className="fav">
                                                            <button data-toggle="tooltip" data-placement="left" title="Favourite"><i className="fa fa-heart-o"></i></button>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <nav aria-label="navigation">
                                    <ul className="pagination justify-content-end mt-50">
                                        <li className="page-item active"><Link className="page-link" t="#">1</Link></li>
                                        <li className="page-item"><Link className="page-link" t="#">2</Link></li>
                                        <li className="page-item"><Link className="page-link" t="#">3</Link></li>
                                        <li className="page-item"><Link className="page-link" t="#">4</Link></li>
                                    </ul>
                                </nav>
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
    getCategoryProducts, setCurrentCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront)

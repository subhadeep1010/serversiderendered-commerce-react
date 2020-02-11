import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Route, Link } from 'react-router-dom';
import {getCategories, getStoreProducts, setCurrentStore} from "../../actions/productActions";
import { isEmpty } from '../../validation/isEmpty';

class Search extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {search_items} = this.props.products;
        // console.log("count",productCount);
        return (
            <React.Fragment>
                <div className="stp_product_area section-padding-100">
                    
                        <div className="pro-category clearfix mb-15">
                                
                            <div className="pro-category-header">
                                <div className="category-name">
                                    <h4>Matched Results</h4>
                                </div>
                            </div>
                            <div className="pro-category-body"> 
                                
                                <CatProducts catP={search_items}  />

                                
                            </div>
                        </div>
                        

                </div>
            </React.Fragment>
        )
    }
}
class CatProducts extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const {catP,category_slug,store_slug} = this.props;
        // console.log("ths",catP);
        return (
            <React.Fragment>
                {catP.map((prd,i) => {
                    return(
                    <div key={i} className="single-products-category clearfix">
                        {/* <Link to={"/"+store_slug+"/"+category_slug+"/"+prd.ProductKey}> */}
                            <img src="img/bg-img/1.jpg" alt="" />
                            <div className="hover-content">
                                <div className="line"></div>
                                <h6 className="pr-brand">{prd.ProductBrand?prd.ProductBrand:"Brand"}</h6>
                                <h6 className="pr-name">{prd.ProductName}</h6>
                                <p>Rs. {prd.ProductPrice}</p>
                            </div>
                        {/* </Link> */}
                    </div>
                    )
                })}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import StoreSidebar from './StoreSidebar'
import StoreFront from './StoreFront'
import { Route, Link } from 'react-router-dom';
import {getCategories, getStoreProducts, setCurrentStore} from "../../actions/productActions";
import { isEmpty } from '../../validation/isEmpty';

class Store extends Component {
    constructor(props) {
        super(props);
        // console.log("window data", window.__ROUTE_DATA__);
    }
    UNSAFE_componentWillMount() {
        // alert();
        //  console.log("hoooo",this.props.match );
        // UNSAFE_componentWillMount() {
        // this.props.getCategories(this.props.match.params.store);
        // }
        if(this.props.match && this.props.match.params.store) {
            // console.log(this.props.match.params.store);
            // this.props.callbackP(this.props.match.params.store );
            this.props.setCurrentStore(this.props.match.params.store);
        }
        if(isEmpty(this.props.products.category_slug)) {
            this.props.getStoreProducts(this.props.match.params.store);
        }
    }
    UNSAFE_componentWillReceiveProps(nextState) {
        // console.log("sa",nextState);
        if(nextState.match.params.store !== this.props.match.params.store) {
            //  console.log("hoooo",this.props.match );
            if(this.props.match && this.props.match.params.store) {
                // console.log(this.props.match.params.store);
                // this.props.callbackP(nextState.match.params.store );
                
                
            }
        }
    }
    componentDidUpdate(nextState) {
        if(nextState.match.params.store !== this.props.match.params.store) {
            if(isEmpty(this.props.products.category_slug)) {
                this.props.getStoreProducts(this.props.match.params.store);
            }
            this.props.setCurrentStore(this.props.match.params.store);
        }
    }
    loadData (store, param) {
        // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
        // So we need to use store itself to load data
        // return store.dispatch(this.props.getStoreProducts(param)); // Manually dispatch a network request
    };
    render() {
        var storeP = null;
        var productCount = 0;
        if(isEmpty(this.props.products.category_slug)) {
            storeP = this.props.products.storeProducts;
            // console.log(storeP);
        
            var productCount_items = storeP.map((item) => {
                return item.products.length
            })
            
            if(!isEmpty(productCount_items)) {
                productCount = productCount_items.reduce((s,a) => {
                    return s+a;
                })
            }
        }
        // console.log("count",productCount);
        return (
            <React.Fragment>
                <StoreSidebar match={this.props.match} />
                <Route path="/:store/:category" render={(props) => <StoreFront {...props} /> } />
                {/* <StoreFront /> */}
                
                {productCount == 0?
                     <React.Fragment>
                        <div className="stp_product_area section-padding-100">
                            <h3 className="text-center mt-15">No Products in Stock</h3>
                        </div>
                    </React.Fragment>
               :""}
                {isEmpty(this.props.products.category_slug) ?
                    <React.Fragment>
                        <div className="stp_product_area section-padding-100">
                            
                            {storeP.map((item,i) => {
                                if(isEmpty(item.products)) return (<React.Fragment key={i}></React.Fragment>)
                                return (
                                <div key={i} className="pro-category clearfix mb-15">
                                        
                                    <div className="pro-category-header">
                                        <div className="category-name">
                                            <h4>{item.CategoryName}</h4>
                                        </div>
                                        <Link to={"/"+this.props.match.params.store+"/"+item.CategoryKey} className="btn stp-btn small mr-15">View All &nbsp;<i className="fa fa-long-arrow-right"></i></Link>
                                    </div>
                                    <div className="pro-category-body"> 
                                        
                                        <CatProducts catP={item.products} category_slug={item.CategoryKey} store_slug={this.props.match.params.store} />

                                        
                                    </div>
                                </div>
                                
                            )})}

                        </div>
                    </React.Fragment>
                    :""
                }
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
                        <Link to={"/"+store_slug+"/"+category_slug+"/"+prd.ProductKey}>
                            <img src="img/bg-img/1.jpg" alt="" />
                            <div className="hover-content">
                                <div className="line"></div>
                                <h6 className="pr-brand">{prd.ProductBrand?prd.ProductBrand:"Brand"}</h6>
                                <h6 className="pr-name">{prd.ProductName}</h6>
                                <p>Rs. {prd.ProductPrice}</p>
                            </div>
                        </Link>
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
    getCategories,getStoreProducts,setCurrentStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Store)

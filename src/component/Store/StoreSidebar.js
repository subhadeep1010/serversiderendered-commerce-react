import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from "react-router-dom";

import { getCategories } from "../../actions/productActions";


class StoreSidebar extends Component {
    // static propTypes = {
    //     // products: PropTypes.object.isRequired
    // }
    UNSAFE_componentWillMount() {
        this.props.getCategories(this.props.match.params.store);
    }
    componentDidUpdate(nextState) {
        // console.log("sa",nextState);
        if(nextState.match.params.store !== this.props.match.params.store) {
            
            this.props.getCategories(this.props.match.params.store);
            
        }
        else {
            // this.props.getCategories(this.props.match.params.store);
        }
    }

    render() {
        const {category_slug} = this.props.products;
        const store_slug = this.props.match.params.store;
        
        // console.log("dsa",category_slug,store_slug);
        const {storeCategory} = this.props.products;
        return (
            <React.Fragment>
                <div className="shop_sidebar_area">
                    <div className="widget catagory mb-50">
                        <h6 className="widget-title mb-30">Categories</h6>

                        <div className="catagories-menu">
                            <ul>
                                {storeCategory.map((cat,i) => {
                                    return (
                                        // <li></li>
                                        <li key={i} className={cat.CategoryKey === category_slug?"active":""}><Link to={"/"+store_slug+"/"+cat.CategoryKey}>{cat.CategoryName}</Link></li>
                                    )
                                })}
                                
                                
                            </ul>
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
    getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreSidebar)

import axios from "axios";
import PRODUCTS from "./types";

export const getStore = () => dispatch => {
    axios
    .get("http://localhost:4000/api/products/getStore",{headers: {'Content-Type':"application/json"}})
    .then(res => {
        // console.log("data",res);
        dispatch({
            type: PRODUCTS.GET_PRODUCT_STORE,
            payload: res.data
        });
    })
    .catch(err => {
        console.log("error",err);
        dispatch({
            type: PRODUCTS.GET_ERRORS,
            payload: err.response.data
        });
    });
}
export const getCategories = (store_slug) => dispatch => {
    axios
    .get("http://localhost:4000/api/products/getCategories/"+store_slug,{headers: {'Content-Type':"application/json"}})
    .then(res => {
        // console.log("data",res);
        dispatch({
            type: PRODUCTS.GET_STORE_CATEGORY,
            payload: res.data
        });
    })
    .catch(err => {
        console.log("error",err);
        dispatch({
            type: PRODUCTS.GET_ERRORS,
            payload: err.response.data
        });
    });
}
export const getCategoryProducts = (category_slug) => dispatch => {
    dispatch(setCurrentCategory(category_slug))
    // console.log("dsadsa");
    axios
    .get("http://localhost:4000/api/products/getCategoryProducts/"+category_slug,{headers: {'Content-Type':"application/json"}})
    .then(res => {
        console.log("data",res);
        dispatch({
            type: PRODUCTS.GET_CATEGORY_PRODUCTS,
            payload: res.data
        });
    })
    .catch(err => {
        console.log("error",err);
        dispatch({
            type: PRODUCTS.GET_ERRORS,
            payload: err.response.data
        });
    });
}
export const setCurrentCategory = (category_slug) => dispatch => {
    // console.log("lolol",category_slug)
    dispatch({
        type: PRODUCTS.CURRENT_CATEGORY,
        payload: category_slug
    });
}
export const setCurrentStore = (store_slug) => dispatch => {
    // console.log("lolol",store_slug)
    dispatch({
        type: PRODUCTS.CURRENT_STORE,
        payload: store_slug
    });
}

export const getStoreProducts = (store_slug) => dispatch => {
    console.log(store_slug);
    // alert(store_slug);
    // return (
        axios
        .get("http://localhost:4000/api/products/getStoreProducts/"+store_slug,{headers: {'Content-Type':"application/json"}})
        .then(res => {
            // console.log("data",res);
            dispatch({
                type: PRODUCTS.GET_STORE_PRODUCTS,
                payload: res.data
            });
            // return res.data
        })
        .catch(err => {
            console.log("error",err);
            dispatch({
                type: PRODUCTS.GET_ERRORS,
                payload: err.response.data
            });
        })
    // )
}

export const getAllProducts = () => dispatch => {
    console.log("called");
    dispatch(setProductsLoading());
    axios
    .get("http://localhost:4000/api/products/getAllProducts",{headers: {'Content-Type':"application/json"}})
    .then(res => {
        console.log("data",res);
        dispatch({
            type: PRODUCTS.GET_ALL_PRODUCTS,
            payload: res.data
        });
    })
    .catch(err => {
        console.log("error",err);
        dispatch({
            type: PRODUCTS.GET_ERRORS,
            payload: err.response.data
        });
    });
}
const setProductsLoading = () => dispatch => {
    return {
      type: PRODUCTS.PRODUCTS_LOADING
    };
};
export const getSingleProduct = (product_slug) => dispatch => {
    console.log("called");
    // dispatch(setProductsLoading());
    axios
    .get("http://localhost:4000/api/products/getSingleProduct/"+product_slug,{headers: {'Content-Type':"application/json"}})
    .then(res => {
        // console.log("data",res);
        // const product = res.data.filter(e => {return e.slug == product_slug})[0];
        // console.log("dat",product)
        dispatch({
            type: PRODUCTS.GET_SINGLE_PRODUCT,
            payload: res.data
        });
    })
    .catch(err => {
        console.log("error",err);
        dispatch({
            type: PRODUCTS.GET_ERRORS,
            payload: err.response.data
        });
    });
}
export const addToCart = (productID) => dispatch => {
    dispatch({
        type: PRODUCTS.ADD_TO_CART,
        payload: productID
    });
}
export const loadCart = (cart_data) => dispatch => {
    dispatch({
        type: PRODUCTS.LOAD_CART,
        payload: cart_data
    });
}
export const getCartProductDetail = (product_ids) => dispatch => {
    axios
    .post("http://localhost:4000/api/products/getCartProductDetail",{ids:product_ids},{headers: {'Content-Type':"application/json"}})
    .then(res => {
        // console.log("bet",res.data)
        dispatch({
            type: PRODUCTS.CART_DETAILS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log("error",err);
        dispatch({
            type: PRODUCTS.GET_ERRORS,
            payload: err.response.data
        });
    });
}
export const resetCartDetails = () => dispatch => {
    dispatch({
        type: PRODUCTS.RESET_CART_DETAILS
    })
}
export const resetCart = () => dispatch => {
    window.localStorage.removeItem('ecm:ct-im');
    dispatch({
        type: PRODUCTS.RESET_CART
    })
}
export const setCheckoutInfo = () => dispatch => {

}
export const placeOrder = (orderDet,props) => dispatch => {
    axios
    .post("http://localhost:4000/api/products/placeOrder",orderDet,{headers: {'Content-Type':"application/json"}})
    .then(res => {
        console.log("bet",res.data)
        window.alertbox("Your order has been placed");
        
        dispatch(resetCart());
        setTimeout(() => {
            props.history.push('/')
        },2000)
    })
    .catch(err => {
        console.log("error",err);
        dispatch({
            type: PRODUCTS.GET_ERRORS,
            payload: err.response.data
        });
    });
}
export const searchProduct = (keyw) => dispatch => {
    axios
    .get("http://localhost:4000/api/products/search/"+keyw,{headers: {'Content-Type':"application/json"}})
    .then(res => {
        console.log("search", res.data);
        dispatch({
            type: PRODUCTS.SEARCH_ITEMS,
            payload: res.data,
        })
    })
}
export default {
    getAllProducts,
    setProductsLoading,
    getSingleProduct,
};
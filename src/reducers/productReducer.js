import PRODUCTS from "../actions/types";
import { isEmpty } from "../validation/isEmpty";
import jwt from "jsonwebtoken";

const initial_state = {
    productsList: [{}],
    singleProduct: {},
    productStore: {},
    storeCategory: [],
    categoryProducts: {},
    storeProducts: [],
    productsLoading: false,
    singleProductLoading: false,

    category_slug: "",
    store_slug: "",
    cartItems: {},

    checkoutInfo: {},

    cartItemsDetails: []
}

const productReducer = (state = initial_state, action) => {
    switch(action.type) {
        case PRODUCTS.GET_PRODUCT_STORE:
            return {
                ...state,
                productStore: action.payload
            };
        case PRODUCTS.GET_STORE_CATEGORY:
            return {
                ...state,
                storeCategory: action.payload
            };
        case PRODUCTS.GET_CATEGORY_PRODUCTS:
            return {
                ...state,
                categoryProducts: action.payload
            };
        case PRODUCTS.GET_STORE_PRODUCTS:
            return {
                ...state,
                storeProducts: action.payload
            };
        case PRODUCTS.PRODUCTS_LOADING:
            return {
                ...state,
                productsLoading: true
            };
        case PRODUCTS.GET_ALL_PRODUCTS:
            return {
                ...state,
                productsList: action.payload,
                productsLoading: false
            };
        case PRODUCTS.GET_SINGLE_PRODUCT:
            return {
                ...state,
                singleProduct: action.payload,
                productsLoading: false
            };
        case PRODUCTS.CURRENT_CATEGORY:
            // console.log("sas",action.payload);
            return {
                ...state,
                category_slug: action.payload
            };
        case PRODUCTS.CURRENT_STORE:
            // console.log("sas",action.payload);
            return {
                ...state,
                store_slug: action.payload
            };
        case PRODUCTS.ADD_TO_CART:
                    state.cartItems= {
                        ...state.cartItems,
                        ['pro-'+action.payload]: (state.cartItems['pro-'+action.payload] || 0) + 1
                    }
            console.log(state.cartItems);
            window.localStorage.setItem("ecm:ct-im",jwt.sign(state.cartItems,"ecmctim"));
            return {
                ...state,
                cartItems: state.cartItems
            };
        case PRODUCTS.LOAD_CART:
            state.cartItems = action.payload
            return {
                ...state,
                cartItems: state.cartItems
            };
        case PRODUCTS.CART_DETAILS:
            if(!Array.isArray(action.payload))
                state.cartItemsDetails.push(action.payload)
            else
                state.cartItemsDetails = action.payload
            return {
                ...state,
                cartItemsDetails: state.cartItemsDetails
            };
        case PRODUCTS.RESET_CART_DETAILS:
            return {
                ...state,
                cartItemsDetails: []
            };
        case PRODUCTS.RESET_CART:
            return {
                ...state,
                cartItems:[],
                checkoutInfo: {}
            }
        case PRODUCTS.CHECKOUT_INFO:
            return {
                ...state,
                checkoutInfo: action.payload
            }
        case PRODUCTS.RESET_CHECKOUT_INFO:
            return {
                ...state,
                checkoutInfo: {}
            }
        case PRODUCTS.SEARCH_ITEMS:
            return {
                ...state,
                search_items: action.payload
            }
        default:
            return state;
    }
};
export default productReducer;
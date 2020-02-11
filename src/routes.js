import Home from './component/Home';
import Store from './component/Store';
import Product from './component/Product'
import Cart from './component/Cart'
import Checkout from './component/Checkout'
import StoreFront from './component/Store/StoreFront';
import Search from './component/Search';
import App from './App';

import { getStoreProducts,getCategoryProducts, getSingleProduct } from "./actions/productActions"

const Routes =  
  {
    ...App,
    routes: [
      {
        path: '/',
        ...Home,
        exact: true
      },
      {
        path: '/cart',
        ...Cart,
        exact: true
      },
      {
        path: "/checkout",
        ...Checkout,
        exact: true
      },
      {
        path: "/search/:search",
        ...Search,
        exact: true
      },
      {
        path: '/:store/:category/:product',
        ...Product,
        fetchInitialData: (path = '') => getSingleProduct(path.split('/').pop())
      },
      {
        path: '/:store/:category',
        ...StoreFront,
        fetchInitialData: (path = '') => getCategoryProducts(path.split('/').pop())
      },
      {
        path: '/:store',
        ...Store,
        fetchInitialData: (path = '') => getStoreProducts(path.split('/').pop())
      }
    ]
  }
;
export default Routes;
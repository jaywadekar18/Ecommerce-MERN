import { configureStore } from '@reduxjs/toolkit'

import productReducer from '../slices/productSlice'
import cartReducer from '../slices/cartSlice'
import userReducer from '../slices/usersSlice'
import searchProductReducer from '../slices/searchProductSlice'
import reviewReducer from '../slices/reviewSlice'


export default configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    search: searchProductReducer,
    review: reviewReducer
  },
})

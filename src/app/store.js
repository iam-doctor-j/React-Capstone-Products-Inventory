import { configureStore } from '@reduxjs/toolkit';
import ProductFeedReducer from '../features/ProductFeed/ProductFeedSlice';
import AuthenticationReducer from '../features/Authentication/AuthenticationSlice';

export default configureStore({
  reducer: {
    productFeed: ProductFeedReducer,
    auth: AuthenticationReducer,
  }
});

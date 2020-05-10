import { lazy } from 'react';

export const ProductFeedLazy = lazy(() => import('../features/ProductFeed/ProductFeed'));
export const ProductDetailsLazy = lazy(() => import('../features/ProductFeed/ProductDetails/ProductDetails'));
export const RegisterLazy = lazy(() => import('../features/Authentication/Register/Register'));
export const LoginLazy = lazy(() => import('../features/Authentication/Login/Login'));
export const AddProductLazy = lazy(() => import('../features/ProductFeed/AddProduct/AddProduct'));
export const EditProductLazy = lazy(() => import('../features/ProductFeed/EditProduct/EditProduct'));
export const UserProfileLazy = lazy(() => import('../features/Authentication/UserProfile/UserProfile'));
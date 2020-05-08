import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as _ from 'lodash';

export const productFeedSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        editProduct: (state, action) => {
            console.log(action);
        },
        fetchProducts: (state, action) => {
            state.products = action.payload;
        },
        deleteProduct: (state, action) => {
            let index = _.findIndex(state.products, (product) => product.id == action.payload);
            state.products.splice(index, 1);
        },
        viewProduct: (state, action) => {
            let product = action.payload;
            let index = _.findIndex(state.products, prod => prod.id === product.id);
            state.products[index].views = product.views;
        },
    },
});

export const { addProduct, editProduct, fetchProducts, deleteProduct, viewProduct } = productFeedSlice.actions;

export const addProductToDb = (product, cb) => dispatch => {
    console.log('adding to db');
    axios.post('http://localhost:4000/products', product)
    .then(res => {
        dispatch(addProduct(res.data));
        cb();
    })
    .catch(err => { throw err });
}

export const editProductToDb = (id, product) => dispatch => {
    console.log(product);
    axios.put('http://localhost:4000/products/'+id, product)
    .then(res => dispatch(editProduct(res.data)))
    .catch(err => { throw err });
}

export const fetchProductsFromDb = () => dispatch => {
    axios.get('http://localhost:4000/products')
    .then(res => dispatch(fetchProducts(res.data)))
    .catch(err => { throw err });
}

export const deleteProductFromDb = id => dispatch => {
    axios.delete('http://localhost:4000/products/'+id)
    .then(res => {console.log(res); dispatch(deleteProduct(id))})
    .catch(err => { throw err });
}

export const viewProductFromDb = (id) => dispatch => {
    axios.get('http://localhost:4000/products/'+id)
    .then(res => {
        console.log(res.data);
        
        let views = +res.data.views;
        axios.patch('http://localhost:4000/products/'+id, {views: ++views})
        .then(res => {
            console.log(res);
            dispatch(viewProduct(res.data));
        })
        .catch(err => {throw err});
    })
    
}

export const productSelector = state => state.products;

export default productFeedSlice.reducer;

// async function incrementViews(id) {
//     let prod;
//     await axios.get('http://localhost:4000/products/'+id)
//     .then()
// }


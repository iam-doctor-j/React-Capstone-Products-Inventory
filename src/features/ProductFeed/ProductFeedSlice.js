import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as _ from 'lodash';

export const productFeedSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    deleteList: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      let index = _.findIndex(
        state.products,
        (prod) => prod.id === action.payload.id
      );
      state.products.splice(index, 1, action.payload);
    },
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
    viewProduct: (state, action) => {
      let product = action.payload;
      let index = _.findIndex(state.products, (prod) => prod.id === product.id);
      state.products[index].views = product.views;
    },
    deleteProducts: (state, action) => {
        let l = action.payload.length;
        for(let i=0;i<l;i++){
            _.remove(state.products, prod => prod.id === action.payload[i].id);
        }
    },
    addProductToDeleteList: (state, action) => {
        console.warn(state);
        state.deleteList.push(action.payload);
    },
    removeProductToDeleteList: (state, action) => {
        let index = _.findIndex(state.deleteList, prod => prod.id === action.payload);
        state.deleteList.splice(index, 1);
    },
    onSearchProducts: (state, action) => {
      let result = _.filter(state.products, prod => prod.name.value.includes(action.payload));
      state.products = result;
    }
  },
});

const {
  addProduct,
  editProduct,
  fetchProducts,
  viewProduct,
  deleteProducts,
  addProductToDeleteList,
  removeProductToDeleteList,
  onSearchProducts,
} = productFeedSlice.actions;

export const searchProducts = (name) => dispatch => {
  dispatch(onSearchProducts(name));
}

export const addProductToDb = (product, cb) => (dispatch) => {
  axios
    .post('http://localhost:4000/products', product)
    .then((res) => {
      dispatch(addProduct(res.data));
      cb();
    })
    .catch((err) => {
      throw err;
    });
};

export const editProductToDb = (id, product, success, error) => (dispatch) => {
  axios
    .put('http://localhost:4000/products/' + id, product)
    .then((res) => {
      dispatch(editProduct(res.data));
      success();
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchProductsFromDb = () => (dispatch) => {
  axios
    .get('http://localhost:4000/products')
    .then((res) => dispatch(fetchProducts(res.data)))
    .catch((err) => {
      throw err;
    });
};

export const viewProductFromDb = (id) => (dispatch) => {
  axios.get('http://localhost:4000/products/' + id).then((res) => {

    let views = +res.data.views;
    axios
      .patch('http://localhost:4000/products/' + id, { views: ++views })
      .then((res) => {
        dispatch(viewProduct(res.data));
      })
      .catch((err) => {
        throw err;
      });
  });
};

export const addProductToDeleteListFirst = (product) => dispatch => {
    dispatch(addProductToDeleteList(product));
};

export const removeProductToDeleteListFirst = (id) => dispatch => {
    dispatch(removeProductToDeleteList(id));
}

export const deleteProductsFromDb = (products, success) => dispatch => {
    let toDelete = products.map(prod => {
        return axios.delete('http://localhost:4000/products/'+prod.id);
    });
    dispatch(deleteProducts(products));
    success && success();
};

export const productSelector = (state) => state.products;

export default productFeedSlice.reducer;
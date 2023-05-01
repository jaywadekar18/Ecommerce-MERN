import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const getProductData = createAsyncThunk('products/getProductData', async () => {
    try {
        const res = await axios.get('/api/products');

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})
const getProductsDataByCategory = createAsyncThunk('products/getProductsDataByCategory', async (category) => {
    try {
        console.log(category);
        const res = await axios.get(`/api/products/category/${category}`);

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})
const updateProductData = createAsyncThunk('products/updateProductData', async (data) => {
    try {
        const res = await axios.put('/api/products', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken
            }
        });

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})
const deleteProductDataById = createAsyncThunk('products/deleteProductDataById', async (id) => {
    try {
        const res = await axios.delete(`/api/products/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken
            }
        });

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})


const getProductDataById = createAsyncThunk('products/getProductDataById', async (id) => {
    try {
        const res = await axios.get(`/api/products/${id}`);

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})


const searchProductDataByName = createAsyncThunk('products/searchProductDataByName', async (name) => {
    try {
        const res = await axios.get(`/api/products/search/${name}`);

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})
const productSlice = createSlice({
    name: 'products',
    initialState: {
        status: '',
        error: null,
        data: []

    },
    reducers: {

    },
    extraReducers: {
        [getProductData.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload;


        },
        [getProductData.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [getProductData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

            state.data = []

        },
          ///////////////////////////////////////////////////////////////////////
          [getProductsDataByCategory.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload;


        },
        [getProductsDataByCategory.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [getProductsDataByCategory.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

            state.data = []

        },

        /////////////////////////////////////////////////////////////////////////////////////
        [getProductDataById.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload;


        },
        [getProductDataById.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [getProductDataById.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        ///////////////////////////////////////////////////////
        [searchProductDataByName.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload;


        },
        [searchProductDataByName.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [searchProductDataByName.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        //////////////////////////////////////////////////////////////////////
        [deleteProductDataById.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = [];


        },
        [deleteProductDataById.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [deleteProductDataById.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        ////////////////////////////////////////////////////////////////////////////

        [updateProductData.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = [];


        },
        [updateProductData.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [updateProductData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        }

    }

})
export { getProductData, getProductDataById, deleteProductDataById, updateProductData, searchProductDataByName , getProductsDataByCategory }
export default productSlice.reducer;
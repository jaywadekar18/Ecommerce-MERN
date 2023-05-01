import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const searchProductsByName = createAsyncThunk('search/searchProductDataByName', async (name) => {
    try {
        const res = await axios.get(`/api/products/search/${name}`);

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})
const searchProductSlice = createSlice({
    name: 'search',
    initialState: {
        status: '',
        error: null,
        data: []

    },
    reducers: {

    },
    extraReducers: {

        [searchProductsByName.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload;


        },
        [searchProductsByName.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [searchProductsByName.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        //////////////////////////////////////////////////////////////////////


    }

})
export { searchProductsByName }
export default searchProductSlice.reducer;
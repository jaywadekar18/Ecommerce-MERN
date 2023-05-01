import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';
const notify = (msg,type) => { if (type == 'info') toast.info(msg); else toast.success(msg) };
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        status: '',
        error: null,
        data: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []

    },
    reducers: {
        postCartData: (state, { payload }) => {
            let items = localStorage.getItem('cartItem');

            if (items) {
                let parsedData = JSON.parse(items)
                let exist = parsedData.find((item) => (item._id === payload._id));
                if (exist) {
                    //alert('This item already exists in cart');
                    notify('This item already exists in cart', 'info')

                }
                else {
                    let parsedData = JSON.parse(items)
                    parsedData.push(payload);
                    state.data = parsedData;
                    localStorage.setItem('cartItem', JSON.stringify(parsedData));
                    notify('Item added successfully!!!', 'success')
                }

            }
            else {
                let data = [payload];
                state.data = data;
                localStorage.setItem('cartItem', JSON.stringify(data))

            }

        },
        getCartData: (state, action) => {
            const items = localStorage.getItem('cartItem');
            let parsedData = JSON.parse(items)
            state.data = parsedData;

        },
        deleteCartData: (state, { payload }) => {
            let items = localStorage.getItem('cartItem');
            let parsedData = JSON.parse(items);
            let updatedData = parsedData.filter((item) => item._id !== payload);
            state.data = updatedData;
            localStorage.setItem('cartItem', JSON.stringify(updatedData))
        },
        updateCartData: (state, { payload }) => {
            let items = localStorage.getItem('cartItem');

            let parsedData = JSON.parse(items);
            let obj = parsedData.find(obj => obj._id == payload[0]);
            let newObj = { ...obj, quantity: payload[1] };
            let updatedList = parsedData.map((data) => (data._id === payload[0] ? newObj : data))


            state.data = updatedList;
            localStorage.setItem('cartItem', JSON.stringify(updatedList))


        }


    },
    extraReducers: {

    }


})
export const { postCartData, getCartData, deleteCartData, updateCartData } = cartSlice.actions

export default cartSlice.reducer;
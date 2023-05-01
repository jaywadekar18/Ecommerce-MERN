import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const loginUser = createAsyncThunk('users/loginUser', async (data, { rejectWithValue }) => {

    try {
        const response = await axios.post(`/api/users/login`, data);

        return response.data
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
        //throw Error(error)
    }
})
const getUserData = createAsyncThunk('users/getUserData', async (Email) => {
    try {
        const res = await axios.get(`/api/users`);

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})
const getMyData = createAsyncThunk('users/getMyData', async () => {
    try {
        const res = await axios.get(`/api/users/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.accessToken}`
            }
        });

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})
const deleteUserDataById = createAsyncThunk('users/deleteUserDataById', async (id) => {
    try {
        const res = await axios.delete(`/api/users/${id}`, {
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
const updateUserData = createAsyncThunk('users/updateUserData', async (data) => {
    try {
        const res = await axios.put('/api/users', data, {
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
const getUserDataByEmail = createAsyncThunk('users/getUserDataByEmail', async (Email) => {
    try {
        const res = await axios.get(`/api/users/${Email}`);

        return res.data
    }
    catch (error) {
        throw Error(error)
    }
})

const postUserData = createAsyncThunk('users/postUserData', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/users', user);

        return response.data
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
const userSlice = createSlice({
    name: 'users',
    initialState: {
        status: '',
        error: null,
        data: [],
        loggedInUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

    },
    reducers: {
        logOut: (state, action) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('cartItem');
            localStorage.removeItem('user');
            state.loggedInUser = null
        }
    },
    extraReducers: {
        [getUserData.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload;


        },
        [getUserData.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [getUserData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        /////////////////////////

        [updateUserData.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = [];
        },
        [updateUserData.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [updateUserData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        //////////////////////////////////////////////////////////////////
        [deleteUserDataById.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = [];


        },
        [deleteUserDataById.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [deleteUserDataById.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        /////////////////////////////////
        [getMyData.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload;
            state.loggedInUser = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload));


        },
        [getMyData.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [getMyData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        /////////////////////////////////////////
        [getUserDataByEmail.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = action.payload;


        },
        [getUserDataByEmail.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [getUserDataByEmail.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = []

        },
        ///////////////////////////////////////////////////////////////////////////////
        [postUserData.fulfilled]: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.data = [];
            alert('Welcome!! You can now login..')


        },
        [postUserData.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [postUserData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.error.message || action.error.message;
            state.data = [];
            alert(action.payload.error.message)

        },

        ////////////////////////////////////
        [loginUser.fulfilled]: (state, action) => {

            state.status = 'success';
            state.error = null;
            state.data = action.payload;

            localStorage.setItem('accessToken', action.payload.accessToken);



        },
        [loginUser.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
            state.data = []

        },
        [loginUser.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.error.message || action.error.message;
            state.data = [];
            alert(state.error)

        }
    }

})
export const { logOut } = userSlice.actions

export { postUserData, getUserDataByEmail, loginUser, getUserData, getMyData, updateUserData, deleteUserDataById }
export default userSlice.reducer;
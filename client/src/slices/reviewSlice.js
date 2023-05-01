import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getReviewsById = createAsyncThunk(
    "reviews/getReviewsById",
    async (id) => {
        try {
            const res = await axios.get(`/api/reviews/${id}`);

            return res.data;
        } catch (error) {
            throw Error(error);
        }
    }
);

const deleteReviewById = createAsyncThunk(
    "reviews/deleteReviewById",
    async (productId, reviewId) => {
        try {
            const res = await axios.delete(`/api/products/${productId}/${reviewId}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.accessToken,
                },
            });

            return res.data;
        } catch (error) {
            throw Error(error);
        }
    }
);
const postReview = createAsyncThunk(
    "reviews/postReview",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/users", user);

            return response.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);
const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        status: "",
        error: null,
        data: [],
    },
    reducers: {},
    extraReducers: {
        /////////////////////////////////////////////////////////////////////////////////////
        [getReviewsById.fulfilled]: (state, action) => {
            state.status = "success";
            state.error = null;
            state.data = action.payload;
        },
        [getReviewsById.pending]: (state, action) => {
            state.status = "pending";
            state.error = null;
            state.data = [];
        },
        [getReviewsById.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.data = [];
        },
        [deleteReviewById.fulfilled]: (state, action) => {
            state.status = "success";
            state.error = null;
            state.data = [];
        },
        [deleteReviewById.pending]: (state, action) => {
            state.status = "pending";
            state.error = null;
            state.data = [];
        },
        [deleteReviewById.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.data = [];
        },
        ////////////////////////////////////////////////
        [postReview.fulfilled]: (state, action) => {
            state.status = "success";
            state.error = null;
            state.data = [];
            alert("Review posted successfully!!");
        },
        [postReview.pending]: (state, action) => {
            state.status = "pending";
            state.error = null;
            state.data = [];
        },
        [postReview.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.error.message || action.error.message;
            state.data = [];
            alert(action.payload.error.message);
        },
    },
});
export { getReviewsById, deleteReviewById, postReview };
export default reviewSlice.reducer;

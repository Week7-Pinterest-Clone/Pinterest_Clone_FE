import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//state
const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

const headers = {
  Authorization: `Bearer ${}`,
};

//thunk middleware

// ** addComment **
export const __addComments = createAsyncThunk(
  "commentList/addComments",
  async (commentData, thunkAPI) => {
    //console.log(commentData.postId);
    try {
      const { data } = await axios.post(
        `serverUrl/comments/${commentData.postId}`,
        { comment: commentData.comment },
        { headers }
      );
     // console.log("댓글요", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ** getComment **

export const __getComments = createAsyncThunk(
  "commentList/getComments",
  async (payload, thunkAPI) => {
    console.log("getcomments", payload);
    try {
      const { data } = await axios.get(
        `serverUrl/comments/${payload}`
      );
      console.log(data);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ** deleteComment **
export const __deleteComments = createAsyncThunk(
  "commentList/deleteComments",
  async (commentId, thunkAPI) => {
   // console.log(commentId);
    try {
      await axios.delete(`serverUrl/comments/${commentId}`, {
        headers,
      });
      return thunkAPI.fulfillWithValue(commentId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ** editComment ** //
export const __editComments = createAsyncThunk(
  "commentList/editComments",
  async (commentId, thunkAPI) => {
    try {
      //commentId.id = id들 중에 id하나.
      await axios.put(`serverUrl/comments/${commentId}`, commentId, {
        headers,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//reducer, extrareducers

const commentListSlice = createSlice({
  name: "commentList",
  initialState,
  reducers: {},
  extraReducers: {
    // ** addComments ** //
    [__addComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment.unshift(action.payload);
    },
    [__addComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ** getComments ** //
    [__getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      console.log("action", action.payload);
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ** putComments ** //
    [__editComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComments.fulfilled]: (state, action) => {
      console.log("action", action.payload);
      state.isLoading = false;
      console.log(action.payload);
      const target = state.comment.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comment.splice(target, 1, action.payload);
    },
    [__editComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ** deleteComments ** //
    [__deleteComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      const target = state.comment.findIndex(
        (comment) => comment.id === action.payload
      );
      state.comment.splice(target, 1);
    },
    [__deleteComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = commentListSlice.actions;
export default commentListSlice.reducer;

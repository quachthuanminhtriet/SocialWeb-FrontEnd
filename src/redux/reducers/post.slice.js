

import { createSlice } from "@reduxjs/toolkit";
import {
  POST_ACTION_GETALL,
  POST_ACTION_CREATE,
  POST_ACTION_REACTION,
  POST_ACTION_COMMENT_CREATE,
  POST_ACTION_COMMENT_GETALL,
} from "../actions/post.action";


const initialState = {
    data: null,
    isLoading: false,
    error: null,
    view: {
      isOpen: false,
      data: null,
      postId: null
    }
}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setViewDetail: (state, action) => {
        state.view.data = action.payload; // Chọn bài viết để hiển thị trong modal
    },
    showModal: (state, action) => {
      state.view.isOpen = true;
      state.view.postId = action.payload.postId
    },
    hideModal: (state) => {
      state.view.isOpen = false;
      state.view.data = null; // Xóa bài viết đã chọn khi đóng modal
      state.view.postId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // HANDLE GET ALL POST REQUEST
      .addCase(POST_ACTION_GETALL.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(POST_ACTION_GETALL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(POST_ACTION_GETALL.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // HANDLE POST CREATE REQUEST
      .addCase(POST_ACTION_CREATE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(POST_ACTION_CREATE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [action.payload, ...state.data];
      })
      .addCase(POST_ACTION_CREATE.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // HANDLE USER REACTION POST REQUEST
      .addCase(POST_ACTION_REACTION.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(POST_ACTION_REACTION.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex(
          (post) => post.id === action.payload.postId
        );

        // Handle reaction status
        if (action.payload.status === "REACTION") {
          state.data[index].isUserInteracted = true;
          state.data[index].reactionNumber += 1;
        } else if (action.payload.status === "UNREACTION") {
          state.data[index].isUserInteracted = false;
          state.data[index].reactionNumber -= 1;
        } else if (action.payload.status === "UPDATEREACTION") {
          state.data[index].isUserInteracted = true;
        }
      })
      .addCase(POST_ACTION_REACTION.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // HANDLE USER COMMENT POST REQUEST
      .addCase(POST_ACTION_COMMENT_CREATE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(POST_ACTION_COMMENT_CREATE.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(POST_ACTION_COMMENT_CREATE.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // HANDLE GET COMMENT OF POST REQUEST
      .addCase(POST_ACTION_COMMENT_GETALL.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(POST_ACTION_COMMENT_GETALL.fulfilled, (state, action) => {
        console.log(
          "POST_ACTION_COMMENT_GETALL view payload data: ",
          action.payload.length
        );
        if (action.payload.length > 0) {
          const index = state.data.findIndex(
            (post) => post.id === action.payload[0].postId
          );
          var updateState = state.data;
          updateState[index].commentList = action.payload;
          state.data = [...updateState];
        }

        state.isLoading = false;
      })
      .addCase(POST_ACTION_COMMENT_GETALL.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default postSlice;

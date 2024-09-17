
import postSlice from "../reducers/post.slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCaller, endpoints } from "../../configs/APIs";
import cookie from "react-cookies";


// Action thunk - Get all post
export const POST_ACTION_GETALL = createAsyncThunk(
  "POST/GETALL",
  async (thunkAPI) => {
    var api = apiCaller(endpoints["posts"].get);
    var response = await api.get();
    return response.data.data;
  }
);

// Action thunk - Create a new post
export const POST_ACTION_CREATE = createAsyncThunk(
  "POST/CREATE",
  async (args, thunkAPI) => {
    var formData = args.form;
    const token = cookie.load("access-token")
      ? cookie.load("access-token")
      : null;
    var api = apiCaller(endpoints["posts"].create, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    var response = await api.post(formData);
    return response.data.data;
  }
);

// Action thunk - Reaction to post
export const POST_ACTION_REACTION = createAsyncThunk(
  "POST/REACTION",
  async (args, thunkAPI) => {
    var { postId, reactionType, isUpdate } = args;
    const token = cookie.load("access-token")
      ? cookie.load("access-token")
      : null;
    var api = apiCaller(endpoints["posts"].reaction + "/" + postId + "?" + "reactionType=" + reactionType, {
      headers: {
        Authorization: "Bearer " + token,
      }
    });
    var response = await api.post();
    if(isUpdate) {
      response.data.data.status = "UPDATEREACTION"
    }
    return response.data.data;
  }
);

// Action thunk - Comment to post
export const POST_ACTION_COMMENT_CREATE = createAsyncThunk(
  "POST/COMMENT/CREATE",
  async (args, thunkAPI) => {
    var { postId, content } = args;
    // Handle Authentication token
    const token = cookie.load("access-token")? cookie.load("access-token"): null;
    var api = apiCaller(endpoints["posts"].comment.create + "/" + postId + "?" + "content=" + content, {
      headers: {
        Authorization: "Bearer " + token,
      }
    });
    var response = await api.post();
    return response.data.data;
  }
);

// Action thunk - Get all comment of post
export const POST_ACTION_COMMENT_GETALL = createAsyncThunk(
  "POST/COMMENT/GETALL",
  async (args, thunkAPI) => {
    var { postId } = args;
    // Handle Authentication token
    const token = cookie.load("access-token")? cookie.load("access-token"): null;
    var api = apiCaller(endpoints["posts"].comment.get + "/" + postId, {
      headers: {
        Authorization: "Bearer " + token,
      }
    });

    var response = await api.get();
    return response.data.data;
  }
);




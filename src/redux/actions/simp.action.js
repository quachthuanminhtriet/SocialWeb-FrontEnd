import postSlice from "../reducers/post.slice";



// SIMPLE ACTIONS IN POST SLICE
export const { 
    showModal : POST_ACTION_SHOWMODAL_DETAIL, 
    hideModal :  POST_ACTION_HIDEMODAL_DETAIL,
    setViewDetail: POST_ACTION_SETDATA_DETAIL
} = postSlice.actions;
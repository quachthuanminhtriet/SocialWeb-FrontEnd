import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, Routes } from "react-router-dom";
import "./NewFeedLayout.scss";
import sessions from "react-cookies";
import { useDispatch, useSelector } from "react-redux";
import ModalView from "../../components/ModalView/ModalView";
import PostDetail from "../../components/PostDetail/PostDetail";
import { POST_ACTION_SETDATA_DETAIL } from "../../redux/actions/simp.action";


const NewFeedLayout = () => {
  // REDUX STATE
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  

  // COMPONENT STATE
  const [isViewDetail, setIsViewDetail] = useState(false);

  /* =================== COMPONENT LIFE CYCLE ===================== */



  useEffect(() => {
    if(state.posts) {
      setIsViewDetail(state.posts.view.isOpen)
      if(state.posts.view.isOpen && state.posts.view.postId) {
        var dataView = state.posts.data.filter(post => post.id === state.posts.view.postId)
        if(dataView[0])
          dispatch(POST_ACTION_SETDATA_DETAIL(dataView[0]))
      }
    }

 

  }, [state.posts])
  


  return (
    <div className="NewFeedLayout">
      <div className="layout-main">
        {/* Sidebar */}
        <div className="layout-main__sidebar">
          <Sidebar />
        </div>

        {/* Content  */}
        <div className="layout-main__container">
          <Outlet />
        </div>

        {/* Modal UI */}
        <div className="layout-main_modal">
          <ModalView isActive={isViewDetail}>
            <PostDetail />
          </ModalView>
        </div>
      </div>
    </div>
  );
};

export default NewFeedLayout;

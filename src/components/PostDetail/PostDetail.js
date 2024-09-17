import React, { useEffect, useState } from "react";
import "./PostDetail.scss";
import { useDispatch, useSelector } from "react-redux";

const PostDetail = () => {
  // REDUX STATE
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // COMPONENT STATE
  const [postview, setPostView] = useState([]);

  /* =================== COMPONENT LIFE CYCLE ===================== */
  useEffect(() => {
    if (state.posts) {
      setPostView(state.posts.view.data);
    }

    console.log("View post selected: ", state.posts.view.data);
  }, [state]);


  /* GET FULLNAME ------------------- */
  const getFullName = (firstName, lastName) => {
    return firstName + " " + lastName;
  };


  return (
    <div className="PostDetail">
      <div className="post-detail_container">
        <div className="media">
          <img src="https://th.bing.com/th/id/R.49c8a35e584a3e990112f31df7ccf522?rik=muqsxbsOgmlYuw&pid=ImgRaw&r=0" />
        </div>
        <div className="content">
          <div className="owner-info">
            <div className="owner-info_left">
              <div className="avatar">
                <img src={postview.owner.profile.avatar.url} />
              </div>
              <p>{getFullName(postview.owner.profile.firstName, postview.owner.profile.lastName)}</p>
            </div>
            <div className="owner-info_right">
              <i class="bi bi-three-dots"></i>
            </div>
          </div>
          <div className="comment-board">
            <div className="comment-list">
              {postview.commentList &&
                postview.commentList.map((comment) => {
                  return (
                    <div className="comment-item">
                      <div className="avatar">
                        <img src={comment.user.profile.avatar.url} />
                      </div>
                      <span>
                        <span className="username">{getFullName(comment.user.profile.firstName, comment.user.profile.lastName)}</span>
                        {comment.content}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="actions">Updating...</div>
          <div className="comment-bar">Updating...</div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

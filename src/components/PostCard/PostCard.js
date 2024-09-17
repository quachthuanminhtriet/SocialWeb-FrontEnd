import React, { useEffect, useState } from "react";
import "./PostCard.scss";
import { decryptHTML } from "../../utils/Crypto";

import GridOne from "../ImageLayout/GridOne/GridOne";
import { POST_ACTION_COMMENT_CREATE, POST_ACTION_COMMENT_GETALL, POST_ACTION_REACTION } from "../../redux/actions/post.action";
import { useDispatch, useSelector } from "react-redux";
import ThunThunIcon from "../../assets/images/thun_thun_reaction_icon.png";
import SadIcon from "../../assets/images/sad_reaction_icon.png";
import LikeIcon from "../../assets/images/like_reaction_icon.png";
import HahaIcon from "../../assets/images/haha_reaction_icon.png";
import LikeFIcon from "../../assets/images/likef_reaction_icon.png";
import RenderReactionUI from "./RenderReactionUI/RenderReactionUI";
import { POST_ACTION_SHOWMODAL_DETAIL } from "../../redux/actions/simp.action";

const PostCard = ({ data }) => {
  // REDUX STATE
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // COMPONENT STATS
  const [clickTimeout, setClickTimeout] = useState(null);
  const [emotion, setEmotion] = useState("DEFAULT");
  const [comment, setComment] = useState("");
  const [commentSelfList, setCommentSelfList] = useState([]);
  const [reaction, setReaction] = useState({
    isInteracted: false,
    emotion: "DEFAULT",
    number: 0,
  });
  // COMPONENT VARIABLES
  const dispatchDelay = 500;

  /* =================== COMPONENT LIFECYCLE ===================== */

  useEffect(() => {
    setReaction({
      emotion: data.userInteraction
        ? data.userInteraction.reactionType
        : "DEFAULT",
      number: data.reactionNumber,
      isInteracted: data.userInteraction ? true : false,
    });
  }, []);

  useEffect(() => {
    if (data.userInteraction) setEmotion(data.userInteraction.reactionType);
    else setEmotion("DEFAULT");
  }, [data]);

  /* =================== COMPONENT FUNCTIONS ===================== */

  /* GET FULLNAME ------------------- */
  const getFullName = (firstName, lastName) => {
    return firstName + " " + lastName;
  };

  /* HANDLE TEXT SUMMARY ------------------- */
  const textSummary = (text) => {
    return text.slice(0, 180) + (text.length < 180 ? ".   " : "... ");
  };

  /* HANDLE VIEW DETAILED CONTENT ------------------- */
  const onViewDetailContent = (e) => {
    const detailBtnElm = e.currentTarget;
    const contentParentElm = detailBtnElm.parentElement;
    const contentElm = contentParentElm.querySelector("span.content");
    const summaryContentElem =
      contentParentElm.querySelector(".content-summary");
    summaryContentElem.style.maxHeight = "fit-content";
    summaryContentElem.style.overflow = "auto";
    contentElm.dangerouslySetInnerHTML = data.content;
    detailBtnElm.style.display = "none";
  };

  /* CONVERT TIME TO HOURS ------------------- */
  const convertTimeToHours = (time) => {
    const date = new Date(time);
    const now = new Date(); // Lấy thời gian hiện tại
    const diffInMilliseconds = now - date; // Tính toán chênh lệch thời gian
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Chuyển đổi chênh lệch sang giờ
    return diffInHours;
  };

  const getDaysInCurrentYear = () => {
    const year = new Date().getFullYear(); // Lấy năm hiện tại
    const start = new Date(year, 0, 1); // Ngày đầu tiên của năm
    const end = new Date(year + 1, 0, 1); // Ngày đầu tiên của năm tiếp theo
    const diff = end - start; // Sự khác biệt về thời gian tính bằng milliseconds
    const days = diff / (1000 * 60 * 60 * 24); // Chuyển đổi milliseconds sang ngày
    return days;
  };

  const getDaysInCurrentMonth = () => {
    const date = new Date(); // Lấy ngày hiện tại
    const year = date.getFullYear(); // Lấy năm hiện tại
    const month = date.getMonth(); // Lấy tháng hiện tại (0-11)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return daysInMonth;
  };

  /* CONVERT TO SINCE POST CREATED ------------------- */
  const convertTimeSince = (time) => {
    var hours = Math.floor(convertTimeToHours(time));
    var minutes = Math.floor((convertTimeToHours(time) - hours) * 60); // Tính số phút
    const hoursInADay = 24;
    const daysInAMonth = getDaysInCurrentMonth();
    const daysInAYear = getDaysInCurrentYear();

    if (hours >= hoursInADay * daysInAYear) {
      const years = Math.floor(hours / (hoursInADay * daysInAYear));
      return `${years} năm trước`;
    } else if (hours >= hoursInADay * daysInAMonth) {
      const months = Math.floor(hours / (hoursInADay * daysInAMonth));
      return `${months} tháng trước`;
    } else if (hours >= hoursInADay) {
      const days = Math.floor(hours / hoursInADay);
      return `${days} ngày trước`;
    } else if (hours >= 1) {
      return `${hours} giờ trước`;
    } else {
      return `${minutes} phút trước`;
    }
  };

  const convertHTMLToText = (html) => {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    var textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.trim();
  };

  /* INNER HTML ------------------- */
  const HtmlContent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  /* HANDLE REACTION TO POST ------------------- */
  const onReactionClicked = (type) => {
    // Clear timeout action if user spam
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    var currentEmotion = reaction.emotion !== type ? type : "DEFAULT";
    if (type === "DEFAULT") {
      // SET CLIENT DEFAUTL
      setReaction({
        ...reaction,
        emotion: "LOVE",
        isInteracted: true,
        number: reaction.number + 1,
      });
      currentEmotion = "LOVE";
    } else {
      // SET CLIENT EMOTION
      setReaction({
        ...reaction,
        emotion: reaction.emotion !== type ? type : "DEFAULT",
        isInteracted:
          reaction.emotion === type
            ? !reaction.isInteracted
            : reaction.emotion !== type
            ? true
            : false,
        number: !reaction.isInteracted
          ? reaction.number + 1
          : reaction.emotion !== type
          ? reaction.number
          : reaction.number - 1,
      });
      currentEmotion = reaction.emotion !== type ? type : "DEFAULT";
    }

    // tạo timeout block spam
    const newTimeout = setTimeout(() => {
      if (emotion === currentEmotion) {
        return;
      }

      if (reaction.emotion !== "DEFAULT") {
        dispatch(
          POST_ACTION_REACTION({
            postId: data.id,
            reactionType: type,
            isUpdate: true,
          })
        );
      } else {
        dispatch(
          POST_ACTION_REACTION({
            postId: data.id,
            reactionType: type === "DEFAULT" ? "LOVE" : type,
            isUpdate: false,
          })
        );
      }

      console.log("before set emotion");

      setEmotion(currentEmotion);
    }, dispatchDelay);

    setClickTimeout(newTimeout);
  };

  /* SET COMMENT CHANGE ------------------- */
  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  /* HANDLE SEND COMMENT TO POST ------------------- */
  const onSendComment = () => {
    if (comment.length === 0 || comment === "") {
      return;
    }

    dispatch(POST_ACTION_COMMENT_CREATE({
      postId: data.id,
      content: comment
    }))



    var arrayList = commentSelfList;
    arrayList.push(comment);
    setCommentSelfList([...arrayList]);
    setComment("");
  };

  /* LISTEN ENTER PRESS ------------------- */
  const handleCommentKeyDown = (event) => {
    if (event.key === "Enter") {
      onSendComment();
    }
  };

  /* HANDLE VIEW ALL COMMENT CLICKED ------------------- */
  const onViewAllComment = () => {
    dispatch(POST_ACTION_COMMENT_GETALL({
      postId: data.id
    }))


    dispatch(POST_ACTION_SHOWMODAL_DETAIL({
      postId: data.id
    }))
  }

  return (
    <div className="PostCard">
      <div className="post-card">
        <div className="post-card_header">
          <div className="avatar">
            <img src={data.owner.profile.avatar.url} alt="avartar" />
          </div>
          <div className="info">
            <p className="name">
              <span>
                {getFullName(
                  data.owner.profile.firstName,
                  data.owner.profile.lastName
                )}
                <i className="time">{convertTimeSince(data.createdAt)}</i>
              </span>
              <span className="hightlight-major">
                {data.owner.profile.spec.major.alias}
              </span>
            </p>
            <p className="role">
              <b>{data.owner.profile.spec.alias}</b> /{" "}
              <span style={{ fontStyle: "italic" }}>
                {data.owner.profile.spec.name}
              </span>
            </p>
          </div>
        </div>
        <div className="post-card_media">
          <div className="grid-container_contain grid-style">
            <div className="grid-row">
              {/* RENDER SINGLE IMAGE  */}
              {data.mediaList.map((media) => {
                return (
                  <div className={"grid-col"} key={"post-card-img-" + media.id}>
                    <GridOne media={media} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="post-card_reactions">
          <div className="reaction-icons">
            <div className="icon emotions">
              <div className="reaction-icons_container">
                <div
                  className="icon-more"
                  onClick={() => onReactionClicked("LOVE")}
                >
                  <i className="bi bi-heart-fill"></i>
                </div>
                <div className="icon-more">
                  <img
                    src={LikeIcon}
                    alt="like"
                    onClick={() => onReactionClicked("LIKE")}
                  />
                </div>

                <div className="icon-more">
                  <img
                    src={HahaIcon}
                    onClick={() => onReactionClicked("HAHA")}
                    alt="haha"
                  />
                </div>
                <div className="icon-more">
                  <img
                    src={ThunThunIcon}
                    onClick={() => onReactionClicked("THUNTHUN")}
                    alt="thunthun"
                  />
                </div>
                <div className="icon-more">
                  <img
                    src={SadIcon}
                    onClick={() => onReactionClicked("SAD")}
                    alt="sad"
                  />
                </div>
              </div>

              {/* RENDER DEFAULT REACTION */}
              <div className="icon-default">
                <RenderReactionUI
                  isInteracted={reaction.isInteracted}
                  reactionType={reaction.emotion}
                  target={data}
                  onReactionClicked={onReactionClicked}
                />
              </div>
            </div>
            <div className="icon chat">
              <i className="bi bi-chat"></i>
            </div>
            <div className="icon share">
              <i className="bi bi-send"></i>
            </div>
          </div>
          <div className="reaction-pin">
            <i className="bi bi-bookmark-star"></i>
          </div>
          <div className="reactions-number">
            <span>{reaction.number} lượt bày tỏ cảm xúc </span>
          </div>
        </div>
        <div className="post-card_content">
          <span className="content-summary">
            <span className={"summary"}>
              <span className="content">
                <HtmlContent html={decryptHTML(data.content)} />
              </span>
            </span>
          </span>
          {convertHTMLToText(decryptHTML(data.content)).length > 180 && (
            <span className="detailed-btn" onClick={onViewDetailContent}>
              Xem thêm
            </span>
          )}
        </div>
        <div className="number-comment" onClick={onViewAllComment}>
          {data.commentNumber !== 0 && (
            <p>Xem thêm {data.commentNumber} bình luận</p>
          )}
        </div>
        <div className={"post-card_comment--self " + (commentSelfList.length > 0 ? "comment-padding" : "") }>
          {commentSelfList.map((comment, index) => {
            return (
              <div className="comment-self_item" key={"self-comment_" + index}>
                <div className="commentor">
                  <img src={state.profile.data.avatar.url} />
                </div>
                <div className="comment-info">
                  <span>
                    {state.profile.data
                      ? getFullName(
                          state.profile.data.firstName,
                          state.profile.data.lastName
                        )
                      : "Unknow"}
                  </span>
                  <span>{comment}</span>
                  <div className="comment-actions">
                    <div className="comment-created">Vừa xong</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="post-card_comments">
          <input
            type="text"
            placeholder="Thêm bình luận ..."
            name="comment"
            value={comment}
            onChange={onCommentChange}
            onKeyDown={handleCommentKeyDown}
          />
          {comment !== "" && (
            <div className="send-btn" onClick={onSendComment}>
              <i className="bi bi-arrow-up-square-fill"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

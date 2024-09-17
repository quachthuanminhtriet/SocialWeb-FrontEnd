import React from "react";
import ThunThunIcon from "../../../assets/images/thun_thun_reaction_icon.png";
import SadIcon from "../../../assets/images/sad_reaction_icon.png";
import LikeIcon from "../../../assets/images/like_reaction_icon.png";
import HahaIcon from "../../../assets/images/haha_reaction_icon.png";
import LikeFIcon from "../../../assets/images/likef_reaction_icon.png";


const ReactionIcon = ({ icon, onClick }) => (
  <div className="icon-set" onClick={onClick}>
    {icon}
  </div>
);

const RenderReactionUI = React.memo(
  ({ reactionType, target, onReactionClicked, isInteracted }) => {
    const handleClick = (reaction) => {
      onReactionClicked(reaction);
    };

    const renderIcon = () => {
      switch (reactionType) {
        case "LOVE":
          return <i className="bi bi-heart-fill"></i>;
        case "LIKE":
          return <img src={LikeIcon} alt="Like" />;
        case "HAHA":
          return <img src={HahaIcon} alt="Haha" />;
        case "THUNTHUN":
          return <img src={ThunThunIcon} alt="ThunThun" />;
        case "SAD":
          return <img src={SadIcon} alt="Sad" />;
        default:
          return <i className="bi bi-heart"></i>;
      }
    };

    return (
      <ReactionIcon
        icon={renderIcon()}
        onClick={() => handleClick(reactionType)}
      />
    );
  }
);

export default RenderReactionUI;

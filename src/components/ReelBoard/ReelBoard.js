import React from "react";
import "./ReelBoard.scss";

const ReelBoard = () => {
  return (
    <div className="ReelBoard">
      <div className="reel-board_container">
        <div className="reel-board_inner">
          <div className="reel-board_box">
            <div className="owner-ava">
              <img src="https://th.bing.com/th/id/OIP.Bl849idEopgI5ezchWyBIQHaHa?rs=1&pid=ImgDetMain"/>
            </div>
          </div>
           <div className="reel-board_box">
            <div className="owner-ava">
              <img src="https://th.bing.com/th/id/OIP.Bl849idEopgI5ezchWyBIQHaHa?rs=1&pid=ImgDetMain"/>
            </div>
          </div>
           <div className="reel-board_box">
            <div className="owner-ava">
              <img src="https://th.bing.com/th/id/OIP.Bl849idEopgI5ezchWyBIQHaHa?rs=1&pid=ImgDetMain"/>
            </div>
          </div>
           <div className="reel-board_box">
            <div className="owner-ava">
              <img src="https://th.bing.com/th/id/OIP.Bl849idEopgI5ezchWyBIQHaHa?rs=1&pid=ImgDetMain"/>
            </div>
          </div>
           <div className="reel-board_box">
            <div className="owner-ava">
              <img src="https://th.bing.com/th/id/OIP.Bl849idEopgI5ezchWyBIQHaHa?rs=1&pid=ImgDetMain"/>
            </div>
          </div>
        </div>
      </div>
      <div className="reel-board_prev"></div>
      <div className="reel-board_next">
        <i className="bi bi-chevron-right"></i>
      </div>
    </div>
  );
};

export default ReelBoard;

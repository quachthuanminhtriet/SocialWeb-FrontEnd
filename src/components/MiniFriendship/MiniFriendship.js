import React from "react";
import "./MiniFriendship.scss";

const MiniFriendship = () => {
  return (
    <div className="MiniFriendship">
      <div className="mini-friendship_title">
        <p>Danh sách bạn bè</p>
        <p>Kết nối các bạn của bạn ngay thôi nào</p>
      </div>
      <p className="view-more">Xem tất cả</p>
      <div className="mini-friendship_list">
        <div className="friend-tag">
          <div className="info">
            <p>Ying Yang</p>
            <p className="status-online">Online</p>
          </div>
          <div className="avatar">
            <img src="https://th.bing.com/th/id/R.f8b05134a1290f5023eaf7c27caec70b?rik=5Bi1MdxpSESETw&pid=ImgRaw&r=0" />
          </div>
        </div>
        <div className="friend-tag">
          <div className="info">
            <p>Gilfoyle</p>
            <p className="status-online">Online</p>
          </div>
          <div className="avatar">
            <img src="https://productplacementblog.com/wp-content/uploads/2019/12/Red-Bull-Energy-Drink-Enjoyed-by-Martin-Starr-as-Bertram-Gilfoyle-in-Silicon-Valley-Season-6-Episode-6-768x432.jpg" />
          </div>

        </div>
        <div className="friend-tag">
          <div className="info">
            <p>Dinesh</p>
            <p className="status-online">Online</p>
          </div>
          <div className="avatar">
            <img src="https://th.bing.com/th/id/OIP.3yDMNcroF0K-mNjVEuRVxAHaJ1?rs=1&pid=ImgDetMain" />
          </div>

        </div>
        <div className="friend-tag">
          <div className="info">
            <p>Erlich bachman</p>
            <p className="status-offline">Offline</p>
          </div>
          <div className="avatar">
            <img src="https://th.bing.com/th/id/OIP.Bl849idEopgI5ezchWyBIQHaHa?rs=1&pid=ImgDetMain" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MiniFriendship;

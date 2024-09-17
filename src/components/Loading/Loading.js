import React from "react";
import "./Loading.scss";

const Loading = ({ isLoading = false }) => {
  return (
    <>
      {isLoading && (
        <div className="Loading">
          <div className="loading-icon">
            <img src="https://i.pinimg.com/originals/07/24/88/0724884440e8ddd0896ff557b75a222a.gif" />
          </div>
          <p>Chờ tẹo chờ tẹo</p>
        </div>
      )}
    </>
  );
};

export default Loading;

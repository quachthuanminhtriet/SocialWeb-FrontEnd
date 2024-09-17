import React, { useEffect } from "react";
import "./MiniProfile.scss";
import cookies from "react-cookies";
import { useNavigate } from "react-router-dom";

const MiniProfile = ({ data }) => {
  const navigate = useNavigate();

  useEffect(() => {}, [data]);

  const logout = () => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất tài khoản này này?"
    );

    if (isConfirmed) {
      cookies.remove("access-token", { path: "/" });
      cookies.remove("isApproved", { path: "/" });
      cookies.remove("studentID", { path: "/" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const navProfile = () => {
    navigate("/profile");
  }

  return (
    <div className="MiniProfile">
      {data && (
        <>
          <div className="mini-profile_info">
            <div className="avatar" onClick={navProfile}>
              <img src={data && data.avatar ? data.avatar.url : "https://www.flykovalam.com/images/team/01.jpg"} />
            </div>
            <div className="info">
              <p>
                {data.firstName} {data.lastName}
              </p>
              <p>{data && data.spec ? data.spec.major.name: "Updating..."}</p>
            </div>
          </div>
          <div className="mini-profile_logout" onClick={logout}>
            Logout
          </div>
        </>
      )}
    </div>
  );
};

export default MiniProfile;

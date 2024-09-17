import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import cookies from "react-cookies";
import { PROFILE_ACTION_GET } from "../../redux/actions/profile.action";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlankProfile, setIsBlankProfile] = useState(false);
  const navigate = useNavigate();

  /* REDUX STATE */
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  /*  JWT TOKEN */
  const token = cookies.load("access-token");
  const isApproved = cookies.load("isApproved");

  /*=========================== COMPONENT LIFE CYCLE ===========================*/

  useEffect(() => {
    if (token && getPayloadFromJWT(token) != null) {
      setIsLoading(true);
      dispatch(
        PROFILE_ACTION_GET({
          studentID: getPayloadFromJWT(token),
        })
      );
    }
    if (isApproved === false) {
      setIsBlankProfile(true);
    }
  }, []);

  useEffect(() => {
    if (state.profile && state.profile.data) {
      setProfile(state.profile.data);
      console.log(state.profile.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [state.profile]);

  /*=========================== COMPONENT FUNCTIONS ===========================*/

  /* ONCLICK EDIT BUTTON  ------------------- */
  const onClickEdit = () => {
    navigate("/profile/edit");
  };

  // Get data payload from jwt token
  const getPayloadFromJWT = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;
      return payload.sub;
    } catch (e) {
      return null;
    }
  };

  // Get fullname user with last name and first name
  const getFullName = (firstName, lastName) => {
    if (lastName && firstName) {
      return firstName + " " + lastName;
    }
    return "Not found";
  };

  /*=========================== UI RENDERING ===========================*/
  // Loading UI
  const rednerLoadingUI = () => (
    <Col xs={12}>
      <Loading isLoading={isLoading} />
    </Col>
  );

  // Blank profile UI
  const renderBlankProfileUI = () => (
    <Col xs={9}>
      <div className="blank-profile">
        <div className="blank-image">
          <img src="https://www.contactmonkey.com/cm_wp/wp-content/uploads/2024/04/Internal-communication-job-descriptions-roles-and-responsibilities-scaled-1-1-1024x550.jpg" />
        </div>
        <div className="blank-text">
          <p>Hồ sơ của bạn chưa được phê duyệt</p>
          <p>
            Hoàn thành hồ sơ của bạn chính xác để quản trị viên có thể phê duyệt
            nha
          </p>
        </div>
        <div className="blank-profile-update">
          <button onClick={onClickEdit}>Cập nhật hồ sơ</button>
        </div>
      </div>
    </Col>
  );

  // Profile UI
  const renderProfileUI = () => (
    <Col xs={9}>
      {isApproved === false && <h1>Hellow world</h1>}
      <div className="user-information">
        <div className="user-information_container">
          <div className="wallpaper">
            <img src="https://th.bing.com/th/id/R.46a305c6c82622ac5a5bd587ae39be9a?rik=sSmuEHJcfWJhAw&riu=http%3a%2f%2fmattingly.design%2farticles%2fwp-content%2fuploads%2f2020%2f07%2fsilicon-valley-logo-story-arc.jpg&ehk=d5HJJZNDd8ZgByMb8q5Ob4dfopk3QSNJebVH7HFXG8g%3d&risl=&pid=ImgRaw&r=0" />
          </div>
          <div className="information">
            <div className="information-l">
              <div className="name">
                <p>{getFullName(profile.firstName, profile.lastName)}</p>
              </div>
              <div className="student-info">
                <div className="major">
                  <p>
                    {profile.spec.major.name} ( {profile.spec.major.alias} ) 
                  </p>
                  <p>/</p>
                  <p> {profile.spec.alias} Class </p>
                </div>
              </div>
            </div>
            <div className="information-r">
              <div className="edit">Chỉnh sửa hồ sơ</div>
              <div className="friends">Cài đặt</div>
            </div>
            <div className="friends"></div>
          </div>
          <div className="intro">
            <h5>Giới thiệu</h5>
            <p>
              {profile.introduce}
            </p>
          </div>
          <div className="avatar">
            <img src={profile.avatar.url} />
          </div>
        </div>
      </div>
      <div className="user-posted">
        <div className="title">
          <h5>Photos of you</h5>
          <p>When people tag you in photos, they'll appear here.</p>
        </div>
        <div className="pins-row">
          <div className="pins-col">
            <img src="https://th.bing.com/th/id/OIP.9G6_JbtWnLO1IZeODruEcgHaEK?rs=1&pid=ImgDetMain" />
          </div>
          <div className="pins-col">
            <img src="https://m.media-amazon.com/images/M/MV5BOWJlMDY5NWEtODJmZS00Mzk1LTg1Y2MtNWE2NTE5ZGI1MmJiXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_FMjpg_UX500_.jpg" />
          </div>
          <div className="pins-col">
            <img src="https://m.media-amazon.com/images/M/MV5BOGQ0YjhiYTAtMzVkZS00ZDE3LTlmNWQtZGZjNDAwODRlNjk1XkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_QL75_UX500_CR0,47,500,281_.jpg" />
          </div>
          <div className="pins-col">
            <img src="https://th.bing.com/th/id/OIP.J5d4dAguw1vv5ASQL4IwSAHaK-?w=1012&h=1500&rs=1&pid=ImgDetMain" />
          </div>
          <div className="pins-col">
            <img src="https://i.ytimg.com/vi/9m9fXyHPfwg/maxresdefault.jpg" />
          </div>
          <div className="pins-col">
            <img src="https://th.bing.com/th/id/OIP.i4rgD9TAvXqgYTnBFrla6wHaEo?w=640&h=400&rs=1&pid=ImgDetMain" />
          </div>
          <div className="pins-col">
            <img src="https://th.bing.com/th/id/OIP.8G212Ze2b4YnPdgUlsXoKgHaEK?w=1200&h=675&rs=1&pid=ImgDetMain" />
          </div>
        </div>
      </div>
    </Col>
  );

  return (
    <div className="Profile">
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ minHeight: "100vh" }}
        >
          {isLoading && rednerLoadingUI()}
          {isBlankProfile && !isLoading && renderBlankProfileUI()}
          {profile && !isBlankProfile && !isLoading && renderProfileUI()}
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

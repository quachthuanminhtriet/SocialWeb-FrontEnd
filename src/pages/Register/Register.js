import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import {
  USER_ACTION_REGISTER,
  USER_ACTION_STATE_CLEAR,
} from "../../redux/actions/user.action";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";

const Register = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    studentID: "",
    password: "",
  });

  /* Get redux state */
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  /*  Handle login form changed  */
  const onFieldChange = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const register = (event) => {
    console.log(USER_ACTION_STATE_CLEAR);
    event.preventDefault();
    dispatch(
      USER_ACTION_REGISTER({
        email: account.email,
        studentID: account.studentID,
        password: account.password,
      })
    );
  };

  useEffect(() => {
    if (state && state.user && state.user.data) {
      alert("register success");
      dispatch(USER_ACTION_STATE_CLEAR());
      setTimeout(() => {
        navigate("/login");
      }, 800);
    }
  }, [state.user]);

  return (
    <div className="Register">
      <div className="register-container">
        <div className="register-container_left">
          <div className="register-form">
            <h2>Đăng kí</h2>
            <p className="subtitle-primary">
              <span>Lưu ý:</span> Mọi thông tin cung cấp phải đúng sự thật và sẽ
              phải chờ ban quản trị của chúng tôi xác nhận và thông qua trước
              khi cho phép tài khoản hoạt động.
            </p>

            <div className="register-form-input">
              {/* ID input */}
              <div className="field-input">
                <div className="icon">
                  <i class="bi bi-envelope-at"></i>
                </div>
                <div className="input-value">
                  <input
                    placeholder="Enter Email ..."
                    name="email"
                    onChange={onFieldChange}
                  />
                </div>
              </div>
              {/* ID input */}
              <div className="field-input">
                <div className="icon">
                  <i class="bi bi-person-badge"></i>
                </div>
                <div className="input-value">
                  <input
                    placeholder="Enter ID ..."
                    name="studentID"
                    onChange={onFieldChange}
                  />
                </div>
              </div>
              {/* Password input */}
              <div className="field-input">
                <div className="icon">
                  <i class="bi bi-file-lock2"></i>
                </div>
                <div className="input-value">
                  <input
                    placeholder="Enter your password ..."
                    type="password"
                    name="password"
                    onChange={onFieldChange}
                  />
                </div>
              </div>
            </div>

            <div className="register-valid" style={{ display: "none" }}>
              <div className="register-valid_field">
                <div className="check-icon">
                  <i class="bi bi-check"></i>
                </div>
                <p className="message">Student ID valid</p>
              </div>
              <div className="register-valid_field">
                <div className="check-icon">
                  <i class="bi bi-x"></i>
                </div>
                <p className="message">Incorrect password </p>
              </div>
            </div>
            {/* {state.user && !state.user.isLoading && (
              <div className="register-btn" onClick={register}>
                Đăng kí
              </div>
            )} */}

            <div className="register-btn" onClick={register}>
              {
                !state.user.isLoading ? "Đăng kí" : "Đang tiến hành..." 
              }
            </div>
          </div>
        </div>
        <div className="register-container_right">
          <div className="image">
            <img src="https://i.pinimg.com/originals/2b/09/97/2b0997961ff2f09aab18ac4c8c6dab02.jpg" />
          </div>
          <div className="content"></div>
        </div>
      </div>


    </div>
  );
};

export default Register;

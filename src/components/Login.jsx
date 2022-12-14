import React, { useState } from "react";

import axios from "axios";
import { setCookie } from "../shared/cookie";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Input from "../elements/Input";

import "../styles/LoginSignup.css";
import BtnEl from "../elements/BtnEl";

const Login = ({
  setIsLogin,
  closeModal,
  setIsLoginModalOpen,
  setIsSignupModalOpen,
}) => {
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const headers = { withCredentials: true };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("서버로 로그인 요청을 보냅니다.");
    axios
      .post(`${serverUrl}/users/login`, loginValue)
      .then((response) => {
        const { accessToken, refreshToken, userId } = response.data;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        console.log(userId);
        localStorage.setItem("userId", userId);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        navigate("/posts");
        alert("로그인에 성공하였습니다!");
        setIsLogin(true);
        setIsLoginModalOpen(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="modalBackground">
      <div className="signup-default-modal">
        <div className="modalContainer">
          <FontAwesomeIcon
            style={{
              fontSize: "30px",
              color: "#E60B23",
            }}
            icon={faPinterest}
          />
          <h1 className="login-title">pinterest에 오신 것을 환영합니다</h1>
          <div className="FormWrap">
            <form className="registerForm">
              <div>
                <label>이메일</label>
                <Input
                  placeholder="이메일"
                  type="text"
                  widthPer="100%"
                  handleChange={handleChange}
                  name="email"
                />
              </div>

              <div>
                <label>비밀번호</label>
                <Input
                  placeholder="비밀번호"
                  type="password"
                  widthPer="100%"
                  handleChange={handleChange}
                  name="password"
                />
              </div>
            </form>
            <BtnEl
              backgroundColor="#E60B23"
              text="계속"
              margin="8px"
              widthPer="100%"
              fontSize="15px"
              height="40px"
              handleClick={handleSubmit}
            />
            <span className="or">또는</span>
            <BtnEl
              backgroundColor="#F3DC01"
              text="카카오톡으로 계속하기"
              margin="8px"
              widthPer="100%"
              fontSize="15px"
              color="black"
              height="40px"
            />
            <span className="toLoginWrap">
              회원이 아니신가요?
              <b
                className="toLoginBtn"
                onClick={() => {
                  setIsSignupModalOpen(true);
                  setIsLoginModalOpen(false);
                }}
              >
                회원가입하기
              </b>
            </span>
          </div>
          <HighlightOffIcon className="Xicon" onClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import Input from "../elements/Input";
import ButtonEle from "../elements/ButtonEle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "../styles/LoginSignup.css";
import axios from "axios";

const Login = ({ closeModal, setIsLoginModalOpen, setIsSignupModalOpen }) => {
  const [signupValue, setSignupValue] = useState({
    email: "",
    nickname: "",
    password: "",
  });

  const { email, nickname, password, passwordCheck } = signupValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupValue({ ...signupValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("서버로 회원가입 데이터를 보냅니다.");
    axios
      .post("http://pyo00.shop/users/signup", signupValue)
      .then((response) => {
        alert(response.data.message);
        setIsSignupModalOpen(false);
        setIsLoginModalOpen(true);
      })
      .catch((error) => alert(error.response.data.message));
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
          <h1 className="login-title">Pinterest에 오신 것을 환영합니다</h1>
          <div className="FormWrap">
            <form className="registerForm">
              <div>
                <label className="label">이메일</label>
                <Input
                  type="text"
                  placeholder="이메일"
                  widthPer="100%"
                  handleChange={handleChange}
                  name="email"
                />
              </div>
              <div>
                <label>닉네임</label>
                <Input
                  type="text"
                  placeholder="닉네임"
                  widthPer="100%"
                  handleChange={handleChange}
                  name="nickname"
                />
              </div>
              <div>
                <label>비밀번호</label>
                <Input
                  placeholder="비밀번호"
                  widthPer="100%"
                  handleChange={handleChange}
                  name="password"
                  type="password"
                />
              </div>
            </form>
            <ButtonEle
              backgroundColor="#E60B23"
              text="가입하기"
              margin="8px"
              widthPer="100%"
              fontSize="15px"
              height="40px"
              handleClick={handleSubmit}
            />
            <span className="or">또는</span>
            <ButtonEle
              backgroundColor="#F3DC01"
              text="카카오톡으로 계속하기"
              margin="8px"
              widthPer="100%"
              fontSize="15px"
              color="black"
              height="40px"
            />
            <span className="toLoginWrap">
              이미 회원이신가요?
              <b
                className="toLoginBtn"
                onClick={() => {
                  setIsSignupModalOpen(false);
                  setIsLoginModalOpen(true);
                }}
              >
                로그인하기
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

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import ButtonEle from "../elements/ButtonEle";
//import UserImage from "../elements/UserImage";
import Login from "./Login";
import Modal from "../elements/Modal";
import { Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import searchReducer, { searchPost } from "../redux/store/searchReducer";
import { useSelector } from "react-redux";

const Header = ({ isLogin, setIsLogin }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [word, setWord] = useState("");
  const dispatch = useDispatch();
  const searchedPosts = useSelector((state) => state.searchReducer);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleSignUp = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      onSignup(e);
    }
  };

  const onSignup = (e) => {
    dispatch(searchPost(e.target.value));
  };

  const toLogout = () => {
    console.log("logout!");
    navigate("/");
  };
  return (
    <>
      <HeaderStyle>
        <HeaderWrap>
          <HeaderLeft>
            <FontAwesomeIcon
              style={{
                marginRight: "8px",
                color: "#E60B23",
              }}
              icon={faPinterest}
            />
            <span
              style={{
                color: "#E60B23",
              }}
            >
              <b
                style={{
                  fontWeight: 700,
                }}
              >
                Hang
              </b>
              terest
            </span>
          </HeaderLeft>

          {isLogin ? (
            <>
              <HeaderCenter>
                <SearchInput
                  type="text"
                  placeholder="검색"
                  onKeyPress={onCheckEnter}
                />
              </HeaderCenter>
              <HeaderRight>
                <ButtonEle
                  marginRight="8px"
                  backgroundColor="#E60B23"
                  text="로그아웃"
                />
                {/* <UserImage size="small" toMyPage={toMyPage} /> */}
              </HeaderRight>
            </>
          ) : (
            <HeaderRight>
              <ButtonEle
                marginRight="8px"
                backgroundColor="#E60B23"
                text="로그인"
                handleClick={handleLogin}
              />
              <ButtonEle
                backgroundColor="#efefef"
                color="black"
                text="가입하기"
                handleClick={handleSignUp}
              />
            </HeaderRight>
          )}
        </HeaderWrap>
      </HeaderStyle>
      <Outlet />
      {isLoginModalOpen ? (
        <Modal
          text="로그인"
          closeModal={closeModal}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignupModalOpen={setIsSignupModalOpen}
          setIsLogin={setIsLogin}
        />
      ) : null}
      {isSignupModalOpen ? (
        <Modal
          text="signup"
          closeModal={closeModal}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignupModalOpen={setIsSignupModalOpen}
        />
      ) : null}
    </>
  );
};

const HeaderStyle = styled.div`
  height: 80px;
  width: 100%;
  z-index: 9999;
  background-color: white;
  /* position: fixed;
  top: 0;
  left: 0; */
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const HeaderLeft = styled.div`
  display: Flex;
  margin-left: 20px;
  margin-right: 20px;
  font-family: "Space Mono", monospace;
`;

const HeaderCenter = styled.div`
  width: 100%;
`;

const HeaderRight = styled.div`
  margin-right: 20px;
  width: 250px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const SearchInput = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
  background-color: #e1e1e1;
  outline: none;
  font-size: 16px;
  border-radius: 30px;
  text-align: left;
  padding: 8px 18px;
`;

export default Header;

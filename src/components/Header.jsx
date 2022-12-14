import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";

import UserImage from "../elements/UserImage";
import Modal from "../elements/Modal";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BtnEl from "../elements/BtnEl";
import { removeCookie } from "../shared/cookie";

const Header = ({ isLogin, setIsLogin }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const dispatch = useDispatch();
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

  const logOut = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    localStorage.clear();
    setIsLogin(false);
    navigate("");
  };

  const onSignup = (e) => {
    // dispatch(searchPost(e.target.value));
  };

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const toMyPage = () => {
    navigate(`/users/${userId}`);
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
              onClick={() => {
                navigate("/posts");
              }}
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
                pin
              </b>
              terest
            </span>
          </HeaderLeft>

          {isLogin ? (
            <>
              <HeaderCenter>
                <SearchInput
                  type="text"
                  placeholder="??????"
                  onKeyPress={onCheckEnter}
                />
              </HeaderCenter>
              <HeaderRight>
                <BtnEl
                  marginLeft="10px"
                  marginRight="8px"
                  backgroundColor="#E60B23"
                  text="??????"
                />
                <BtnEl
                  marginRight="8px"
                  backgroundColor="#E60B23"
                  text="????????????"
                  handleClick={logOut}
                />
                <UserImage size="small" toMyPage={toMyPage} />
              </HeaderRight>
            </>
          ) : (
            <HeaderRight>
              <BtnEl
                marginRight="8px"
                backgroundColor="#E60B23"
                text="?????????"
                handleClick={handleLogin}
              />
              <BtnEl
                backgroundColor="#efefef"
                color="black"
                text="????????????"
                handleClick={handleSignUp}
              />
            </HeaderRight>
          )}
        </HeaderWrap>
      </HeaderStyle>
      <Outlet />
      {isLoginModalOpen ? (
        <Modal
          text="?????????"
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
  margin-left: 35px;
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

//???????????? ?????? - search??????.
//import searchReducer, { searchPost } from "../store/searchReducer";
//const [word, setWord] = useState("");
//const searchedPosts = useSelector((state) => state.searchReducer);

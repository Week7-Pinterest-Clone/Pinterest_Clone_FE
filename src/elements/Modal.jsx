import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Modal = ({
  text,
  closeModal,
  setIsLoginModalOpen,
  setIsSignupModalOpen,
  setIsLogin,
}) => {
  return (
    <>
      {text === "로그인" ? (
        <Login
          closeModal={closeModal}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignupModalOpen={setIsSignupModalOpen}
          setIsLogin={setIsLogin}
        />
      ) : (
        <Signup
          closeModal={closeModal}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignupModalOpen={setIsSignupModalOpen}
        />
      )}
    </>
  );
};

export default Modal;

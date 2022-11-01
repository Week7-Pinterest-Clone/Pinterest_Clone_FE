import React from "react";
import styled from "styled-components";
import ButtonEle from "./ButtonEle";
import { useNavigate } from "react-router-dom";
import BtnEl from "./BtnEl";

//Card하나하나의 정보 페이지 posting의 하부페이지 props = posting정보.
const Pin = (props) => {
  const { imageUrl } = props;
  const { onClickHandler } = props;

  const onSave = (e) => {
    if (e.target.innerHTML === "저장") {
      console.log("북마크 완료");
    } else {
      e.preventDefault();
      return;
    }
  };

  //링크오픈.
  const toImageLink = () => {
    window.open(`${imageUrl}`);
  };

  return (
    <Wrapper>
      <div className="container" onClick={onClickHandler}>
        <img src={imageUrl} alt="pin" />
        <div className="content">
          <BtnEl
            backgroundColor="#E60B23"
            position="absolute"
            top="10px"
            right="10px"
            text="저장"
            handleClick={onSave}
          />
          <BtnEl
            widthPer="60%"
            backgroundColor="white"
            position="absolute"
            color="#3E3D3B"
            left="10px"
            bottom="10px"
            text={imageUrl}
            className="linkBtn"
            height="24px"
            overflow="hidden" //내용이 요소의 크기를 벗어났을때 감춤.
            fontSize="10px"
            padding="6px"
            handleClick={toImageLink}
          />
        </div>
      </div>
    </Wrapper>
  );
};

//일정하게 간격 정렬 - 부모의 width값 내부에서.
const Wrapper = styled.div`
  display: inline-flex;
  padding: 8px;
`;

export default Pin;

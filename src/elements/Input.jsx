import React from "react";
import styled from "styled-components";

const Input = (props) => {
  // 변수 props
  const { widthPer, widthPx, name, value, marginLeft } = props;
  // 함수 props
  const { handleChange } = props;
  return (
    <>
      <InputStyle
        value={value}
        type="text"
        placeholder={props.placeholder}
        style={{ width: widthPer ? widthPer : widthPx }}
        onChange={handleChange}
        name={name}
        marginLeft={marginLeft}
      ></InputStyle>
    </>
  );
};

const InputStyle = styled.input`
  box-sizing: border-box;
  border: 2px solid #cdcdcd;
  padding: 8px 16px;
  min-height: 48px;
  max-width: 100%;
  white-space: nowrap;
  font-size: 16px;
  border-radius: 16px;
  font-weight: 200;
  :focus {
    box-shadow: 0 0 0 4px rgb(0 132 255 / 50%);
    outline: 0;
  }
`;
export default Input;

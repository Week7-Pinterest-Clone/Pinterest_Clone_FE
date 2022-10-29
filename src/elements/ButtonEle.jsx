import React from "react";
import { Button } from "@mui/material";

const ButtonEle = (props) => {
  const {
    marginRight,
    backgroundColor,
    color,
    margin,
    widthPer,
    fontSize,
    height,
    text,
    position,
    top,
    left,
    right,
    bottom,
    overflow,
    marginLeft,
  } = props;

  const { handleClick } = props;
  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        style={{
          marginRight: marginRight,
          marginLeft: marginLeft,
          backgroundColor: backgroundColor,
          borderRadius: "20px",
          color: color,
          width: widthPer ? widthPer : "90px",
          margin: `${margin} 0px`,
          fontSize: fontSize,
          height: height,
          position: position,
          top: top,
          left: left,
          right: right,
          bottom: bottom,
          overflow: overflow,
        }}
      >
        {text}
      </Button>
    </>
  );
};

export default ButtonEle;

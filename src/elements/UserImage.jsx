import React from "react";
import { Avatar } from "@mui/material";

const UserImage = (props) => {
  const { size, width } = props;
  const { toMyPage } = props;
  return (
    <div>
      {size === "small" ? (
        <>
          <Avatar
            alt="Vemy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 32, height: 32 }}
            style={{
              cursor: "pointer",
            }}
            onClick={toMyPage}
          />
        </>
      ) : (
        <div>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
      )}
    </div>
  );
};

export default UserImage;

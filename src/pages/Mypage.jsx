import { Avatar, Button } from "@mui/material";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styles/mypage.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../store/myPageReducer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";

import BtnEl from "../elements/BtnEl";
import { __deletePost, __getPostDetail } from "../redux/modules/postingSlice";

const Mypage = () => {
  const navigate = useNavigate();
  const [myPost, setMyPost] = useState([]);
  const [myInfo, setMyInfo] = useState([]);
  const dispatch = useDispatch();
  const myposts = useSelector((state) => state.getMyPosts);

  const handleEdit = (id) => {
    console.log(id);
    //   navigate(`/update/${id}`, { state: post });
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다."
      )
    ) {
      dispatch(__deletePost(id));
      navigate("/PostMain");
      alert("게시물이 삭제되었습니다");
    }
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const originalPromiseResult = await dispatch(getMyPosts());
        setMyPost(originalPromiseResult.payload.posts);
        setMyInfo(originalPromiseResult.payload);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyPosts();
  }, []);

  return (
    <MypageStyle>
      {/* 프로필페이지 */}
      {myInfo && (
        <div className="profile-header">
          <AccountCircleIcon style={{ fontSize: "120px" }} />
          <div className="profile-nickname">{myInfo.nickname}</div>
          <span className="profile-email">@{myInfo.email}</span>
          <div className="action-buttons">
            <BtnEl text="공유" backgroundColor="#e1e1e1" color="black" />
            <BtnEl
              text="프로필 수정"
              backgroundColor="#e1e1e1"
              widthPer="110px"
              color="black"
            />
          </div>
        </div>
      )}
      {/* 생성됨 저장됨. */}
      <div className="action-bar">
        <BtnEl className="btn">생성됨</BtnEl>
        <BtnEl className="btn">저장됨</BtnEl>
      </div>
      <div className="post-board">
        <div className="grid-container">
          {/* myPost에 데이터가있을때만 map된다. */}
          {myPost &&
            myPost.map((post, idx) => (
              <div key={idx} className="grid-item">
                <img src={post.imageUrl} alt={post.title} />
                <div className="hover-bg">
                  <BtnEl
                    text="저장"
                    backgroundColor="#E60B23"
                    position="absolute"
                    widthPer="20%"
                    handleClick={() => console.log("반갑습니다여러분")}
                  />
                  <PrivateBtn>
                    <EditIcon
                      onClick={() => handleEdit(post.postId, post)}
                      className="button edit-btn"
                    />
                    <DeleteIcon
                      onClick={() => handleDelete(post.postId)}
                      className="button"
                    />
                  </PrivateBtn>
                </div>
              </div>
            ))}
        </div>
      </div>
    </MypageStyle>
  );
};

const MypageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PrivateBtn = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
`;

export default Mypage;

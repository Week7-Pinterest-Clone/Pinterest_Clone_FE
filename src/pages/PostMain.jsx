import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import styled from "styled-components";
import Pin from "../elements/Pin";
import { __getList } from "../redux/modules/postingSlice";
import "../styles/Postmain.css";

//silce

//Posting메인화면

const PostMain = () => {
  // const [posts, setPosts] = useState([setPosts]); //확인필요.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postingSlice);

  console.log(postList);

  // const toDetailPage = (postId) => {
  //   navigate(`/posts/${postId}`);
  // };

  useEffect(() => {
    //저장된 리스트 불러옴.
    const fetchList = () => {
      dispatch(__getList());
    };
    fetchList();
  }, []);

  return (
    <Wrapper>
      <Container className="main__container">
        {/* postList카드정렬. */}
        {postList?.map((pin, i) => {
          return (
            <Pin
              key={i}
              imageUrl={pin.img}
              onClick={() => navigate(`/posts/${pin.postId}`)}
              postId={pin.postId}
              isSaved={pin.isSave}
            />
          );
        })}
      </Container>
      <AddCircleIcon
        //포스팅버튼.
        onClick={() => {
          navigate("/upload");
        }}
        style={{
          position: "fixed", //화면에서움직이지않음.
          height: "60px",
          width: "60px",
          zIndex: "10",
          right: "20px",
          bottom: "20px",
          cursor: "pointer",
          color: "white",
          backgroundColor: "lightgrey",
          borderRadius: "30px",
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  justify-content: center;
`;

const Container = styled.div`
  margin: 0 auto;
  height: 100%;
  background-color: white;
`;

export default PostMain;

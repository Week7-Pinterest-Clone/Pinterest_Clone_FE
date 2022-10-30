import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/postDetail.css";
import Input from "../elements/Input";
import UserImage from "../elements/UserImage";
import { useDispatch, useSelector } from "react-redux";

//slice
import { __deletePost, __getPostDetail } from "../redux/modules/postingSlice";
import { __addComments } from "../redux/modules/commentListSlice";

//Icon Button
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BtnEl from "../elements/BtnEl";

// 포스트 작성 페이지.
const PostDetail = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { id } = useParams();
  const postId = id;
  const dispatch = useDispatch();
  //useSelector
  const posting = useSelector((state) => state.postingSlice);

  //posting 에 닉네임
  const handleDelete = async () => {
    if (window.confirm("삭제됩니다")) {
      dispatch(__deletePost(postId));
      navigate("/posts");
      alert("게시물이 삭제되었습니다");
    }
  };

  const handleEdit = () => {
    navigate(`/update/${postId}`, { state: posting });
  };

  const submitComment = () => {
    dispatch(__addComments({ postId: postId }));
    setContent("");
  };

  //posting[0] -> getPostdetail로 가능한지 확인.
  useEffect(() => {
    dispatch(__getPostDetail(postId));
  }, []);

  return (
    <PostDetailStyle>
      {posting[0]?.title !== undefined ? (
        <FormWrap>
          <FormStyle encType="multipart/form-data">
            <ColumnWrap>
              <ColumnLeft>
                <Label htmlFor="input-file" className="img_label">
                  <ImageTag src={posting[0].imageUrl} alt="image" />
                </Label>
              </ColumnLeft>

              <ColumnRight>
                <ButtonContainer>
                  <LeftBtns>
                    <ContentCopyIcon className="button" />
                    <PrivateBtn>
                      <EditIcon onClick={handleEdit} className="button" />
                      <DeleteIcon onClick={handleDelete} className="button" />
                    </PrivateBtn>
                  </LeftBtns>

                  <SubmitInput type="submit" value="저장" />
                </ButtonContainer>

                <div>
                  <ContentsInfo>
                    <MetaInfo>
                      <ContentsTitle>{posting[0].title}</ContentsTitle>
                      <ContentsText>{posting[0].content}</ContentsText>
                    </MetaInfo>
                    <UserProfileWrap>
                      <UserImage size="small" />
                      <span>{posting[0].nickname}</span>
                    </UserProfileWrap>
                  </ContentsInfo>

                  {/* 화면우측아래 댓글관리 */}
                  <CommentsContents>
                    <CommentCount>
                      {/* 댓글총길이 api? */}
                      {/* comments/:postId */}
                      댓글<span>{posting[0].existcomments.length}</span>개
                    </CommentCount>
                    <CommentsLists>
                      {/*  */}
                      <UserProfileWrap>
                        <UserImage size="small" />
                        <span>{posting[0].postDetail.nickname}</span>
                      </UserProfileWrap>
                    </CommentsLists>

                    {post[0].existcomments.map((a, commentId) => {
                      return (
                        <CommentsLists key={commentId}>
                          <UserProfileWrap style={{ width: "40%" }}>
                            <UserImage size="small" />
                            <span>
                              {posting[0].existcomments[commentId].nickname}
                            </span>
                          </UserProfileWrap>
                          <div style={{ marginTop: "10px" }}>
                            {posting[0].existcomments[commentId].comment}
                          </div>
                        </CommentsLists>
                      );
                    })}
                  </CommentsContents>

                  <CommentFill>
                    <UserProfileWrap>
                      {/* profleImage */}
                      <UserImage />
                    </UserProfileWrap>
                    <CommentInputWrap>
                      <Input
                        value={content}
                        type="text"
                        placeholder="댓글 추가"
                        widthPer="100"
                        handleChange={(e) => {
                          setContent(e.target.value);
                        }}
                      ></Input>
                    </CommentInputWrap>
                    <BtnEl
                      handleClick={submitComment}
                      widthPer="20%"
                      marginLeft="15px"
                      backgroundColor="white"
                      color="#3E3D3B"
                      text="작성"
                    />
                  </CommentFill>
                </div>
              </ColumnRight>
            </ColumnWrap>
          </FormStyle>
        </FormWrap>
      ) : null}
    </PostDetailStyle>
  );
};

const PostDetailStyle = styled.div`
  background-color: #efefef;
  box-sizing: border-box;
  width: 100%;
  z-index: 9999;
  padding: 28px 0px;
  display: flex;
  justify-content: center;
  top: 80px;
`;

const FormWrap = styled.div`
  height: 70%;
  width: 880px;
  border-radius: 16px;
  z-index: 9998;
  background-color: white;
  padding: 40px 40px 0px 40px;
`;

const FormStyle = styled.form`
  padding: 30px 10px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ColumnWrap = styled.div`
  margin: 0 auto;
  height: 80%;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const ColumnLeft = styled.div`
  height: 100%;
  width: 45%;
  display: Flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.div`
  /* height: 60vh; */
  height: 600px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;
`;

const ImageTag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ColumnRight = styled.div`
  height: 100%;
  width: 45%;
  display: Flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
  align-content: right;
`;

const ButtonContainer = styled.div`
  display: Flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftBtns = styled.div`
  display: Flex;
`;

const PrivateBtn = styled.div``;

const SubmitInput = styled.input`
  display: inline-block;
  background-color: rgb(230, 0, 35);
  border: none;
  cursor: pointer;
  height: 40px;
  outline: 0px;
  padding: 0px 14px;
  border-radius: 0px 8px 8px 0px;
  pointer-events: auto;
  width: 60px;
  color: white;
  font-size: 15px;
  text-align: center;
  padding-left: 12px;
  position: relative;
  align-self: end;
  :hover {
    background-color: silver;
  }
`;

const ContentsInfo = styled.div``;

const MetaInfo = styled.div`
  margin: 10px 0px;
`;

const ContentsTitle = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin: 8px 0px;
`;

const ContentsText = styled.div`
  word-spacing: -4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  height: 61px;
  line-height: 19px;
  overflow: scroll;
`;

const UserProfileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 25%;
  margin-top: 10px;
  font-weight: bold;
`;

// = styled.div``;

const CommentsContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const CommentCount = styled.div``;

const CommentsLists = styled.ul`
  display: Flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin: 10px 0px;
`;

const CommentFill = styled.div`
  display: Flex;
  align-items: center;
`;

const CommentInputWrap = styled.div`
  margin-top: 10px;
  width: 85%;
`;
export default PostDetail;

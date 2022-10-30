import React, { useState } from "react";
import styled from "styled-components";

import { TextareaAutosize, useSelect } from "@mui/base";
import { Avatar, TextField } from "@mui/material";
import { Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uploadList, getList, updatePost } from "../store/postReducer";

import { useNavigate, useParams } from "react-router-dom";
import { __updatePost, __uploadPost } from "../redux/modules/postingSlice";

//게시글작성하기
const Upload = () => {
  const [uploadInfo, setUploadInfo] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [previewImg, setPreviewImg] = useState("");
  const { id } = useParams();
  const postId = id; //???????뭔지모르겟음.

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(__uploadPost(uploadInfo));
    if (uploadInfo.title !== "") {
      if (uploadInfo.content !== "") {
        if (uploadInfo.imageUrl !== "") {
          //이건왜이렇게되잇누
          //게시글을만들고 -> 게시글id나옴 -> 게시글의 이미지주소를 업로드한다음에 변경. 파이어베이스라서.
          //dispatch(__updatePost(postId, uploadInfo));
          navigate("/posts");
          return alert("게시물 등록이 완료되었습니다");
        }
        return alert("이미지를 등록해주세요");
      }
      return alert("내용을 입력해주세요");
    }
    return alert("제목을 입력해주세요");
  };

  //img미리보기 들고오는거임.
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(() => {
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
    });
  };

  //filelist = [1,2,3]

  // 파이어베이스 storage에 이미지 저장 후 url 추출
  // 서버이용으로 바꾸어야함.
  // const uploadFB = async (e) => {
  //   const selectedFile = e.target.files;
  //   const uploaded_file = await uploadBytes(
  //     ref(storage, `images/${selectedFile[0].name}`),
  //     selectedFile[0]
  //   );

  //   const downloaded_URL = await getDownloadURL(
  //     ref(storage, `images/${selectedFile[0].name}`)
  //   );
  //   setUploadInfo({ ...uploadInfo, imageUrl: downloaded_URL });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUploadInfo({ ...uploadInfo, [name]: value });
  };

  return (
    <UploadStyle>
      <FormWrap>
        <FormStyle encType="multipart/form-data" onSubmit={handleSubmit}>
          <ColumnWrap>
            <ColumnLeft>
              <Label htmlFor="input-file" className="img_label">
                이미지업로드
                {previewImg && (
                  <ImgPreview src={previewImg} alt="preview-img"></ImgPreview>
                )}
                <FileInput
                  multiple
                  type="file"
                  accept="image/*"
                  id="input-file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    //브라우저 -> 서버
                    encodeFileToBase64(e.target.files[0]);
                    //uploadFB(e);
                  }}
                />
              </Label>
            </ColumnLeft>

            <ColumnRight>
              <SubmitInput type="submit" value="저장" />

              <TextField
                placeholder="제목"
                name="title"
                onChange={handleChange}
              />

              <UserProfileWrap></UserProfileWrap>

              <TextareaAutosize
                maxRows="4"
                aria-label="maximum height"
                placeholder="내용"
                name="content"
                style={{
                  width: "100%",
                  height: "80%",
                  resize: "none",
                  fontSize: "16px",
                  padding: "16.5px 14px",
                  border: "black",
                }}
                onChange={handleChange}
              />
            </ColumnRight>
          </ColumnWrap>
        </FormStyle>
      </FormWrap>
    </UploadStyle>
  );
};

const UploadStyle = styled.div`
  background-color: #efefef;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 9999;
  padding: 28px 0px;
  display: flex;
  justify-content: center;
  position: fixed;
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
`;

const ColumnWrap = styled.div`
  margin: 0 auto;
  height: 80%;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  position: relative;
  background-color: #eaedef;
  cursor: pointer;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;
  color: #bcbcbc;
  :hover {
    background-color: #bcbcbc;
    color: white;
  }
`;

const ImgPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 6px;
  z-index: 999;
  :hover {
    background-color: #bcbcbc;
  }
`;

const FileInput = styled.input`
  cursor: pointer;
  width: 150px;
`;

const UserProfileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

const ColumnLeft = styled.div`
  height: 100%;
  width: 45%;
  display: Flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SubmitInput = styled.input`
  display: inline-block;
  background-color: rgb(230, 0, 35);
  border: none;
  cursor: pointer;
  flex: 0 0 auto;
  height: 40px;
  outline: 0px;
  padding: 0px 14px;
  border-radius: 0px 8px 8px 0px;
  pointer-events: auto;
  width: 50px;
  color: white;
  font-size: 15px;
  text-align: center;
  padding-left: 12px;
  margin-bottom: 20px;
  align-self: flex-end;
  :hover {
    background-color: silver;
  }
`;
export default Upload;

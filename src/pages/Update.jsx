import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router";

import { TextareaAutosize } from "@mui/base";
import { Avatar, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

//수정
import { __updatePost, __uploadPost } from "../redux/modules/postingSlice";
import { useForm } from "react-hook-form";
import axios from "axios";

//게시글수정하기.
//navigation 모르겟음.
const Update = (navigation) => {
  const { state } = useLocation(); // postList 데이터받아옴.../postDetail에서.
  const { register, handleSubmit, watch, setValue } = useForm();

  //watch = getter. , setValue = setter.
  const photo = watch("photo");

  const [uploadInfo, setUploadInfo] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [previewImg, setPreviewImg] = useState(
    //api수정
    `${state[0].postDetail.imageUrl}`
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //id값은 이미 상위 detail에서 받아오고 있는 것 같다.
  const { id } = useParams();
  const postId = id;

  //일단 난중에 pass..
  const onValid = async (payload) => {
    //id값전달해야한다.
    const { data } = await axios.put(`http://`, payload, {
      //headers추가. //내용추가. title,body payload.title..
    });
    const image = new FormData();
    image.append("image", payload);

    const { data: imgUpload } = await axios.put(`http://` + "/images", image, {
      //headers,
    });
  };

  useEffect(() => {
    setValue("photo", []);
  }, []);

  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPreviewImg(URL.createObjectURL(file));
    }
  }, [photo]);

  // 이미지 미리보기 bbbb
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(() => {
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUploadInfo({ ...uploadInfo, [name]: value });
  };

  return (
    <UploadStyle>
      {state && (
        <FormWrap>
          <FormStyle
            encType="multipart/form-data"
            onSubmit={handleSubmit(onValid)}
          >
            <ColumnWrap>
              <ColumnLeft>
                <Label htmlFor="input-file" className="img_label">
                  이미지업로드
                  {previewImg && (
                    <ImgPreview src={previewImg} alt="preview-img"></ImgPreview>
                  )}
                  <FileInput
                    {...register("photo")}
                    accept="image/*"
                    id="input-file"
                    type="file"
                    style={{ display: "none" }}
                  />
                </Label>
              </ColumnLeft>

              <ColumnRight>
                <SubmitInput type="submit" value="저장" />

                <TextField
                  placeholder="제목"
                  {...register("title")}
                  defaultValue={state[0].postDetail.title}
                />

                <UserProfileWrap>
                  <Avatar size="small" />
                  <span>userProfileWrap</span>
                </UserProfileWrap>
                {/* TextArea. */}

                <TextareaAutosize
                  maxRows="4"
                  aria-label="maximum height"
                  placeholder="내용"
                  {...register("content")}
                  style={{
                    width: "100%",
                    height: "80%",
                    resize: "none",
                    fontSize: "16px",
                    padding: "16.5px 14px",
                    border: "black",
                  }}
                  defaultValue={state[0].postDetail.content}
                />
              </ColumnRight>
            </ColumnWrap>
          </FormStyle>
        </FormWrap>
      )}
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
export default Update;

//
// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (uploadInfo.title !== "") {
//     if (uploadInfo.content !== "") {
//       if (uploadInfo.imageUrl !== "") {
//         dispatch(__updatePost({ uploadInfo: uploadInfo }));
//         navigate("/posts");
//         return alert("게시물 수정이 완료되었습니다");
//       }
//       return alert("이미지를 등록해주세요");
//     }
//     return alert("내용을 입력해주세요");
//   }
//   return alert("제목을 입력해주세요");
// };

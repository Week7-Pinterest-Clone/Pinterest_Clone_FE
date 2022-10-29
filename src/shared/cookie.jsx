import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 로그인 시 사용자 정보를 담은 쿠키를 생성한다
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

// 사용자 인증이 필요한 데이터를 요청할 때 쿠키를 가져온다
export const getCookie = (name) => {
  return cookies.get(name);
};

//쿠키를 지운다
export const removeCookie = (name) => {
  return cookies.remove(name);
};

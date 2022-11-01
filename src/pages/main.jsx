import React from "react";

//css
import "../styles/main.css";

const Main = () => {
  return (
    <>
      <div className="full-screen background-primary">
        <div className="center">
          <h1>이미지넣고싶은데</h1>
        </div>
      </div>
      <div className="full-screen background-secondary">
        <div className="center">
          <h1>이미지넣고싶은데</h1>
        </div>
      </div>
      <div className="full-screen background-primary">
        <div className="center">
          <h1>이미지넣고싶은데</h1>
        </div>
      </div>
      <div className="full-screen background-secondary">
        <div className="center">
          <h1>이미지넣고싶은데</h1>
        </div>
      </div>
    </>
  );
};

export default Main;

// import "react-slideshow-image/dist/styles.css";
// import { Fade } from "react-slideshow-image";
// const fadeImages = [
//   "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
//   "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
// ];

// const Main = () =>  {
//   return (
//     <div className="slide-container">
//       <Fade>
//         <div className="each-fade">
//           <img src={fadeImages[0]} />
//         </div>
//         <div className="each-fade">
//           <img src={fadeImages[1]} />
//         </div>
//         <div className="each-fade">
//           <img src={fadeImages[2]} />
//         </div>
//       </Fade>
//     </div>
//   );
// }

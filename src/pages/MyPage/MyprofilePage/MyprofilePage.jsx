import React from "react";
import profile_icon from "../../../assets/images/profile_icon.svg";
import Header from "../../../components/views/Header/Header";
import "./MyprofilePage.css";

function MyprofilePage() {
  // const [userData, setUserData] = useState({
  //   name: "",
  //   phone: "",
  //   email: "",
  // });

  // useEffect(() => {
  //   // Axios를 사용하여 데이터를 가져옵니다.
  //   axios.get("/api/v1/user/info")
  //     .then((response) => {
  //       // 서버에서 가져온 데이터를 상태에 저장합니다.
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("데이터를 불러오는 데 실패했습니다:", error);
  //     });
  // }, []);

  const dummyUserItems = {
    name: "바나나",
    phone: "010-1234-5678",
    email: "1223v@naver.com",
  };

  return (
    <div className="myprofile-div">
      <Header
        headerProps={{
          pageName: "나의 프로필",
          isClose: false,
          linkTo: "/mypage",
        }}
      />
      <div className="myprofile-head">
        <img
          src={profile_icon}
          alt="MyProfileIcon"
          className="myprofile-icon"
        />
      </div>

      <div className="myprofile-list">
        <div className="myprofile-text">기본정보</div>
        <div className="myprofile-detail">
          <div className="detail-box">
            <div className="detail-item-name">이름 </div>
            <div className="detail-item">{dummyUserItems.name}</div>
          </div>
          <div className="detail-box">
            <div className="detail-item-name">이메일</div>
            <div className="detail-item">{dummyUserItems.email}</div>
          </div>
          <div className="detail-box">
            <div className="detail-item-name">휴대폰</div>
            <div className="detail-item">{dummyUserItems.phone}</div>
          </div>
        </div>
        <div className="myprofile-bye">
          <div className="myprofile-logout">로그아웃</div>
        </div>
      </div>
    </div>
  );
}

export default MyprofilePage;

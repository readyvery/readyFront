import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import RedButton from "./RedButton";
import "./UserInputNumber.css";
import UserInputNumberMessage from "./UserInputNumberMessage";

function PhoneCertificationInput({ id, type, placeholder, requiredname, text, buttonText }) {
  const [inputNum, setInputNum] = useState(false);
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [Phonenumber, setPhonenumber] = useState(''); // 전화번호 상태
  // const [operationMode, setOperationMode] = useState('join');
  const apiUrl = process.env.REACT_APP_API_ROOT;

  const handleButtonClick = () => {
    if (/^\d+$/.test(Phonenumber) && Phonenumber.length === 11) {
      setInputNum(true);
      handlePostmessage();
    } else {
      setInputNum(false);
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };

  const handlePostmessage = async () => {
    try {
      setChkButton(true);
      const response = await axios.post(`${apiUrl}/api/v1/sms/send`, {
        phoneNumber: Phonenumber,
      })
      console.log(response);

      if (response.data.success) {
        console.log("인증번호 발송 성공:", response.data);
      } else {
        console.log("인증번호 발송 실패:", response.data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const renderUserInputNumberMessage = () => {
    if (type === "tel" && chkButton && inputNum) {
      return <UserInputNumberMessage phoneNumber={Phonenumber}/>;
    }
    return null;
  };

  const handlePhoneChange = (event) => {
    setPhonenumber(event.target.value);
  }

  const handleJoinClick = async () => {
    console.log("hi")
  }

  return (
    <>
      <div className="user-input-phone-number-wrapper">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          requiredname={requiredname}
          value={Phonenumber}
          onChange={handlePhoneChange}
          className="user-input-phone-number-input"
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`user-input-phone-number-button ${chkButton ? "user-input-phone-number-button-clicked" : ""}`}
        >
          {text === "인증" ? (chkButton ? "재인증" : text) : "조회"}
        </button>
      </div>
      {renderUserInputNumberMessage()}
      <div className="user-input-phone-number-auth-button">
        <RedButton type="submit" onClick={handleJoinClick}>{buttonText}</RedButton>
      </div>
    </>
  );
}


const UserInputNumber = () => {

    return(
        <div className="user-input-phone-number-content-number-wrapper">
            <label className="user-input-phone-number-content-number-label-style">전화번호 인증</label>
            <PhoneCertificationInput 
                id="userid" 
                type="tel"
                placeholder="전화번호"
                requiredname="username"
                text="인증"
                buttonText="완료"
            />
        </div>
    )
}
export default UserInputNumber;
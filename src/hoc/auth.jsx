// /* eslint-disable import/no-anonymous-default-export */
// import React, { useEffect } from "react";
// import Axios from "axios";
// import { useDispatch } from "react-redux";
// import { auth } from "../_actions/user_action";
// import { useNavigate } from "react-router-dom";

// export default function (SpecificComponent, option, adminRoute = null) {
//     function AuthenticationCheck(props) {
//         const navigate = useNavigate();
//         const dispatch = useDispatch();
//         useEffect(() => {
//             dispatch(auth())
//                 .then((response) => {
//                     console.log(response.payload);
//                     if (!response.payload.isAuth) {
//                         if (option) {
//                             navigate("/login", { replace: true });
//                         }
//                     } else {
//                         //로그인한 상태
//                         if (adminRoute === 3 && response.payload.role !== 3) {
//                             navigate("/", { replace: true });
//                         } else if (adminRoute === 1 && response.payload.role !== 1) {
//                             navigate("/", { replace: true });
//                         } else {
//                             if (option === false) {
//                                 navigate("/", { replace: true });
//                             }
//                         }
//                     }
//                 })
//                 .catch((error) => {
//                     if (error.response && error.response.status >= 400 && error.response.status < 500) {
//                         // 클라이언트 오류 발생 (400번대 오류)
//                         // 로그인 페이지로 되돌아가는 조건문 추가
//                         navigate("/login");
//                     } else {
//                         // 서버 오류 또는 네트워크 오류 등의 다른 오류 처리
//                     }
//                 });
//         }, []);

//         return <SpecificComponent />;
//     }
//     return AuthenticationCheck;
// }

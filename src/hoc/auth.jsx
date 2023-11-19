// // ../hoc/auth.js

// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { accessTokenState, isAuthenticatedState } from "../recoil/authAtoms";

// export default function Auth(SpecificComponent, option, adminRoute = null) {
//   function AuthenticationCheck() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isAuthenticated, setIsAuthenticated] =
//       useRecoilState(isAuthenticatedState);
//     const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

//     useEffect(() => {
//       // 여기서 적절한 방법으로 사용자의 인증 상태를 확인하고 accessToken을 Recoil 상태에 업데이트합니다.
//       // 이 예시에서는 option이 false일 때만 인증 상태를 true로 설정합니다.
//       if (!option) {
//         setIsAuthenticated(true);
//         // 여기서 세션 또는 토큰을 가져와서 Recoil 상태에 업데이트합니다.
//         // 이 예시에서는 accessToken을 예시로 사용하고, 실제로는 여러분의 인증 방식에 맞게 수정해야 합니다.
//         setAccessToken("exampleAccessToken");
//       }
//     }, [option, setIsAuthenticated, setAccessToken]);

//     useEffect(() => {
//       // 인증 상태에 따라 페이지 접근을 처리합니다.
//       if (!isAuthenticated) {
//         // 인증되지 않은 경우 로그인 페이지로 리다이렉트
//         if (location.pathname !== "/kakaologin") {
//           navigate("/kakologin", { replace: true });
//         }
//       } else if (isAuthenticated && option === false) {
//         // 인증된 상태이고 option이 false인 경우 특정 조건에 따라 리다이렉트
//         // 이 예시에서는 특별한 조건이 없으므로 특별한 동작을 추가할 수 있습니다.
//       }
//     }, [isAuthenticated, option, navigate, location.pathname]);

//     return <SpecificComponent />;
//   }

//   return AuthenticationCheck;
// }

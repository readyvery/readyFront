import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import "./index.css";
import theme from "./style/theme/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ThemeProvider>
    </RecoilRoot>
  </BrowserRouter>
);

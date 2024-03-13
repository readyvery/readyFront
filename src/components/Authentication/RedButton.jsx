import React from "react";
import "./RedButton.css";

const RedButton = ({ type, className, children, onClick, ...rest }) => {
  return (
    <button type={type} className={`red-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default RedButton;

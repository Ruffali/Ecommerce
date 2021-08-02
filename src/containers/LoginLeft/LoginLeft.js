import React from "react";
import styled from "styled-components";
import back_img from "../../assets/img/login_back.jpg";

// Login Background Part
const LoginLeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 1.5);
  height: 100%;
  background-image: url(${back_img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100vh;
    background-color: rgba(32, 29, 64, 0.5);
    top: 0;
    left: 0;
    z-index: 0;
  }
`;

// Login Sentences Style
const Welcome = styled.div`
  position: relative;
  letter-spacing: 0.5rem;
  word-spacing: 1rem;
  font-size: 5rem;
  color: #ffffff;
  text-transform: uppercase;
  position: relative;
  &::before {
    content: "Welcome to";
    width: 100%;
    position: absolute;
    color: rgba(255, 255, 255, 0.534);
    font-size: 3vw;
    font-weight: 600;
    top: -70px;
    left: 0;
    letter-spacing: initial;
    word-spacing: initial;
  }
  &::after {
    content: "100% safe online platform by Ruff ALi";
    width: 100%;
    position: absolute;
    color: white;
    font-size: 1vw;
    font-weight: 400;
    bottom: -70px;
    left: 0;
    letter-spacing: initial;
    word-spacing: initial;
  }
`;

export const LoginLeft = () => {
  return (
    <LoginLeftContainer>
      <Welcome>Login Page</Welcome>
    </LoginLeftContainer>
  );
};

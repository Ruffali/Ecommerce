import React from "react";
import styled from "styled-components";
import { LoginLeft } from "../../containers/LoginLeft/LoginLeft";
import { LoginRight } from "../../containers/LoginRight/LoginRight";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;

export const Login = () => {
  return (
    <LoginContainer>
      <LoginLeft />
      <LoginRight />
    </LoginContainer>
  );
};

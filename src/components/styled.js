import styled from "styled-components";
import email_svg from "../assets/img/mail.svg";
import password_svg from "../assets/img/password.svg";

const FONT_SIZE = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
};
const WIDTH = {
  sm: "50%",
  md: "70%",
  lg: "100%",
};
const INPUT_ICON = {
  email: email_svg,
  password: password_svg,
};

export const FormGroupStyle = styled.div`
  width: ${(props) => WIDTH[props.width] || "100%"};
  height: ${(props) =>
    props.width === "sm" ? "40px" : props.width === "md" ? "50px" : "60px"};
  position: relative;
  margin-top: 25px;
  span {
    position: absolute;
    width: fit-content;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const InputStyle = styled.input`
  width: 100%;
  height: 100%;
  font-size: ${(props) => FONT_SIZE[props.font_size] || "1rem"};
  background-image: url(${(props) => INPUT_ICON[props.icon] || "none"});
  display: block;
  border: none;
  outline: none;
  border-bottom: 1px solid;
  border-bottom-color: ${(props) => (props.hasError ? "red" : "#2676ee")};
  box-shadow: none;
  padding-left: 35px;
  padding-bottom: 0px;
  padding-top: 5px;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 2% 50%;
  margin-top: 15px;
  transition: all linear 0.2s;
  cursor: pointer;
`;

export const ButtonStyle = styled.button`
  width: ${(props) => WIDTH[props.width] || "100%"};
  height: 40px;
  margin-top: 25px;
  border-radius: 20px;
  color: white;
  text-transform: uppercase;
  border: 1px solid transparent;
  outline: none;
  box-shadow: none;
  transition: all linear 0.2s;
  cursor: pointer;
  font-size: 0.8vw;
  font-weight: 600;
  background: #2676ee;
  &:hover {
    border-color: #2676ee;
    color: #2676ee;
    background-color: #ffffff;
  }
`;

export const ErrorPart = styled.div`
  margin-top: ${(props) => (props.hasError ? "5px" : "0")};
  color: red;
  font-weight: 400;
  font-size: 0.7vw;
`;

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  InputStyle,
  ButtonStyle,
  FormGroupStyle,
  ErrorPart,
} from "../../components/styled";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../regex";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

// Login Background Part
const LoginRightContainer = styled.div`
  width: calc(100% / 3);
  height: 100%;
  background-color: #ffffff;
  padding: 0 50px;
  padding-top: 10vw;
  form {
  }
`;

const LoginRightHeader = styled.h1`
  font-size: 2vw;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 25px;
  color: #2676ee;
`;

export const LoginRight = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = (data) => console.log(data);

  return (
    <LoginRightContainer>
      <LoginRightHeader>Login</LoginRightHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroupStyle width={"sm"}>
          <InputStyle
            font_size={"sm"}
            icon={"email"}
            hasError={errors.email && errors.email.message}
            placeholder="Email"
            type="text"
            {...register("email", {
              required: "Email is required.",
              validate: (value) =>
                EMAIL_REGEX.test(value) ? null : "Email pattern is wrong.",
            })}
          />
          {errors.email && (
            <ErrorPart hasError={errors.email.message}>
              {errors.email.message}
            </ErrorPart>
          )}
        </FormGroupStyle>
        <FormGroupStyle width={"md"}>
          <InputStyle
            font_size={"md"}
            icon={"password"}
            hasError={errors.password && errors.password.message}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required.",
              validate: (value) =>
                PASSWORD_REGEX.test(value)
                  ? null
                  : "Password pattern is wrong.",
            })}
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
          </span>
          {errors.password && (
            <ErrorPart hasError={errors.password.message}>
              {errors.password.message}
            </ErrorPart>
          )}
        </FormGroupStyle>
        <FormGroupStyle width={"lg"}>
          <InputStyle
            font_size={"lg"}
            icon={"password"}
            hasError={errors.password_repeat && errors.password_repeat.message}
            placeholder="Repeat password"
            type={showPassword ? "text" : "password"}
            {...register("password_repeat", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
          </span>
          {errors.password_repeat && (
            <ErrorPart hasError={errors.password_repeat.message}>
              {errors.password_repeat.message}
            </ErrorPart>
          )}
        </FormGroupStyle>
        <ButtonStyle type="submit" width={"lg"}>
          Login
        </ButtonStyle>
      </form>
    </LoginRightContainer>
  );
};

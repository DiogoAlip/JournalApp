import { Dispatch } from "@reduxjs/toolkit";
import { checkingCredencials, logout, login } from "./authSlice";
import { signInWithGoogle } from "../firebase/providers";

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    if (email.length < 4 || password.length < 4) return;
    dispatch(checkingCredencials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredencials());
    const result = await signInWithGoogle();

    if (!result?.ok)
      return dispatch(logout({ errorMessage: result?.errorMessage }));

    console.log(result);
    dispatch(login(result));
  };
};

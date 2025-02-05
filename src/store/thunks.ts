import { Dispatch } from "@reduxjs/toolkit";
import { checkingCredencials, logout, login } from "./authSlice";
import {
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../firebase/providers";

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

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredencials());
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

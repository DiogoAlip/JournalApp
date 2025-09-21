import { Dispatch } from "@reduxjs/toolkit";
import { checkingCredencials, logout, login } from "./authSlice";
import {
  loggingWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { clearNotesOnLogout } from "../journal";

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
    // slint-disable-next-line
    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });

    if (!result || !result.ok)
      return dispatch(logout({ errorMessage: result?.errorMessage }));

    const { uid, photoURL } = result;
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoggingWithEmailPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredencials());
    const result = await loggingWithEmailPassword({
      email,
      password,
    });
    const { ok, errorMessage } = result;
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch: Dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesOnLogout());
    dispatch(logout({}));
  };
};

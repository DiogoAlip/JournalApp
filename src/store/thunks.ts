import { Dispatch } from "@reduxjs/toolkit";
import { checkingCredencials } from "./authSlice";

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    if (email.length < 4 || password.length < 4) return;
    dispatch(checkingCredencials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredencials());
  };
};

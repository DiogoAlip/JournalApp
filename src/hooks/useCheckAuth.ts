import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingDeletedNotes, startLoadingNotes } from "../store/journal";
import { UnknownAction } from "@reduxjs/toolkit";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(
    (state: { auth: { status: string } }) => state.auth
  );

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(null));
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingNotes() as unknown as UnknownAction);
      dispatch(startLoadingDeletedNotes() as unknown as UnknownAction);
    });
  }, []);

  return status;
};

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/authSlice";

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
    });
  }, []);

  return status;
};

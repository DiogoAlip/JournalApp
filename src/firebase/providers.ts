import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    //const credenciales = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch (error: unknown | { code: string; message: string }) {
    console.log(error);
    return {
      ok: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return { ok: true, uid, photoURL, email, displayName };
  } catch (error: { code: string; message: string } | null) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
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
      errorCode:
        typeof error === "object" && error !== null && "code" in error
          ? error.code
          : String(error),
      errorMessage: error instanceof Error ? error.message : String(error),
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

    if (FirebaseAuth.currentUser) {
      await updateProfile(FirebaseAuth.currentUser, { displayName });
      return { ok: true, uid, photoURL, email, displayName };
    }
  } catch (error: unknown | { code: string; message: string }) {
    console.log(error);
    return {
      ok: false,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
};

export const loggingWithEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;
    return { ok: true, uid, photoURL, email, displayName };
  } catch (error: unknown | { code: string; message: string }) {
    return {
      ok: false,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

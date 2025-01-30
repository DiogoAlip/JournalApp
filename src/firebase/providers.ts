import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    //const credenciales = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    console.log({ ok: true, displayName, email, photoURL, uid });
  } catch (error: { code: string; message: string }) {
    console.log(error);
    return {
      ok: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
};

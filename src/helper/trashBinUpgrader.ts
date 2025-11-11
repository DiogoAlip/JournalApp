import { FirebaseDB } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

const trashBinComprober = async (uid: string) => {
  try {
    const collectionRef = doc(FirebaseDB, `${uid}`, "trashbin");
    const docSnap = await getDoc(collectionRef);
    if (docSnap.exists())
      return {
        upgrade: true,
      };
    return {
      upgrade: false,
    };
  } catch (err) {
    return {
      upgrade: false,
      errorMessage: `${err}`,
    };
  }
};

export const tablesUpgrader = async (uid: string) => {
  const { upgrade, errorMessage } = await trashBinComprober(uid);
  if (!upgrade && !errorMessage) {
    const docRef = doc(FirebaseDB, `${uid}/trashbin`);
    setDoc(docRef, {});
  }
  return { upgrade, errorMessage };
};

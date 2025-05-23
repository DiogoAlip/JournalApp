import { getDocs, collection } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Note } from "../store/journal/journalSlice";

export const loadNotes = async (uid = "") => {
  if (!uid) throw Error("UID user does not exists");

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes = [] as Array<Note>;
  docs.forEach((doc) => {
    notes.push({ ...(doc.data() as Note), id: doc.id });
  });
  return notes;
};

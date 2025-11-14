import { getDocs, collection } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Note } from "../store/journal/journalSlice";

export const loadNotesByPath = async ({
  uid,
  path,
}: {
  uid: string;
  path?: string;
}) => {
  if (!uid) throw new Error("UID user does not exists");

  const collectionRef = collection(FirebaseDB, `${uid}${path}`);
  const docs = await getDocs(collectionRef);

  const notes = [] as Array<Note>;
  docs.forEach((doc) => {
    notes.push({ ...(doc.data() as Note), id: doc.id });
  });
  return notes;
};

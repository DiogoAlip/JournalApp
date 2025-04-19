import { Dispatch } from "@reduxjs/toolkit";
import { FirebaseDB } from "../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptyNote, setActiveNote, creatingNewNote } from "./";

export const startNewNote = () => {
  return async (
    dispatch: Dispatch,
    getState: () => { auth: { uid: string } }
  ) => {
    dispatch(creatingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      id: "",
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

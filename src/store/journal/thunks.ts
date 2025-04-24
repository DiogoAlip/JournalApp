import { Dispatch } from "@reduxjs/toolkit";
import { FirebaseDB } from "../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  setActiveNote,
  creatingNewNote,
  setNotes,
  Note,
  setSaving,
  updateNote,
} from "./";
import { loadNotes } from "../../helper";

export const startNewNote = () => {
  return async (
    dispatch: Dispatch,
    getState: () => { auth: { uid: string } }
  ) => {
    dispatch(creatingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (
    dispatch: Dispatch,
    getState: () => { auth: { uid: string } }
  ) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (
    dispatch: Dispatch,
    getState: () => { auth: { uid: string }; journal: { active: Note } }
  ) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    console.log(docRef);

    dispatch(updateNote(note));
  };
};

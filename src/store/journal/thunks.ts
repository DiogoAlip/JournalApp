import { Dispatch } from "@reduxjs/toolkit";
import { FirebaseDB } from "../../firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  setActiveNote,
  creatingNewNote,
  setNotes,
  Note,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteByID,
} from "./";
import { fileUpload, loadNotes } from "../../helper";

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
      date: Date.now(),
      imageUrls: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    dispatch(addNewEmptyNote({ ...newNote, id: newDoc.id }));
    dispatch(setActiveNote({ ...newNote, id: newDoc.id }));
    localStorage.setItem(
      "lastActiveNote",
      JSON.stringify({ ...newNote, id: newDoc.id })
    );
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

    const value = JSON.parse(localStorage.getItem("lastActiveNote") ?? "{}");
    const noteFinded = notes.find((note) => note.id == value.id);
    if (noteFinded) dispatch(setActiveNote({ ...value }));
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

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = [] as unknown as FileList) => {
  return async (dispatch: Dispatch) => {
    dispatch(setSaving());
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(String(file)));
    }

    const photoUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photoUrls));
  };
};

export const startDeletingNote = () => {
  return async (
    dispatch: Dispatch,
    getState: () => { auth: { uid: string }; journal: { active: Note } }
  ) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteByID(note.id));
  };
};

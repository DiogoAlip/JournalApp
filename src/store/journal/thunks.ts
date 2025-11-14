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
  removeNoteByID,
  setTrashBin,
  deleteNoteByID,
} from "./";
import { fileUpload, loadNotesByPath } from "../../helper";

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
    const notes = await loadNotesByPath({ uid, path: "/journal/notes" });
    dispatch(setNotes(notes));

    const value = JSON.parse(localStorage.getItem("lastActiveNote") ?? "{}");
    const noteFinded = notes.find((note) => note.id == value.id);
    if (noteFinded) dispatch(setActiveNote({ ...value }));
  };
};

export const startLoadingDeletedNotes = () => {
  return async (
    dispatch: Dispatch,
    getState: () => { auth: { uid: string } }
  ) => {
    const { uid } = getState().auth;
    const notes = await loadNotesByPath({ uid, path: "/trashbin/notes" });
    dispatch(setTrashBin(notes));
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

export const startRemovingNote = () => {
  return async (
    dispatch: Dispatch,
    getState: () => {
      auth: { uid: string };
      journal: { active: Note; trashBin: Note[] };
    }
  ) => {
    const { uid } = getState().auth;
    const { active: note, trashBin } = getState().journal;

    const journalDocRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(journalDocRef);

    const trashbinDocRef = doc(FirebaseDB, `${uid}/trashbin/notes/${note.id}`);
    await setDoc(trashbinDocRef, { ...note, date: Date.now() });

    dispatch(removeNoteByID(note.id));
    dispatch(setTrashBin([...trashBin, { ...note, date: Date.now() }]));
  };
};

export const startDeletingNote = (noteID: string) => {
  return async (
    dispatch: Dispatch,
    getState: () => { auth: { uid: string } }
  ) => {
    const { uid } = getState().auth;

    const trashbinDocRef = doc(FirebaseDB, `${uid}/trashbin/notes/${noteID}`);
    await deleteDoc(trashbinDocRef);

    dispatch(deleteNoteByID(noteID));
  };
};

export const startRecoveringNote = (noteID: string) => {
  return async (
    dispatch: Dispatch,
    getState: () => { auth: { uid: string }; journal: { trashBin: Note[] } }
  ) => {
    const { uid } = getState().auth;
    const { trashBin } = getState().journal;

    const note = trashBin.find((noteFromTrahs) => noteFromTrahs.id == noteID);

    if (note === undefined) {
      console.log(trashBin);
      return;
    }

    const trashbinDocRef = doc(FirebaseDB, `${uid}/trashbin/notes/${noteID}`);
    await deleteDoc(trashbinDocRef);

    const journalDocRef = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(journalDocRef, note);

    dispatch(deleteNoteByID(noteID));
    dispatch(addNewEmptyNote({ ...note, id: journalDocRef.id }));
    dispatch(setActiveNote({ ...note, id: journalDocRef.id }));
    localStorage.setItem(
      "lastActiveNote",
      JSON.stringify({ ...note, id: journalDocRef.id })
    );
  };
};

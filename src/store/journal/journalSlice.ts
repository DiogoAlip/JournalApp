import { createSlice } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
}
/* 
interface Journal {
  isSaving: boolean;
  savedMessage: string;
  notes: Array<Note>;
  active: Note;
} */

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    savedMessage: "",
    notes: [] as Array<Note>,
    active: {} as Note,
  },
  reducers: {
    creatingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: { payload: Note }) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: { payload: Note }) => {
      state.active = action.payload;
    },
    setSaving: (/* state, action */) => {},
    deleteNoteByID: (/* state, action */) => {},
    updateNote: (/* state, action */) => {},
  },
});

// Action creators are generated for each case reducer functio
export const {
  creatingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setSaving,
  deleteNoteByID,
  updateNote,
} = journalSlice.actions;
export default journalSlice.reducer;

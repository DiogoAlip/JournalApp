import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: true,
    savedMessage: "",
    notes: [],
    active: null,
  },
  reducers: {
    increment: (/*state, action */) => {},
    addEmptyNote: (/*state, action*/) => {},
    setNotes: (/* state, action */) => {},
    setActiveNote: (/* state, action */) => {},
    setSaving: (/* state, action */) => {},
    deleteNoteByID: (/* state, action */) => {},
    updateNote: (/* state, action */) => {},
  },
});

// Action creators are generated for each case reducer functio
export const {
  increment,
  addEmptyNote,
  setNotes,
  setActiveNote,
  setSaving,
  deleteNoteByID,
  updateNote,
} = journalSlice.actions;
export default journalSlice.reducer;

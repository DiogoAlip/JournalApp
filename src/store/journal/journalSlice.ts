import { createSlice } from "@reduxjs/toolkit";

export interface Note {
  title: string;
  body: string;
  date: number;
}

/* interface Journal {
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
      state.savedMessage = "";
    },
    setNotes: (state, action: { payload: Array<Note> }) => {
      state.notes = [...action.payload];
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.savedMessage = "";
      //TODO
    },
    updateNote: (state, action: { payload: Note }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) =>
        note.id == action.payload.id ? action.payload : note
      );

      state.savedMessage = `${action.payload.title} salvada correctamente`;
    },
    deleteNoteByID: (/* state, action */) => {},
  },
});

// Action creators are generated for each case reducer functio
export const {
  creatingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  deleteNoteByID,
  updateNote,
} = journalSlice.actions;
export default journalSlice.reducer;

import { describe, test, expect } from "vitest";
import journalReducer, {
  creatingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  deleteNoteByID,
  updateNote,
  setPhotosToActiveNote,
  clearNotesOnLogout,
  Note,
} from "./journalSlice";

const initialState = {
  isSaving: false,
  savedMessage: "",
  notes: [] as Array<Note>,
  active: {} as Note,
};

const mockNote: Note = {
  id: "1",
  title: "Test Note",
  body: "Test Body",
  date: 1640000000000,
  imageUrls: [],
};

const mockNote2: Note = {
  id: "2",
  title: "Another Note",
  body: "Another Body",
  date: 1650000000000,
  imageUrls: [],
};

describe("journalSlice", () => {
  test("debe retornar el estado inicial", () => {
    const state = journalReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  describe("creatingNewNote", () => {
    test("debe establecer isSaving en true", () => {
      const state = journalReducer(initialState, creatingNewNote());
      expect(state.isSaving).toBe(true);
    });
  });

  describe("addNewEmptyNote", () => {
    test("debe agregar una nueva nota al array y establecer isSaving en false", () => {
      const state = journalReducer(initialState, addNewEmptyNote(mockNote));

      expect(state.notes).toHaveLength(1);
      expect(state.notes[0]).toEqual(mockNote);
      expect(state.isSaving).toBe(false);
    });

    test("debe agregar múltiples notas", () => {
      let state = journalReducer(initialState, addNewEmptyNote(mockNote));
      state = journalReducer(state, addNewEmptyNote(mockNote2));

      expect(state.notes).toHaveLength(2);
      expect(state.notes[0].id).toBe("1");
      expect(state.notes[1].id).toBe("2");
    });
  });

  describe("setActiveNote", () => {
    test("debe establecer la nota activa", () => {
      const state = journalReducer(initialState, setActiveNote(mockNote));

      expect(state.active).toEqual(mockNote);
      expect(state.savedMessage).toBe("");
    });

    test("debe limpiar el savedMessage al establecer una nota activa", () => {
      const stateWithMessage = {
        ...initialState,
        savedMessage: "Nota guardada",
      };

      const state = journalReducer(stateWithMessage, setActiveNote(mockNote));

      expect(state.savedMessage).toBe("");
    });

    test("debe reemplazar todas las notas", () => {
      const notes = [mockNote, mockNote2];
      const state = journalReducer(initialState, setNotes(notes));

      expect(state.notes).toEqual(notes);
      expect(state.notes).toHaveLength(2);
    });

    test("debe establecer savedMessage con el título de la nota actualizada", () => {
      const stateWithNotes = {
        ...initialState,
        notes: [mockNote],
      };

      const updatedNote = { ...mockNote, title: "New Title" };
      const state = journalReducer(stateWithNotes, updateNote(updatedNote));

      expect(state.savedMessage).toBe("New Title salvada correctamente");
    });
  });

  describe("setPhotosToActiveNote", () => {
    test("debe agregar fotos a la nota activa", () => {
      const stateWithActiveNote = {
        ...initialState,
        active: { ...mockNote, imageUrls: [] },
      };

      const newPhotos = [Promise.resolve("url1"), Promise.resolve("url2")];
      const state = journalReducer(
        stateWithActiveNote,
        setPhotosToActiveNote(newPhotos)
      );

      expect(state.active.imageUrls).toHaveLength(2);
      expect(state.isSaving).toBe(false);
    });

    test("debe agregar fotos sin reemplazar las existentes", () => {
      const existingPhotos = [Promise.resolve("url1")];
      const stateWithPhotos = {
        ...initialState,
        active: { ...mockNote, imageUrls: existingPhotos },
      };

      const newPhotos = [Promise.resolve("url2"), Promise.resolve("url3")];
      const state = journalReducer(
        stateWithPhotos,
        setPhotosToActiveNote(newPhotos)
      );

      expect(state.active.imageUrls).toHaveLength(3);
    });
  });

  describe("deleteNoteByID", () => {
    test("debe eliminar una nota por ID", () => {
      const stateWithNotes = {
        ...initialState,
        notes: [mockNote, mockNote2],
        active: mockNote,
      };

      const state = journalReducer(stateWithNotes, deleteNoteByID("1"));

      expect(state.notes).toHaveLength(1);
      expect(state.notes[0].id).toBe("2");
    });

    test("debe establecer active como nota vacía al eliminar", () => {
      const stateWithNotes = {
        ...initialState,
        notes: [mockNote, mockNote2],
        active: mockNote,
      };

      const state = journalReducer(stateWithNotes, deleteNoteByID("1"));

      expect(state.active).toEqual({} as Note);
    });

    test("debe manejar la eliminación de notas cuando no existe el ID", () => {
      const stateWithNotes = {
        ...initialState,
        notes: [mockNote, mockNote2],
      };

      const state = journalReducer(stateWithNotes, deleteNoteByID("999"));

      expect(state.notes).toHaveLength(2);
    });
  });

  describe("clearNotesOnLogout", () => {
    test("debe limpiar todo el estado al logout", () => {
      const stateWithData = {
        isSaving: true,
        savedMessage: "Nota guardada",
        notes: [mockNote, mockNote2],
        active: mockNote,
      };

      const state = journalReducer(stateWithData, clearNotesOnLogout());

      expect(state.isSaving).toBe(false);
      expect(state.savedMessage).toBe("");
      expect(state.active).toEqual({} as Note);
      expect(state.notes).toEqual([]);
    });
  });
});

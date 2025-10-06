import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { NoteView } from "./NoteView";

// Mock de Swal
vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
}));

// Mock de ImageGallery
vi.mock("../components", () => ({
  ImageGallery: () => <div data-testid="image-gallery">Image Gallery</div>,
}));

// Mock de los thunks
vi.mock("../../store/journal", () => ({
  setActiveNote: vi.fn((note) => ({
    type: "journal/setActiveNote",
    payload: note,
  })),
  startSavingNote: vi.fn(() => ({ type: "journal/startSavingNote" })),
  startUploadingFiles: vi.fn(() => ({ type: "journal/startUploadingFiles" })),
  startDeletingNote: vi.fn(() => ({ type: "journal/startDeletingNote" })),
}));

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockNote = {
  id: "123",
  title: "Test Title",
  body: "Test Body",
  date: 1640000000000,
  imageUrls: [],
};

const createMockStore = (journalState = {}) => {
  return configureStore({
    reducer: {
      journal: () => ({
        active: mockNote,
        savedMessage: "",
        isSaving: false,
        ...journalState,
      }),
    },
  });
};

const renderWithProviders = (
  component: React.ReactElement,
  journalState = {}
) => {
  const store = createMockStore(journalState);
  return render(<Provider store={store}>{component}</Provider>);
};

describe("NoteView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  test("debe renderizar el componente correctamente", () => {
    renderWithProviders(<NoteView />);

    expect(
      screen.getByPlaceholderText(/ingrese el titulo/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/que sucedio hoy/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /guardar/i })
    ).toBeInTheDocument();
  });

  test("debe mostrar la fecha de la nota", () => {
    renderWithProviders(<NoteView />);

    const date = new Date(mockNote.date).toUTCString().replace(" GMT", "");
    expect(screen.getByText(date)).toBeInTheDocument();
  });

  test("debe permitir editar el título", () => {
    renderWithProviders(<NoteView />);

    const titleInput = screen.getByPlaceholderText(/ingrese el titulo/i);
    fireEvent.change(titleInput, { target: { value: "Nuevo Título" } });

    expect((titleInput as HTMLInputElement).value).toBe("Nuevo Título");
  });

  test("debe permitir editar el cuerpo", () => {
    renderWithProviders(<NoteView />);

    const bodyInput = screen.getByPlaceholderText(/que sucedio hoy/i);
    fireEvent.change(bodyInput, { target: { value: "Nuevo contenido" } });

    expect((bodyInput as HTMLTextAreaElement).value).toBe("Nuevo contenido");
  });

  test("debe guardar en localStorage al editar", () => {
    renderWithProviders(<NoteView />);

    const titleInput = screen.getByPlaceholderText(/ingrese el titulo/i);
    fireEvent.change(titleInput, { target: { name: "title", value: "Nuevo" } });

    const saved = JSON.parse(
      localStorageMock.getItem("lastActiveNote") || "{}"
    );
    expect(saved.title).toBe("Nuevo");
  });

  test("debe deshabilitar botones cuando está guardando", () => {
    renderWithProviders(<NoteView />, { isSaving: true });

    const saveButton = screen.getByRole("button", { name: /guardar/i });
    expect(saveButton).toBeDisabled();
  });

  test("debe tener un botón de subir archivos", () => {
    renderWithProviders(<NoteView />);

    const uploadButtons = screen.getAllByRole("button");
    const uploadButton = uploadButtons.find(
      (btn) =>
        btn.querySelector("svg")?.getAttribute("data-testid") ===
          "UploadFileOutlinedIcon" || btn.getAttribute("color") === "primary"
    );

    expect(uploadButton).toBeDefined();
  });

  test("debe renderizar ImageGallery", () => {
    renderWithProviders(<NoteView />);

    expect(screen.getByTestId("image-gallery")).toBeInTheDocument();
  });

  test("debe remover localStorage al guardar nota", () => {
    localStorageMock.setItem("lastActiveNote", JSON.stringify(mockNote));
    renderWithProviders(<NoteView />);

    const saveButton = screen.getByRole("button", { name: /guardar/i });
    fireEvent.click(saveButton);

    expect(localStorageMock.getItem("lastActiveNote")).toBeNull();
  });

  test("debe mostrar Swal cuando hay mensaje de guardado", async () => {
    const Swal = (await import("sweetalert2")).default;

    renderWithProviders(<NoteView />, {
      savedMessage: "Nota guardada exitosamente",
    });

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        "Nota actualizada",
        "Nota guardada exitosamente",
        "success"
      );
    });
  });
});

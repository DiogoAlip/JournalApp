import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { JournalPage } from "./JournalPage";

vi.mock("../views/", () => ({
  NoteView: () => <div data-testid="note-view">Note View</div>,
  NothingSelectedView: () => (
    <div data-testid="nothing-selected">Nothing Selected</div>
  ),
}));

vi.mock("../../auth/layout/JournalLayout", () => ({
  JournalLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="journal-layout">{children}</div>
  ),
}));

vi.mock("../../store/journal", () => ({
  startNewNote: vi.fn(() => ({ type: "journal/startNewNote" })),
  startSavingNote: vi.fn(() => ({ type: "journal/startSavingNote" })),
}));

const createMockStore = (journalState = {}) => {
  return configureStore({
    reducer: {
      journal: () => ({
        isSaving: false,
        active: {},
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

describe("<JournalPage/>", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe mostrar NothingSelectedView cuando no hay nota activa", () => {
    renderWithProviders(<JournalPage />, { active: {} });

    expect(screen.getByTestId("nothing-selected")).toBeInTheDocument();
    expect(screen.queryByTestId("note-view")).not.toBeInTheDocument();
  });

  test("debe mostrar NoteView cuando hay una nota activa", () => {
    renderWithProviders(<JournalPage />, {
      active: { id: "123", title: "Test", body: "Content" },
    });

    expect(screen.getByTestId("note-view")).toBeInTheDocument();
    expect(screen.queryByTestId("nothing-selected")).not.toBeInTheDocument();
  });

  test("debe deshabilitar el botón cuando isSaving es true", () => {
    renderWithProviders(<JournalPage />, { isSaving: true, active: {} });

    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  test("debe deshabilitar el botón cuando la nota no está escrita", () => {
    renderWithProviders(<JournalPage />, {
      active: { title: "", body: "" },
    });

    const addButton = screen.getByRole("button");
    expect(addButton).toBeDisabled();
  });

  test("debe habilitar el botón cuando hay una nota con título y body", () => {
    renderWithProviders(<JournalPage />, {
      active: { title: "Mi título", body: "Mi contenido" },
    });

    const addButton = screen.getByRole("button");
    expect(addButton).not.toBeDisabled();
  });

  test("debe habilitar el botón cuando active está vacío", () => {
    renderWithProviders(<JournalPage />, { active: {} });

    const addButton = screen.getByRole("button");
    expect(addButton).not.toBeDisabled();
  });

  test("debe poder hacer click en el botón para crear nueva nota", () => {
    renderWithProviders(<JournalPage />, { active: {} });

    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    // El botón debería ser clickeable si está habilitado
    expect(addButton).not.toBeDisabled();
  });

  test("el botón debe tener estilos de posición fixed", () => {
    renderWithProviders(<JournalPage />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ position: "fixed" });
  });
});

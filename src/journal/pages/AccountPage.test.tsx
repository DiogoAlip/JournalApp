import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { AccountPage } from "./AccountPage";

vi.mock("../../helper/noteData", () => ({
  noteData: vi.fn(() => ({
    totalNotesLength: 100,
    totalTitleNotesLength: 20,
    totalBodyNotesLength: 80,
    oldestNote: 1640000000000,
    newestNote: 1700000000000,
  })),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createMockStore = (authState = {}, journalState = {}) => {
  return configureStore({
    reducer: {
      auth: () => ({
        displayName: "Test User",
        email: "test@example.com",
        photoURL: "https://example.com/photo.jpg",
        ...authState,
      }),
      journal: () => ({
        notes: [],
        ...journalState,
      }),
    },
  });
};

const renderWithProviders = (
  component: React.ReactElement,
  authState = {},
  journalState = {}
) => {
  const store = createMockStore(authState, journalState);
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};

describe("AccountPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe mostrar la foto del usuario", () => {
    renderWithProviders(<AccountPage />);

    const img = screen.getByAltText("test@example.com");
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg=s200-c");
  });

  test("debe mostrar imagen por defecto si no hay photoURL", () => {
    renderWithProviders(<AccountPage />, { photoURL: null });

    const img = screen.getByAltText("test@example.com");
    expect(img).toHaveAttribute(
      "src",
      "https://i.pinimg.com/1200x/37/a6/2f/37a62f1efd07210aee6cf44312f08a95.jpg"
    );
  });

  test("debe mostrar el número de notas escritas", () => {
    const notes = [
      { id: "1", title: "Note 1", body: "Body 1" },
      { id: "2", title: "Note 2", body: "Body 2" },
    ];
    renderWithProviders(<AccountPage />, {}, { notes });

    expect(screen.getByText(/notas escritas: 2/i)).toBeInTheDocument();
  });

  test("debe mostrar las estadísticas de palabras", () => {
    renderWithProviders(<AccountPage />);

    expect(screen.getByText(/palabras escritas: 100/i)).toBeInTheDocument();
    expect(
      screen.getByText(/palabras escritas en cuerpos de notas: 80/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/palabras escritas en titulo de notas: 20/i)
    ).toBeInTheDocument();
  });

  test("debe mostrar la fecha de la nota más antigua", () => {
    renderWithProviders(<AccountPage />);

    const oldestNote = screen.getByText(/nota más antigua/i);
    const stringOldestNote = String(
      oldestNote.innerHTML.replace(/&nbsp;/g, " ")
    );

    const oldDate = new Date(1640000000000);
    const stringOldDate = String(oldDate.toLocaleString())
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ");

    expect(stringOldestNote.includes(stringOldDate)).toBeTruthy();
  });

  test("debe mostrar la fecha de la nota más reciente", () => {
    renderWithProviders(<AccountPage />);

    const newestNote = screen.getByText(/nota más reciente/i);
    const stringNewestNote = String(
      newestNote.innerHTML.replace(/&nbsp;/g, " ")
    );

    const newDate = new Date(1700000000000).toLocaleString();
    const stringNewDate = String(newDate.toLocaleString())
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ");

    expect(stringNewestNote.includes(stringNewDate)).toBeTruthy();
  });

  test("debe tener un botón de volver atrás", () => {
    renderWithProviders(<AccountPage />);

    const backButton = screen.getByRole("button");
    expect(backButton).toBeInTheDocument();
  });

  test("debe navegar atrás al hacer click en el botón", () => {
    renderWithProviders(<AccountPage />);

    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("debe renderizar el ícono ArrowBack", () => {
    renderWithProviders(<AccountPage />);

    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  test("debe mostrar 0 notas cuando no hay notas", () => {
    renderWithProviders(<AccountPage />, {}, { notes: [] });

    expect(screen.getByText(/notas escritas: 0/i)).toBeInTheDocument();
  });
});

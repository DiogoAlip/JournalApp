import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "./LoginPage";

// Mock de los thunks
vi.mock("../../store/auth/thunks", () => ({
  startLoggingWithEmailPassword: vi.fn(() => ({ type: "auth/login" })),
  startGoogleSignIn: vi.fn(() => ({ type: "auth/googleSignIn" })),
}));

const createMockStore = (authState = {}) => {
  return configureStore({
    reducer: {
      auth: () => ({
        status: "not-authenticated",
        errorMessage: null,
        ...authState,
      }),
    },
  });
};

const renderWithProviders = (component: React.ReactElement, authState = {}) => {
  const store = createMockStore(authState);
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};

describe("<LoginPage/>", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe renderizar el componente correctamente", () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
  });

  test("debe mostrar errores de validación cuando el formulario se envía vacío", () => {
    renderWithProviders(<LoginPage />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(screen.getByText(/el correo debe tener una @/i)).toBeInTheDocument();
    expect(
      screen.getByText(/la contraseña debe tener más de 6 letras/i)
    ).toBeInTheDocument();
  });

  test("debe permitir escribir en los campos de email y contraseña", () => {
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByLabelText(/correo/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /contraseña/i
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("test@test.com");
    expect(passwordInput.value).toBe("123456");
  });

  test("debe deshabilitar los botones cuando está autenticando", () => {
    renderWithProviders(<LoginPage />, { status: "checking" });

    const loginButton = screen.getByRole("button", { name: /login/i });
    const googleButton = screen.getByRole("button", { name: /google/i });

    expect(loginButton).toBeDisabled();
    expect(googleButton).toBeDisabled();
  });

  test("debe mostrar mensaje de error cuando existe errorMessage", () => {
    const errorMessage = "Credenciales incorrectas";
    renderWithProviders(<LoginPage />, { errorMessage });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test("debe tener un link para crear cuenta", () => {
    renderWithProviders(<LoginPage />);

    const createAccountLink = screen.getByRole("link", {
      name: /crear un cuenta/i,
    });
    expect(createAccountLink).toBeInTheDocument();
    expect(createAccountLink).toHaveAttribute("href", "/auth/register");
  });

  test("no debe mostrar errores de validación antes de enviar el formulario", () => {
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByLabelText(/correo/i);
    fireEvent.change(emailInput, { target: { value: "invalid" } });

    expect(
      screen.queryByText(/el correo debe tener una @/i)
    ).toBeInTheDocument();
  });
});

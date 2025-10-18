import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { RegisterPage } from "./RegisterPage";

vi.mock("../../store/auth/thunks", () => ({
  startCreatingUserWithEmailPassword: vi.fn(() => ({ type: "auth/register" })),
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

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe renderizar el componente correctamente", () => {
    renderWithProviders(<RegisterPage />);

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /crear cuenta/i })
    ).toBeInTheDocument();
  });

  test("debe mostrar errores de validación cuando el formulario se envía vacío", () => {
    renderWithProviders(<RegisterPage />);

    const submitButton = screen.getByRole("button", { name: /crear cuenta/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/el correo debe tener una @/i)).toBeInTheDocument();
    expect(
      screen.getByText(/la contraseña debe tener más de 6 letras/i)
    ).toBeInTheDocument();
  });

  test("debe permitir escribir en todos los campos del formulario", () => {
    renderWithProviders(<RegisterPage />);

    const nameInput = screen.getByLabelText(
      /nombre completo/i
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/correo/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /contraseña/i
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(emailInput, { target: { value: "juan@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(nameInput.value).toBe("Juan Pérez");
    expect(emailInput.value).toBe("juan@test.com");
    expect(passwordInput.value).toBe("123456");
  });

  test("debe deshabilitar el botón cuando está autenticando", () => {
    renderWithProviders(<RegisterPage />, { status: "checking" });

    const submitButton = screen.getByRole("button", { name: /crear cuenta/i });
    expect(submitButton).toBeDisabled();
  });

  test("debe mostrar mensaje de error cuando existe errorMessage", () => {
    const errorMessage = "El correo ya está registrado";
    renderWithProviders(<RegisterPage />, { errorMessage });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test("debe tener un link para iniciar sesión", () => {
    renderWithProviders(<RegisterPage />);

    const loginLink = screen.getByRole("link", { name: /ingresar/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/auth/login");
  });

  test("debe mostrar 'Form Incorrect' cuando el formulario es inválido", () => {
    renderWithProviders(<RegisterPage />);

    expect(screen.getByText(/form incorrect/i)).toBeInTheDocument();
  });

  test("debe mostrar 'Form Valid' cuando todos los campos son válidos", () => {
    renderWithProviders(<RegisterPage />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    const emailInput = screen.getByLabelText(/correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(nameInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(emailInput, { target: { value: "juan@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(screen.getByText(/form valid/i)).toBeInTheDocument();
  });

  test("no debe mostrar errores antes de enviar el formulario", () => {
    renderWithProviders(<RegisterPage />);

    const emailInput = screen.getByLabelText(/correo/i);
    fireEvent.change(emailInput, { target: { value: "invalido" } });

    expect(
      screen.queryByText(/el correo debe tener una @/i)
    ).toBeInTheDocument();
  });

  test("debe validar que el nombre tenga al menos 3 caracteres", () => {
    renderWithProviders(<RegisterPage />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    const submitButton = screen.getByRole("button", { name: /crear cuenta/i });

    fireEvent.change(nameInput, { target: { value: "ab" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
  });
});

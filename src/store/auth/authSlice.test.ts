import { describe, test, expect } from "vitest";
import authReducer, { login, logout, checkingCredencials } from "./authSlice";

const initialState = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

//sin riesgo
const mockUser = {
  uid: "123abc",
  email: "test@example.com",
  displayName: "Test User",
  photoURL: "https://example.com/photo.jpg",
};

describe("authSlice", () => {
  test("debe retornar el estado inicial", () => {
    const state = authReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  describe("login", () => {
    test("debe establecer status como authenticated", () => {
      const state = authReducer(initialState, login(mockUser));
      expect(state.status).toBe("authenticated");
    });

    test("debe establecer todos los datos del usuario", () => {
      const state = authReducer(initialState, login(mockUser));

      expect(state.uid).toBe(mockUser.uid);
      expect(state.email).toBe(mockUser.email);
      expect(state.displayName).toBe(mockUser.displayName);
      expect(state.photoURL).toBe(mockUser.photoURL);
    });
    User;

    test("debe limpiar errorMessage al login", () => {
      const stateWithError = {
        ...initialState,
        errorMessage: "Error anterior",
      };

      const state = authReducer(stateWithError, login(mockUser));
      expect(state.errorMessage).toBeNull();
    });

    test("debe manejar login sin payload", () => {
      const state = authReducer(initialState, login());

      expect(state.status).toBe("authenticated");
      expect(state.uid).toBeUndefined();
      expect(state.email).toBeUndefined();
      expect(state.displayName).toBeUndefined();
      expect(state.photoURL).toBeUndefined();
    });

    test("debe reemplazar datos anteriores con nuevos datos", () => {
      const oldUser = {
        uid: "old123",
        email: "old@example.com",
        displayName: "Old User",
        photoURL: "https://example.com/old.jpg",
      };

      let state = authReducer(initialState, login(oldUser));
      state = authReducer(state, login(mockUser));

      expect(state.uid).toBe(mockUser.uid);
      expect(state.email).toBe(mockUser.email);
      expect(state.displayName).toBe(mockUser.displayName);
    });
  });

  describe("logout", () => {
    test("debe establecer status como not-authenticated", () => {
      const authenticatedState = {
        ...initialState,
        status: "authenticated",
        ...mockUser,
      };

      const state = authReducer(authenticatedState, logout());
      expect(state.status).toBe("not-authenticated");
    });

    test("debe limpiar todos los datos del usuario", () => {
      const authenticatedState = {
        ...initialState,
        status: "authenticated",
        ...mockUser,
      };

      const state = authReducer(authenticatedState, logout());

      expect(state.uid).toBeNull();
      expect(state.email).toBeNull();
      expect(state.displayName).toBeNull();
      expect(state.photoURL).toBeNull();
    });

    test("debe establecer errorMessage si viene en payload", () => {
      const errorMessage = "Sesión expirada";
      const state = authReducer(initialState, logout({ errorMessage }));

      expect(state.errorMessage).toBe(errorMessage);
    });

    test("debe mantener status not-authenticated incluso si hay error", () => {
      const authenticatedState = {
        ...initialState,
        status: "authenticated",
        ...mockUser,
      };

      const state = authReducer(
        authenticatedState,
        logout({ errorMessage: "Error" })
      );

      expect(state.status).toBe("not-authenticated");
      expect(state.errorMessage).toBe("Error");
    });
  });

  describe("checkingCredencials", () => {
    test("debe establecer status como checking", () => {
      const authenticatedState = {
        ...initialState,
        status: "authenticated",
      };

      const state = authReducer(authenticatedState, checkingCredencials());
      expect(state.status).toBe("checking");
    });

    test("no debe limpiar otros datos del estado", () => {
      const stateWithData = {
        ...initialState,
        status: "authenticated",
        uid: mockUser.uid,
        email: mockUser.email,
      };

      const state = authReducer(stateWithData, checkingCredencials());

      expect(state.status).toBe("checking");
      expect(state.uid).toBe(mockUser.uid);
      expect(state.email).toBe(mockUser.email);
    });

    test("debe funcionar desde estado inicial", () => {
      const state = authReducer(initialState, checkingCredencials());
      expect(state.status).toBe("checking");
    });
  });

  describe("transiciones de estado", () => {
    test("debe permitir transición: checking -> authenticated -> not-authenticated", () => {
      let state = authReducer(initialState, checkingCredencials());
      expect(state.status).toBe("checking");

      state = authReducer(state, login(mockUser));
      expect(state.status).toBe("authenticated");
      expect(state.uid).toBe(mockUser.uid);

      state = authReducer(state, logout());
      expect(state.status).toBe("not-authenticated");
      expect(state.uid).toBeNull();
    });

    test("debe permitir transición: not-authenticated -> checking -> authenticated", () => {
      let state = authReducer(initialState, logout());
      expect(state.status).toBe("not-authenticated");

      state = authReducer(state, checkingCredencials());
      expect(state.status).toBe("checking");

      state = authReducer(state, login(mockUser));
      expect(state.status).toBe("authenticated");
    });
  });
});

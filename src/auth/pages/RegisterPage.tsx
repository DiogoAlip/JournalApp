import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { Button, Link, TextField, Typography, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";

const initialData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidator = {
  email: [(value: string) => value.includes("@"), "El correo debe tener una @"],
  password: [
    (value: string) => value.length >= 6,
    "La contraseña debe tener más de 6 letras",
  ],
  displayName: [
    (value: string) => value.length >= 3,
    "El nombre es obligatorio",
  ],
};

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector(
    (state: { auth: { status: string; errorMessage: string } }) => state.auth
  );
  const [formSubmited, setFormSubmited] = useState(false);
  const dispatch = useDispatch();

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(initialData, formValidator);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Register">
      <h1>Form {isFormValid ? "Valid" : "Incorrect"}</h1>
      <form
        action=""
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
              fullWidth
            />
          </Grid>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@ejemplo.com"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
              fullWidth
            />
          </Grid>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Confirmar Contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }} display={errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ mb: 2, mt: 1 }}>
            <Button
              disabled={isCheckingAuthentication}
              variant="contained"
              fullWidth
              type="submit"
            >
              Crear cuenta
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="end"
            size={{ xs: 12 }}
          >
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link color="inherit" component={RouterLink} to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

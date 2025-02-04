import { Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

const initialData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidator = {
  email: [(value: string) => value.includes("@"), "El correo debe tener una @"],
  password: [
    (value: string) => value.length >= 6,
    "El password debe tener más de 6 letras",
  ],
  displayName: [
    (value: string) => value.length >= 3,
    "El nombre es obligatorio",
  ],
};

export const RegisterPage = () => {
  const [formSubmited, setFormSubmited] = useState(false);

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
    console.log(passwordValid);
  };

  return (
    <AuthLayout title="Register">
      <h1>Form {isFormValid ? "Valid" : "Incorrect"}</h1>
      <form action="" onSubmit={onSubmit}>
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
          <Grid size={{ xs: 12 }} sx={{ mb: 2, mt: 1 }}>
            <Button variant="contained" fullWidth type="submit">
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

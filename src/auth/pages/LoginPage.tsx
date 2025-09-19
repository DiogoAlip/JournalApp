import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Google } from "@mui/icons-material";
import { Alert, Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm, validatorType } from "../../hooks/useForm";
import {
  startGoogleSignIn,
  startLoggingWithEmailPassword,
} from "../../store/auth/thunks";

const formValidator = {
  email: [(value: string) => value.includes("@"), "El correo debe tener una @"],
  password: [
    (value: string) => value.length >= 6,
    "La contraseña debe tener más de 6 letras",
  ],
};

const initialData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const [formSubmited, setFormSubmited] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(
    (state: { auth: { status: string; errorMessage: string } }) => state.auth
  );

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const {
    email,
    password,
    onInputChange,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(initialData, formValidator as unknown as validatorType);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    dispatch(startLoggingWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Correo"
              type="text"
              placeholder="correo@ejemplo.com"
              fullWidth
              name="email"
              value={email}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
              onChange={onInputChange}
            />
          </Grid>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
              onChange={onInputChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }} display={errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }} size={{ xs: 12 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="end"
            size={{ xs: 12 }}
          >
            <Link color="inherit" component={RouterLink} to="/auth/register">
              Crear un cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

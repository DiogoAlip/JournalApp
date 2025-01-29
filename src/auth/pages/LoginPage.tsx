import { useDispatch } from "react-redux";
import { Google } from "@mui/icons-material";
import { Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startGoogleSignIn } from "../../store/thunks";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm({
    email: "diogoalipazaga@gmail.com",
    password: "12345678",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    dispatch(checkingAuthentication(email, password));
  };

  const onGoogleSignIn = () => {
    console.log("google sign in");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@ejemplo.com"
              fullWidth
              name="email"
              value={email}
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
              onChange={onInputChange}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }} size={{ xs: 12 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn}>
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

import { Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form action="">
        <Grid container>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
            />
          </Grid>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@ejemplo.com"
              fullWidth
            />
          </Grid>
          <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Confirmar Contraseña"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ mb: 2, mt: 1 }}>
            <Button variant="contained" fullWidth>
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

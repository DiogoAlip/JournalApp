import { Google } from "@mui/icons-material";
import { Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form action="">
        <Grid container>
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
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }} size={{ xs: 12 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Button variant="contained" fullWidth>
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

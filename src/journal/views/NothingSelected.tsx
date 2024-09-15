import { StarOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 110px)",
        backgroundColor: "primary.main",
        padding: 4,
        borderRadius: 4,
      }}
    >
      <Grid size={{ xs: 12 }} width="auto">
        <StarOutline
          sx={{
            fontSize: 100,
            color: "white",
          }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography color="white" variant="h5" textAlign="center">
          Seleciona o crea una entrada
        </Typography>
      </Grid>
    </Grid>
  );
};

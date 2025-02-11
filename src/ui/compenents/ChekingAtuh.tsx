import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid container direction={"row"} justifyContent={"center"}>
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};

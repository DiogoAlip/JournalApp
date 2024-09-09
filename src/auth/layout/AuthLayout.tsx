import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ReactNode } from "react";

export const AuthLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        size={{ xs: 10, sm: 8, md: 6, lg: 4 }}
        className="box-shadow"
        sx={{ backgroundColor: "white", padding: 3, borderRadius: 3 }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title ?? "Titulo"}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

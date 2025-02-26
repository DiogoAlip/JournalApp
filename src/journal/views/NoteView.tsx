import { SaveOutlined } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ImageGallery } from "../components";

export const NoteView = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid>
          <Typography fontSize={39} fontWeight="light">
            28 de agosto, 2023
          </Typography>
        </Grid>
        <Grid>
          <Button color="primary" sx={{ padding: 2 }}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <TextField
          type="Text"
          variant="filled"
          fullWidth
          placeholder="Ingrese el titulo"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="Text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedio hoy?"
          label="Titulo"
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </>
  );
};

import { useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { Note } from "../../store/journal";
import { SaveOutlined } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ImageGallery } from "../components";

export const NoteView = () => {
  const { active: note } = useSelector(
    (state: { journal: { active: Note } }) => state.journal
  );
  const { body, title, date, onInputChange /* formState */ } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString().replace("GMT", "");
  }, [date]);

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
            {dateString}
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
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="Text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedio hoy?"
          label="Body"
          name="body"
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </>
  );
};

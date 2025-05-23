import { ChangeEvent, RefObject, useEffect, useMemo, useRef } from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  Note,
  setActiveNote,
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal";
import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ImageGallery } from "../components";
import Swal from "sweetalert2";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    savedMessage,
    isSaving,
  } = useSelector(
    (state: {
      journal: { active: Note; savedMessage: string; isSaving: boolean };
    }) => state.journal
  );
  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString().replace("GMT", "");
  }, [date]);

  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (savedMessage.length > 0) {
      Swal.fire("Nota actualizada", savedMessage, "success");
    }
  }, [savedMessage]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files?.length) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

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
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          ref={fileInputRef as RefObject<HTMLInputElement>}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadFileOutlined />
        </IconButton>
        <Grid>
          <Button
            onClick={onSaveNote}
            color="primary"
            disabled={isSaving}
            sx={{ padding: 2 }}
          >
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
          label="Nota"
          name="body"
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button onClick={onDelete}>
          <DeleteOutline />
        </Button>
      </Grid>
      <ImageGallery {...note} />
    </>
  );
};

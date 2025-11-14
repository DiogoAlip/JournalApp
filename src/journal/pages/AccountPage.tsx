import { useSelector } from "react-redux";
import { Note } from "../../store/journal";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { noteData } from "../../helper";

export const AccountPage = () => {
  const { displayName, email, photoURL } = useSelector(
    (state: {
      auth: { displayName: string; email: string; photoURL: string };
    }) => state.auth
  );
  const { notes } = useSelector(
    (state: { journal: { notes: Note[] } }) => state.journal
  );
  const navigateTo = useNavigate();
  const {
    totalNotesLength,
    totalTitleNotesLength,
    totalBodyNotesLength,
    oldestNote,
    newestNote,
  } = noteData(notes);

  const oldDate = new Date(oldestNote);
  const newDate = new Date(newestNote);

  return (
    <Box
      component="center"
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Box width="85%" height="100px" alignItems="end" display="flex">
        <IconButton
          onClick={() => navigateTo(-1)}
          sx={{ height: "fit-content" }}
        >
          <ArrowBack />
        </IconButton>
      </Box>
      <Box
        paddingY={6}
        gap={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          component="img"
          src={
            photoURL?.concat("=s200-c") ??
            "https://i.pinimg.com/1200x/37/a6/2f/37a62f1efd07210aee6cf44312f08a95.jpg"
          }
          alt={email}
          sx={{ width: 200 }}
        />
        <Typography variant="body1">{displayName}</Typography>
        <Typography variant="body1">{email}</Typography>
      </Box>
      <Divider sx={{ width: "80%" }} />
      <Box padding={6} gap={1.5} display="flex" flexDirection="column">
        <Typography variant="body1">notas escritas: {notes.length}</Typography>
        <Typography variant="body1">
          palabras escritas: {totalNotesLength}
        </Typography>
        <Typography variant="body1">
          palabras escritas en cuerpos de notas: {totalBodyNotesLength}
        </Typography>
        <Typography variant="body1">
          palabras escritas en titulo de notas: {totalTitleNotesLength}
        </Typography>
        <Typography variant="body1">
          nota más antigua: {oldDate.toLocaleString()}
        </Typography>
        <Typography variant="body1">
          nota más reciente: {newDate.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

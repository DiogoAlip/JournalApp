import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { JournalLayout } from "../../auth/layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views/";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

export const JournalPage = () => {
  const { isSaving, active } = useSelector(
    (state: { journal: { isSaving: boolean; active: {} } }) => state.journal
  );
  const dispatch = useDispatch();
  const onClickStartNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {Object.keys(active).length ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        onClick={onClickStartNewNote}
        disabled={isSaving}
        sx={{
          size: "large",
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

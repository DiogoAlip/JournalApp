import { useDispatch, useSelector } from "react-redux";
import { Note, startNewNote, startSavingNote } from "../../store/journal";
import { JournalLayout } from "../../auth/layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views/";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { UnknownAction } from "@reduxjs/toolkit";

export const JournalPage = () => {
  const { isSaving, active } = useSelector(
    (state: { journal: { isSaving: boolean; active: Note } }) => state.journal
  );
  const isWritedNote =
    (active.title?.length > 0 && active.body?.length > 0) ||
    !Object.keys(active).length;
  const dispatch = useDispatch();

  const onClickStartNewNote = () => {
    if (isSaving || isWritedNote) {
      dispatch(startSavingNote() as unknown as UnknownAction);
    }
    dispatch(startNewNote() as unknown as UnknownAction);
  };

  return (
    <JournalLayout>
      {Object.keys(active).length ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        onClick={onClickStartNewNote}
        disabled={isSaving || !isWritedNote}
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

import { useMemo } from "react";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { startDeletingNote, startRecoveringNote } from "../../store/journal";
import { useDispatch } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";

export const DeletedSideBarItem = ({
  title,
  body,
  date,
  id,
}: {
  title: string;
  body: string;
  date: number;
  id: string;
}) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(
    () => (title.length > 36 ? title.substring(0, 36) + "..." : title),
    [title]
  );

  const newBody = useMemo(
    () => (body.length > 36 ? body.substring(0, 36) + "..." : body),
    [body]
  );

  const newDate = new Date(date);

  const onReturnNote = () => {
    dispatch(startRecoveringNote(id) as unknown as UnknownAction);
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote(id) as unknown as UnknownAction);
  };
  return (
    <ListItem sx={{ px: 4, gap: 6 }}>
      <Box gap={2} display="flex">
        <IconButton onClick={onReturnNote} sx={{ bgcolor: "#007e60" }}>
          <ArrowUpwardOutlined />
        </IconButton>
        <IconButton onClick={onDeleteNote} sx={{ bgcolor: "error.main" }}>
          <ArrowDownwardOutlined />
        </IconButton>
      </Box>
      <Grid container display="flex" flexDirection="column" width="50%">
        <ListItemText primary={newTitle} />
        <ListItemText secondary={newBody} />
      </Grid>
      <Grid>
        <ListItemText primary={newDate.toLocaleDateString()} />
      </Grid>
    </ListItem>
  );
};

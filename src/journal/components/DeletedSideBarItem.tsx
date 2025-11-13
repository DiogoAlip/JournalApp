import { useMemo } from "react";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

export const DeletedSideBarItem = ({
  title,
  body,
  date,
}: {
  title: string;
  body: string;
  date: number;
}) => {
  //TODO: use dispatch

  const newTitle = useMemo(
    () => (title.length > 38 ? title.substring(0, 38) + "..." : title),
    [title]
  );

  const newBody = useMemo(
    () => (body.length > 38 ? body.substring(0, 38) + "..." : body),
    [body]
  );

  const newDate = new Date(date);

  const onReturnNote = () => {
    //TODO: return note with dispatch
  };

  const onDeleteNote = () => {
    //TODO: delete note with dispatch
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

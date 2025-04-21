import { useMemo } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({
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
    () => (title.length > 17 ? title.substring(0, 17) + "..." : title),
    [title]
  );

  const onClickNote = () => {
    dispatch(setActiveNote({ title, body, date, id }));
  };
  return (
    <ListItem onClick={onClickNote} sx={{ padding: 0 }}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container display="flex" flexDirection="column">
          <ListItemText primary={newTitle || "No Title"} />
          <ListItemText secondary={body || "No Body"} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

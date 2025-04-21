import { useMemo } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

export const SideBarItem = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  const newTitle = useMemo(
    () => (title.length > 17 ? title.substring(0, 17) + "..." : title),
    [title]
  );
  return (
    <ListItem sx={{ padding: 0 }}>
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

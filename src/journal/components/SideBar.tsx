import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Note } from "../../store/journal";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName, email } = useSelector(
    (state: { auth: { displayName: string; email: string } }) => state.auth
  );
  const { notes } = useSelector(
    (state: { journal: { notes: Array<Note> } }) => state.journal
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Toolbar
          sx={{
            display: "block",
            flexDirection: "column",
          }}
          disableGutters
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ padding: 2 }}
            align="center"
          >
            {displayName ?? email}
          </Typography>
          <Divider />
          <List disablePadding>
            {notes.map((note, index) => (
              <SideBarItem key={index} {...note} />
            ))}
          </List>
        </Toolbar>
      </Drawer>
    </Box>
  );
};

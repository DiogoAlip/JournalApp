import { useSelector } from "react-redux";
import { Note } from "../../store/journal";
import { SideBarItem } from "./SideBarItem";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SideBar = ({
  drawerWidth = 240,
  closeSideBar,
}: {
  drawerWidth: number;
  closeSideBar: () => void;
}) => {
  const { displayName, email } = useSelector(
    (state: { auth: { displayName: string; email: string } }) => state.auth
  );
  const { notes } = useSelector(
    (state: { journal: { notes: Array<Note> } }) => state.journal
  );
  const navigateTo = useNavigate();
  const [searchNote, setSearchNote] = useState("");
  const matchSearch = (note: Note) => {
    const lowerBody = note.body.toLowerCase();
    const lowerTitle = note.title.toLowerCase();
    const lowerSearch = searchNote.toLowerCase();
    return lowerBody.includes(lowerSearch) || lowerTitle.includes(lowerSearch);
  };
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              margin: 0,
            }}
          >
            <IconButton
              onClick={closeSideBar}
              color="inherit"
              edge="start"
              sx={{ padding: "0px", px: 1, display: { sm: "none" } }}
            >
              <MenuOutlined />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                py: 1.5,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              align="center"
              onClick={() => {
                navigateTo("/account");
              }}
            >
              {displayName ?? email}
            </Typography>
          </Box>
          <Divider />
          <Box width="full" padding={2}>
            <TextField
              type="text"
              size="small"
              placeholder="Search Note"
              fullWidth
              name="SearchNote"
              value={searchNote}
              onChange={(e) => setSearchNote(e.target.value)}
            />
          </Box>
          <List disablePadding>
            {notes.map(
              (note, index) =>
                matchSearch(note) && <SideBarItem key={index} {...note} />
            )}
          </List>
        </Toolbar>
      </Drawer>
    </Box>
  );
};

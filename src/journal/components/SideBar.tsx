import { useSelector } from "react-redux";
import { Note } from "../../store/journal";
import { SideBarItem } from "./SideBarItem";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Icon,
  List,
  TextField,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { DeleteOutline, MenuOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../../ui/compenents/Modal";
import { DeletedSideBarItem } from "./DeletedSideBarItem";

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
  const { notes, trashBin } = useSelector(
    (state: { journal: { notes: Note[]; trashBin: Note[] } }) => state.journal
  );

  const navigateTo = useNavigate();
  const [searchNote, setSearchNote] = useState("");

  const matchSearch = (note: Note) => {
    const lowerBody = note.body?.toLowerCase();
    const lowerTitle = note.title?.toLowerCase();
    const lowerSearch = searchNote.toLowerCase();
    if (lowerBody === undefined || lowerTitle === undefined) return false;
    return lowerBody.includes(lowerSearch) || lowerTitle.includes(lowerSearch);
  };

  const [handleTrashBinView, setHandleTrashBinView] = useState(false);

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <>
        {handleTrashBinView && (
          <Modal
            open={handleTrashBinView}
            onClose={() => setHandleTrashBinView(!handleTrashBinView)}
            title="Papelera"
          >
            <List disablePadding>
              {trashBin.map((note, index) => (
                <DeletedSideBarItem key={`${index}-${note.id}`} {...note} />
              ))}
            </List>
          </Modal>
        )}
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
                  matchSearch(note) && (
                    <SideBarItem key={`${index}-${note.id}`} {...note} />
                  )
              )}
            </List>
            <Box height="80px"></Box>
          </Toolbar>
          <Box
            height="100%"
            display="flex"
            flexDirection="column-reverse"
            alignItems="center"
          >
            <Button
              onClick={() => setHandleTrashBinView(!handleTrashBinView)}
              sx={{
                bgcolor: "primary.main",
                px: 2,
                py: 1,
                position: "fixed",
                display: "flex",
                gap: 1,
                alignContent: "center",
                maxWidth: `${drawerWidth - 40}px`,
                width: "100%",
                height: "fit-content",
                mb: 3,
              }}
            >
              <Icon sx={{ display: "flex" }}>
                <DeleteOutline sx={{ color: "white" }} />
              </Icon>
              <Typography color="white" variant="body1">
                Papelera
              </Typography>
            </Button>
          </Box>
        </Drawer>
      </>
    </Box>
  );
};

import { TurnedInNot } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export const SideBar = ({ drawerWidth = 240 }) => {
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
            Diogo Alipazága
          </Typography>
          <Divider />
          <List disablePadding>
            {["Enero", "Febrero", "Marzo", "Abril"].map((text) => (
              <ListItem key={text} sx={{ padding: 0 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container display="flex" flexDirection="column">
                    <ListItemText primary={text} />
                    <ListItemText secondary={"Algo"} />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/*
           */}
        </Toolbar>
      </Drawer>
    </Box>
  );
};

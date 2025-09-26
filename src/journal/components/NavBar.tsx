import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { UnknownAction } from "@reduxjs/toolkit";

export const NavBar = ({
  drawerWidth = 240,
  closeSideBar,
}: {
  drawerWidth: number;
  closeSideBar: () => void;
}) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout() as unknown as UnknownAction);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={() => closeSideBar()}
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Journal App
          </Typography>
          <IconButton color="error" onClick={() => onLogout()}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

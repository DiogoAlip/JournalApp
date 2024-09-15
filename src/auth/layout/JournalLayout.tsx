import { Box, Toolbar } from "@mui/material";
import { ReactNode } from "react";
import { NavBar } from "../../journal/components/NavBar";
import { SideBar } from "../../journal/components";

export const JournalLayout = ({ children }: { children: ReactNode }) => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

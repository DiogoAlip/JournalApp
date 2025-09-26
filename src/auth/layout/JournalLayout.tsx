import { Box, Toolbar } from "@mui/material";
import { ReactNode, useState } from "react";
import { NavBar } from "../../journal/components/NavBar";
import { SideBar } from "../../journal/components";

export const JournalLayout = ({ children }: { children: ReactNode }) => {
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const closeSideBar = () => setDisplaySideBar(!displaySideBar);
  const drawerWidth = 240;

  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar drawerWidth={drawerWidth} closeSideBar={closeSideBar} />
      {displaySideBar ? (
        <SideBar drawerWidth={drawerWidth} closeSideBar={closeSideBar} />
      ) : (
        <div></div>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

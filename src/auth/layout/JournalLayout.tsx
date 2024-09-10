import { Box } from "@mui/material";
import { ReactNode } from "react";

export const JournalLayout = ({ children }: { children: ReactNode }) => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      {/*NavBar drawerWidth*/}
      {/*SideBar drawerWidth*/}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/*Tool Bar */}
        {children}
      </Box>
    </Box>
  );
};

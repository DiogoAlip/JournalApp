import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import { purpleTheme } from "./purple";

export const AppTheme = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

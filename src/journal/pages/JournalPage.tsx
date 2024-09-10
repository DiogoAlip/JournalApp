import { Typography } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { JournalLayout } from "../../auth/layout/JournalLayout";

export const JournalPage = () => {
  return (
    <JournalLayout>
      <Typography>JournalPage</Typography>
      <MailOutline />
    </JournalLayout>
  );
};

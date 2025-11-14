import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

export const Modal = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="custom-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        display="flex"
        alignItems="center"
        justifyContent="center"
        id="custom-dialog-title"
        sx={{ m: 0, p: 2 }}
        position="relative"
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", mr: "85%" }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 0 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

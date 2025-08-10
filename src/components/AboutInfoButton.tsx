"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface AboutInfoButtonProps {
  dialogTitle?: string;
  dialogContent?: React.ReactNode;
}

export default function AboutInfoButton({
  dialogTitle = "How to Use The AnimeComparison",
  dialogContent = (
    <>
      Enter AniList usernames, view shared anime, unique anime, and differences.
    </>
  ),
}: AboutInfoButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="absolute top-20 right-4">
        <IconButton
          aria-label="About"
          onClick={() => setOpen(true)}
          size="large"
        >
          <InfoOutlined />
        </IconButton>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface CollapsibleAnimeListProps {
  title: string;
  animeList: string[];
}

export default function CollapsibleAnimeList({ title, animeList }: CollapsibleAnimeListProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Button
        onClick={() => setCollapsed(!collapsed)}
        sx={{
          mt: 1,
          justifyContent: "space-between",
          width: "100%",
          textTransform: "none",
          fontWeight: "medium",
        }}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              transition: "transform 0.5s",
              transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        }
      >
        {title}
      </Button>

      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        <Box
          component="ul"
          sx={{
            paddingLeft: 3,
            maxHeight: 512,
            overflowY: "auto",
            margin: 0,
          }}
        >
          {animeList.map((anime, i) => (
            <li key={i}>{anime}</li>
          ))}
        </Box>
      </Collapse>
    </>
  );
}
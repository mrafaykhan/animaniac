import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} href="/" sx={{ mx: 3 }}>
          Home
        </Button>
        <Button color="inherit" component={Link} href="/ani-gpt" sx={{ mx: 3 }}>
          Anime GPT
        </Button>
        <Button color="inherit" component={Link} href="/ani-diff" sx={{ mx: 3 }}>
          Anime Diff
        </Button>
      </Toolbar>
    </AppBar>
  );
}
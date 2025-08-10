import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/ani-gpt">
          Anime GPT
        </Button>
        <Button color="inherit" component={Link} href="/ani-diff">
          Anime Diff
        </Button>
      </Toolbar>
    </AppBar>
  );
}
"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { compareUsersAnime, CompareUsersAnimeResult } from "@/lib/diffAnimeService";
import CollapsibleAnimeList from "./CollapsibleAnimeList";

export default function AnimeComparison() {
  const [users1, setUsers1] = useState<string[]>([""]);
  const [users2, setUsers2] = useState<string[]>([""]);

  const [data, setData] = useState<CompareUsersAnimeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function compareCurrentUsersAnime() {
    setLoading(true);
    setError(null);
    try {
      const result = await compareUsersAnime(users1, users2);
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const handleUser1Change = (index: number, value: string) => {
    const newUsers = [...users1];
    newUsers[index] = value;
    setUsers1(newUsers);
    setData(null);
  };

  const handleUser2Change = (index: number, value: string) => {
    const newUsers = [...users2];
    newUsers[index] = value;
    setUsers2(newUsers);
    setData(null);
  };

  const removeUser1 = (index: number) => {
    setUsers1(users1.filter((_, i) => i !== index));
  };

  const removeUser2 = (index: number) => {
    setUsers2(users2.filter((_, i) => i !== index));
  };

  return (
    <Box
      maxWidth={600}
      p={3}
      border={"1px solid"}
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Anime Comparison
      </Typography>

      <Box display="flex" flexDirection="column" gap={3} mb={4}>
        {users1.map((user, i) => (
          <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
            <TextField
              value={user}
              onChange={(e) => handleUser1Change(i, e.target.value)}
              fullWidth
            />
            {users1.length > 1 && (
              <Button color="error" onClick={() => removeUser1(i)}>
                Remove
              </Button>
            )}
          </Box>
        ))}

        <Button onClick={() => setUsers1([...users1, ""])}>Add User 1</Button>

        {users2.map((user, i) => (
          <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
            <TextField
              value={user}
              onChange={(e) => handleUser2Change(i, e.target.value)}
              fullWidth
            />
            {users2.length > 1 && (
              <Button color="error" onClick={() => removeUser2(i)}>
                Remove
              </Button>
            )}
          </Box>
        ))}

        <Button onClick={() => setUsers2([...users2, ""])}>Add User 2</Button>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={compareCurrentUsersAnime}
        disabled={loading}
        size="large"
      >
        {loading ? "Loading..." : "Compare Anime"}
      </Button>

      {error && (
        <Typography
          color="error"
          mt={3}
          fontWeight="medium"
          align="center"
          role="alert"
        >
          {error}
        </Typography>
      )}

      {data && (
        <Box mt={4} color="text.primary">
          <Typography mb={1}>
            <strong>{users1.join(", ")}</strong>&apos;s completed anime count: {data.users1Anime.length}
          </Typography>
          <Typography mb={1}>
            <strong>{users2.join(", ")}</strong> completed anime count:{" "}
            {data.users2Anime.length}
          </Typography>

          <CollapsibleAnimeList
            title={`Anime unique to ${users1.join(", ")}`}
            animeList={data.users1Difference}
          />

          <CollapsibleAnimeList
            title={`Anime unique to ${users2.join(", ")}`}
            animeList={data.users2Difference}
          />

          <CollapsibleAnimeList
            title="Anime in common"
            animeList={data.commonAnime}
          />

        </Box>
      )}
    </Box>
  );
}
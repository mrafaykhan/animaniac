"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface AnimeComparisonData {
  user1: string;
  user1Anime: string[];
  user2: string;
  user3: string;
  user2_3_Anime: string[];
  animeDifferenceCount: number;
  animeDifference: string[];
}

export default function AnimeComparison() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [user3, setUser3] = useState("");

  const [data, setData] = useState<AnimeComparisonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAnimeComparison() {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const params = new URLSearchParams({
        user1,
        user2,
        user3,
      });

      const res = await fetch(`/api/anime-comparison?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

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
        <TextField
          label="User 1"
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
          placeholder="Enter user 1"
        />
        <TextField
          label="User 2"
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
          placeholder="Enter user 2"
        />
        <TextField
          label="User 3"
          value={user3}
          onChange={(e) => setUser3(e.target.value)}
          placeholder="Enter user 3"
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={fetchAnimeComparison}
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
            <strong>{user1}</strong>&apos;s completed anime count: {data.user1Anime.length}
          </Typography>
          <Typography mb={1}>
            <strong>{user2}</strong> &amp; <strong>{user3}</strong> completed anime count:{" "}
            {data.user2_3_Anime.length}
          </Typography>
          <Typography mb={2}>Difference count: {data.animeDifferenceCount}</Typography>

          <Typography variant="h6" mb={1}>
            Anime unique to {data.user1}:
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyleType: "disc",
              paddingLeft: 3,
              maxHeight: 256,
              overflowY: "auto",
              margin: 0,
            }}
          >
            {data.animeDifference.map((anime: string, i: number) => (
              <li key={i}>{anime}</li>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
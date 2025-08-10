"use client"

import { useState } from "react";
import { getUserAnimesWithScores } from '@/lib/getAnimeService';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CollapsibleAnimeList from "./CollapsibleAnimeList";

type AIResponse = {
    result: string;
} | null;

export default function AnimeGPT() {
    const [prompt, setPrompt] = useState<string>("");
    const [data, setData] = useState<AIResponse | null>(null);
    const [user, setUser] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [alikeAnime, setAlikeAnime] = useState<string>("");
    const [likedCharacter, setLikedCharacter] = useState<string>("");

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const isDev = process.env.NODE_ENV === "development";

    async function compareCurrentUsersAnime() {
        setLoading(true);
        try {
            const result = await getUserAnimesWithScores(user);

            const prompt = `I am looking for 7 anime reccomendations. I am looking for an anime like ${alikeAnime}. I want the anime to be in the ${genre} or adjacent to the ${genre}. And a character I really like is ${likedCharacter}. I have also scored and watched several other different anime, please use all of the following to give me reccomended anime. ENSURE IT IS NOT IN THE LIST PROVIDED; avoid any personal interactions or follow-up questions, get to the point of what you are reccomending and why based on the information I provided above: ${JSON.stringify(result.data.MediaListCollection.lists[0].entries, null, 2)}`

            if (isDev) {
                setPrompt(prompt)
            }

            const response = await fetch("/api/think-anime-recs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: prompt }),
            });

            if (!response.ok) {
                throw new Error(`Error from AI API: ${response.statusText}`);
            }

            const json = await response.json();
            setData(json);

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                p={3}
                border={"1px solid"}
                borderRadius={2}
                boxShadow={3}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Anime Comparison
                </Typography>
                <TextField
                    value={user}
                    label="Username"
                    onChange={(e) => setUser(e.target.value)}
                    fullWidth
                    placeholder="Enter username"
                />

                <TextField
                    value={genre}
                    label="Genre"
                    onChange={(e) => setGenre(e.target.value)}
                    fullWidth
                    placeholder="Enter a genre of the anime that you want to watch"
                />

                <TextField
                    value={alikeAnime}
                    label="Anime"
                    onChange={(e) => setAlikeAnime(e.target.value)}
                    fullWidth
                    placeholder="Enter a specific anime is like one you want to watch"
                />

                <TextField
                    value={likedCharacter}
                    label="Character"
                    onChange={(e) => setLikedCharacter(e.target.value)}
                    fullWidth
                    placeholder="Enter a character that you would want to see"
                />

                {loading && (
                    <Box display="flex" justifyContent="center" mb={2}>
                        <CircularProgress />
                    </Box>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    onClick={compareCurrentUsersAnime}
                    size="large"
                    disabled={loading}
                >
                    {"Get Anime Reccomendations"}
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

                {prompt && (
                    <CollapsibleAnimeList
                        title={"prompt"}
                        animeList={[prompt]} />
                )}

                {data?.result && (
                    <Box mt={3} p={2} border="1px solid" borderRadius={1}>
                        <Typography variant="h6" gutterBottom>AI Recommendations:</Typography>
                        <Typography variant="body1" whiteSpace="pre-wrap">{data.result}</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
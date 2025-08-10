import { AniListResponse } from "@/app/api/get-anime/route";

export async function getUserAnimesWithScores(username: string): Promise<AniListResponse> {
    const response = await fetch(`/api/get-anime?user=${encodeURIComponent(username)}&sort=${"SCORE_DESC"}`);

    if (!response.ok) {
        throw new Error(`get-anime API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.data || !data.data.MediaListCollection) {
        throw new Error(`No data found for user ${username}`);
    }

    console.log(data.data);

    // Extract anime titles similar to fetchUserAnimeSet
    const entries = data.data.MediaListCollection.lists[0]?.entries || [];
    const animeSet = new Set<string>();

    for (const anime of entries) {
        if (anime.media?.title?.english) {
            animeSet.add(anime.media.title.english);
        }
    }

    return data;
}

export async function fetchUserAnimeSet(username: string): Promise<Set<string>> {
    const response = await fetch(`/api/get-anime?user=${encodeURIComponent(username)}`);

    if (!response.ok) {
        throw new Error(`get-anime API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.data || !data.data.MediaListCollection) {
        throw new Error(`No data found for user ${username}`);
    }

    const entries = data.data.MediaListCollection.lists[0]?.entries || [];
    const animeSet = new Set<string>();

    for (const anime of entries) {
        if (anime.media?.title?.english) {
            animeSet.add(anime.media.title.english);
        }
    }

    return animeSet;
}

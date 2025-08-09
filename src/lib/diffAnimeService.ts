export interface CompareUsersAnimeResult {
    users1Anime: string[];
    users2Anime: string[];
    users1Difference: string[];
    users2Difference: string[];
    commonAnime: string[];
}

export async function compareUsersAnime(users1: string[], users2: string[]): Promise<CompareUsersAnimeResult> {
    const combined1Set = new Set<string>();
    const combined2Set = new Set<string>();

    // Fetch anime sets for all users
    for (const user of users1) {
        if (user.trim() !== "") {
            const userAnimes: Set<string> = await getUserAnimeFromApi(user);
            for (const anime of userAnimes) {
                combined1Set.add(anime);
            }
        }
    }
    for (const user of users2) {
        if (user.trim() !== "") {
            const userAnimes: Set<string> = await getUserAnimeFromApi(user);
            for (const anime of userAnimes) {
                combined2Set.add(anime);
            }
        }
    }

    const difference1 = [...combined1Set].filter(anime => !combined2Set.has(anime));
    const difference2 = [...combined2Set].filter(anime => !combined1Set.has(anime));


    return {
        users1Anime: Array.from(combined1Set),
        users2Anime: Array.from(combined2Set),
        users1Difference: difference1,
        users2Difference: difference2,
        commonAnime: Array.from([...combined1Set].filter(anime => combined2Set.has(anime))),
    };
}

export async function getUserAnimeFromApi(username: string): Promise<Set<string>> {
    const response = await fetch(`/api/get-anime?user=${encodeURIComponent(username)}`);

    if (!response.ok) {
        throw new Error(`get-anime API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.userAnimes;
}
import { NextResponse } from "next/server";

interface AniListResponse {
  data: {
    MediaListCollection: {
      lists: {
        entries: {
          media: {
            title: {
              english: string | null;
            };
          };
        }[];
      }[];
    };
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const user1 = searchParams.get("user1") ?? "rafay";
    const user2 = searchParams.get("user2") ?? "wasaucy";
    const user3 = searchParams.get("user3") ?? "rayaanb";

    const user1Anime = await animesetFromUser(user1);

    const user2Anime = await animesetFromUser(user2);

    const user3Anime = await animesetFromUser(user3);

    const user2_3_Anime = new Set([...user2Anime, ...user3Anime]);
    const animeDifference = [...user1Anime].filter(anime => !user2_3_Anime.has(anime));

    return NextResponse.json({
      user1: user1.toUpperCase(),
      user1Anime: [...user1Anime],
      user2: user2.toUpperCase(),
      user3: user3.toUpperCase(),
      user2_3_Anime: [...user2_3_Anime],
      animeDifferenceCount: animeDifference.length,
      animeDifference,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function animesetFromUser(username: string): Promise<Set<string>> {
  const query = `
    query ($name: String) {
      MediaListCollection(userName: $name, type: ANIME, status: COMPLETED, sort: MEDIA_TITLE_ENGLISH) {
        lists {
          entries {
            media {
              title {
                english
              }
            }
          }
        }
      }
    }
  `;

  const url = "https://graphql.anilist.co";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, variables: { name: username } })
  });

  if (!response.ok) {
    throw new Error(`AniList API error: ${response.status} ${response.statusText}`);
  }

  const data: AniListResponse = await response.json();

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
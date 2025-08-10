import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const user = searchParams.get("user") ?? "rafay";

    const userAnime = await animeForUser(user);

    return NextResponse.json({
      user: user,
      userAnimes: [...userAnime],
      animeCount: userAnime.size
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

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

async function animeForUser(username: string): Promise<Set<string>> {
  const query = `
    query ($name: String) {
      MediaListCollection(userName: $name, type: ANIME, status: COMPLETED, sort: MEDIA_TITLE_ENGLISH) {
        lists {
          entries {
            score(format: POINT_10)
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
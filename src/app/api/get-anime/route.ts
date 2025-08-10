import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const user = searchParams.get("user") ?? "rafay";
    const sort = searchParams.get("sort") ?? "MEDIA_TITLE_ENGLISH";

    const rawResponse = await fetchUserAnimeRaw(user, sort);

    return NextResponse.json(rawResponse);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export interface AniListResponse {
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

async function fetchUserAnimeRaw(username: string, sort: string = "MEDIA_TITLE_ENGLISH"): Promise<AniListResponse> {
  const query = `
    query ($name: String, $sort: [MediaListSort]) {
      MediaListCollection(userName: $name, type: ANIME, status: COMPLETED, sort: $sort) {
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
    body: JSON.stringify({ query, variables: { name: username, sort: [sort] } })
  });

  if (!response.ok) {
    throw new Error(`AniList API error: ${response.status} ${response.statusText}`);
  }

  const data: AniListResponse = await response.json();

  return data;
}
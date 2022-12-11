import requests

def main():
  user1 = "rafay"
  user2 = "wasaucy"
  user3 = "rayaanb"


  user1_anime = animeset_from_user(user1)
  user2_3_anime = animeset_from_user(user2).union(animeset_from_user(user3))

  print(user1.upper(),"ANIME: \n",user1_anime,'\n\n\n')
  print(user2.upper(),"AND",user3.upper(),"ANIME: \n",user2_3_anime,'\n\n\n')

  anime_dif = user1_anime.difference(user2_3_anime)
  print("YOU NEED TO WATCH THESE ANIME TO HAVE RAFAY WATCH ONE PIECE (",len(anime_dif),") :\n",anime_dif)

def animeset_from_user(username):
  query = '''
  query ($name: String) { # Define which variables will be used in the query (id)
    MediaListCollection (userName: $name, type: ANIME, status: COMPLETED, sort:MEDIA_TITLE_ENGLISH) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      lists{
        entries{
          media{
            title{
              english
            }
          }
        }
      }
    }
  }
  '''
  url = 'https://graphql.anilist.co'

  response = requests.post(url, json={'query': query, 'variables': {'name':username}})

  # prettyify data
  response = response.json()['data']['MediaListCollection']['lists'][0]['entries']

  # Get Set
  user_anime = set()
  for anime in response:
    user_anime.add(anime['media']['title']['english'])

  return user_anime

if __name__ == '__main__':
  main()
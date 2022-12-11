import requests
# Here we define our query as a multi-line string
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

# Define our query variables and values that will be used in the query request
variables = {
    'name': "rafay"
}

url = 'https://graphql.anilist.co'

# Make the HTTP Api request
response = requests.post(url, json={'query': query, 'variables': variables})

user1 = "rafay"
user2 = "wasaucy"
user3 = "rayaanb"

response1 = requests.post(url, json={'query': query, 'variables': {'name':user1}})
response2 = requests.post(url, json={'query': query, 'variables': {'name':user2}})
response3 = requests.post(url, json={'query': query, 'variables': {'name':user3}})

# prettyify data
response1 = response1.json()['data']['MediaListCollection']['lists'][0]['entries']
response2 = response2.json()['data']['MediaListCollection']['lists'][0]['entries']
response3 = response3.json()['data']['MediaListCollection']['lists'][0]['entries']

# Extract from the responses
user1_anime = set()
user2_3_anime = set()
for anime in response1:
  user1_anime.add(anime['media']['title']['english'])
for anime in response2:
  user2_3_anime.add(anime['media']['title']['english'])
for anime in response3:
  user2_3_anime.add(anime['media']['title']['english'])

print(user1.upper(),"ANIME: \n",user1_anime,'\n\n\n')
print(user2.upper(),"AND",user3.upper(),"ANIME: \n",user2_3_anime,'\n\n\n')

anime_dif = user1_anime.difference(user2_3_anime)
print("YOU NEED TO WATCH THESE ANIME TO HAVE RAFAY WATCH ONE PIECE (",len(anime_dif),") :\n",anime_dif)
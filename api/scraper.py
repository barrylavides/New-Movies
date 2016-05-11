import urllib2
import json
from bs4 import BeautifulSoup

def scrape(url):
  url = url
  soup = BeautifulSoup(urllib2.urlopen(url).read(), 'html.parser')

  movie_list = soup.find_all('div', class_='list_item')
  movie_list_arr = []

  for element in movie_list:
    obj = {}
    cover_image = element.find('td', {'id': 'img_primary'}).find('img')['src']
    title = element.find('h4', {'itemprop': 'name'}).find('a')['title']
    rating = element.find('div', {'class': 'rating_txt'}).find('div', {'class': 'metascore'})
    description = element.find('div', {'class': 'outline'}).getText()

    if rating:
      vote = rating.find('strong')
      out_of = rating.find('span', {'class': 'mellow'})
      
      obj['vote'] = vote.getText()
      obj['out_of'] = out_of.getText().replace('/','')
    else:
      obj['vote'] = 'No Rating'
      obj['out_of'] = 'No Rating'


    obj['title'] = title
    obj['cover_image'] = cover_image
    obj['description'] = description
    obj['url'] = url

    movie_list_arr.append(obj)
    
  return movie_list_arr

    

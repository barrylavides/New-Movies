from flask import Flask, request, jsonify
from flask.ext.pymongo import PyMongo
import os
import uuid
import scraper
from flask import Response

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'movie_db'
app.config['MONGO_URI'] = 'mongodb://root:root@ds017672.mlab.com:17672/movie_db'

mongo = PyMongo(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.route('/insert_movie')
def insert_movie():
    url = 'http://www.imdb.com/movies-coming-soon'
    url_exist = mongo.db.movies.find_one({'url': url})
    action = ''

    if url_exist == None:
        movies = mongo.db.movies.insert_many(scraper.scrape(url))
        action = 'Scrape movies and add to database'
    else:
        pass
        # Get movies from database
        action = 'Get movies from database'

    return action

@app.route('/get_movies')
def get_movies():
    movies = mongo.db.movies.find()
    movie_list = []

    for movie in movies:
        movie_list.append({
            'cover_image': movie['cover_image'],
            'title': movie['title'],
            'description': movie['description'],
            'vote': movie['vote'],
            'out_of': movie['out_of']
        })

    return jsonify({'movies': movie_list})

if __name__ == '__main__':
    app.run(debug=True)
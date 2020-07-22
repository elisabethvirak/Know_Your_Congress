# import libraries
from flask import Flask, render_template, jsonify
import pymongo
import requests
import json


app = Flask(__name__)

# setup mongo connection
MONGODB_URI = "mongodb+srv://heroku_user:heroku_user@cluster0-anhwr.mongodb.net/congress_db?retryWrites=true&w=majority"
# client = pymongo.MongoClient(MONGODB_URI)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/members", methods=['GET'])
def get_members():
    db = client.get_database('congress_db') #connect to database
    members_data = db.members.find() #get members collection data

    response = [] #initialize list of data to jsonify
    for member in members_data:
        member['_id'] = str(member['_id']) #convert mongodb ID to string to change object datatype
        response.append(member)
    
    return jsonify(response) #display API

@app.route("/votes", methods=['GET'])
def get_votes():
    db = client.get_database('congress_db') #connect to database
    votes_data = db.votes.find() #get votes collection data
    
    response = [] #initialize list of data to jsonify
    for vote in votes_data:
        vote['_id'] = str(vote['_id']) #convert mongodb ID to string to change object datatype
        response.append(vote)

    return jsonify(response) #display API

if __name__ == "__main__":
    app.run(debug=True)

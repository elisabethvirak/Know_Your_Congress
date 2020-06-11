import requests
from config import key
import pymongo
import geopandas as gpd
import geojson
import json

def build_mongo_db ():
    conn = 'mongodb://localhost:27017' # Create connection variable
    client = pymongo.MongoClient(conn)  # Pass connection to the pymongo instance.
    db = client.congress_db  # create/connect to db

    #open geojson file created in convertGeoJSON script
    geojson_path = r"geo_data/cd_116.geojson"
    with open(geojson_path) as f:
        geodata = geojson.load(f)
    
    features = geodata["features"] #get features array

    #insert array into mongo collection
    db.features.drop()
    db.features.insert_many(features)

    #get json from votes URL
    votes_url = "https://api.propublica.org/congress/v1/house/votes/recent.json"
    votes_r = requests.get(votes_url, headers={"X-API-Key": key})
    votes_json = votes_r.json()
    votes_json
    
    votes = votes_json["results"]["votes"] #isolate votes

    #drop existing votes collection and replace with new response
    db.votes.drop()
    db.votes.insert_many(votes)

    #get json from members URL
    members_url = "https://api.propublica.org/congress/v1/116/house/members.json"
    members_r = requests.get(members_url, headers={"X-API-Key": key})
    members_json = members_r.json()
    members_json
    
    congress_members = members_json['results'][0]["members"] #isolate members
    
    for mem in congress_members:
        mem_id = mem["id"] #save the member id
        try:
            #use member ID to create office expenses query URL
            expense_url = f"https://api.propublica.org/congress/v1/members/{mem_id}/office_expenses/category/total.json"
            #get json
            expense_r = requests.get(expense_url, headers={"X-API-Key": key})
            expense_json = expense_r.json()
        except:
            print ("error")
        #create key "office_totals" in members collection and append data
        mem["office_totals"] = expense_json["results"]

    # drop members colletion
    db.members.drop()
    # create members collection with response
    db.members.insert_many(congress_members)

#build_mongo_db()

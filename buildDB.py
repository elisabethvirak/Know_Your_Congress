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
    geojson_path = r"../Know_Your_Congress_extras/map/cd_116.geojson"
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
    congress_members = members_json['results'][0]["members"] #isolate members into a list of objects
    
    db.members.drop() #drop existing members collection
    member_ids = [] #initialize list to check against for unique ids

    for mem in congress_members:
        if mem["id"] not in member_ids: #check if value of ID is unique
            mem_id = mem["id"] #if unique set id equal to string variable for query URL
            member_ids.append(mem["id"]) #and append unique ID to list
            try:
                #use member ID to create office expenses query URL and get json
                expense_url = f"https://api.propublica.org/congress/v1/members/{mem_id}/office_expenses/category/total.json"
                expense_r = requests.get(expense_url, headers={"X-API-Key": key})
                expense_json = expense_r.json()
                
                #create "office_totals" key in member object and set value to desired result from query
                mem["office_totals"] = expense_json["results"]
            
                db.members.insert_one(mem)   #add object to mongo collection
            except:
                print ("error")
        else:
            print("duplicate ID: " + mem["id"])

build_mongo_db()
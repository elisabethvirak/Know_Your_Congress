import requests
import pymongo
import json
from config import congress_key

def build_mongo_db ():
    MONGODB_URI = 'mongodb+srv://heroku_user:heroku_user@cluster0-anhwr.mongodb.net/test' # Create connection variable
    client = pymongo.MongoClient(MONGODB_URI)  # Pass connection to the pymongo instance.
    db = client.congress_db  # create/connect to db

    #get json from votes URL
    votes_url = "https://api.propublica.org/congress/v1/house/votes/recent.json"
    votes_r = requests.get(votes_url, headers={"X-API-Key": congress_key})
    votes_json = votes_r.json()
    votes_json
    
    votes = votes_json["results"]["votes"] #isolate votes

    #drop existing votes collection and replace with new response
    db.votes.drop()
    db.votes.insert_many(votes)

    #get json from members URL
    members_url = "https://api.propublica.org/congress/v1/116/house/members.json"
    members_r = requests.get(members_url, headers={"X-API-Key": congress_key})
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
                expense_r = requests.get(expense_url, headers={"X-API-Key": congress_key})
                expense_json = expense_r.json()
                
                #create "office_totals" key in member object and set value to desired result from query
                mem["office_totals"] = expense_json["results"]
            
                db.members.insert_one(mem)   #add object to mongo collection
            except:
                print ("error")
        else:
            print("duplicate ID: " + mem["id"])

build_mongo_db()
import requests
from config import key
import pymongo

def build_mongo_db ():
    # Create connection variable
    conn = 'mongodb://localhost:27017'
    # Pass connection to the pymongo instance.
    client = pymongo.MongoClient(conn)
    # create/connect to db
    db = client.congress_db

    #get json from votes URL
    votes_url = "https://api.propublica.org/congress/v1/house/votes/recent.json"
    votes_r = requests.get(votes_url, headers={"X-API-Key": key})
    votes_json = votes_r.json()
    votes_json
    #isolate votes
    votes = votes_json["results"]["votes"]
    votes

    #drop votes collection
    db.votes.drop()
    #create votes collection with response
    db.votes.insert_many(votes)

    #get json from members URL
    members_url = "https://api.propublica.org/congress/v1/116/house/members.json"
    members_r = requests.get(members_url, headers={"X-API-Key": key})
    members_json = members_r.json()
    members_json
    #isolate members
    congress_members = members_json['results'][0]["members"]
    congress_members

    # drop members colletion
    db.members.drop()
    # create members collection with response
    db.members.insert_many(congress_members)

    #make list of member ids
    member_ids = []
    for mem in congress_members:
        member_ids.append(mem["id"])
    
    #use list to update expenses query URL
    expenses = []
    for mem_id in member_ids:
        try:
            expense_url = f"https://api.propublica.org/congress/v1/members/{mem_id}/office_expenses/category/total.json"
            expense_r = requests.get(expense_url, headers={"X-API-Key": key})
            expense_json = expense_r.json()
            expenses.append(expense_json)
        except:
            print ("error")
    
    # drop members colletion
    db.office_totals.drop()
    # create members collection with response
    db.office_totals.insert_many(expenses)

build_mongo_db()

# import libraries
from flask import Flask, render_template, redirect
import pymongo

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

@app.route("/")
def index():
    db = client.congress_db
    members_data = db.members.find_one()
    return render_template("index.html", members_data=members_data)

@app.route("/members")
def members():
    db = client.congress_db
    members_data = db.members.find_one()
    return render_template("index.html", members_data=members_data)


if __name__ == "__main__":
    app.run(debug=True)

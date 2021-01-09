# Know Your Congress

## Know how they vote, when they vote, if they vote!

![](https://physicsworld.com/wp-content/uploads/2018/11/Washington-DC-Capitol-building-109755791-Shutterstock_orhan-cam-635x421.jpg)

### [View the Project](http://knowyourcongress.herokuapp.com/) (data current as of January 2021)

Our team was interested in the congresspeople that represent each of us. We want to make this data exciting and easily accessible through an interactive dashboard.

The dashboard includes members' demographic and contact information selectable by name or district, a D3.js scatterchart of aggregated data about Congress members generally with responsive axes, a Plotly bar chart displaying recent bills voted on by party breakdown, and a Tableau map of congressional districts colored by members' years in Congress.

To accomplish this we used the [ProPublica Congress API](https://projects.propublica.org/api-docs/congress-api/). We queried the API with Python and used PyMongo to upload the responses to MongoDB. We served the Flask API routes from the database collections hosted on Mongo Atlas. 

The following tools were used:

Python:
  - flask
  - PyMongo
  - requests
  - json
  - geopandas

Javascript:
  - dijit
  - D3
  - D3 tip 

HTML/CSS:
  - Bootstrap

MongoDB Atlas

## AVAILABLE ROUTES

 - "/members" contains MongoDB collections feeding data for the following sections: "About Your Representative", "See Their Activity", and "Find Your District"
 - "/votes" contains MongoDB collections feeding data for the following sections: "About Your Bills"
 
 There are direct links to these routes on the dashboard.

## INSTRUCTIONS TO SERVE LOCALLY

Python Depedencies:
  - flask
  - pymongo
  - requests
  - json
  - geopandas
  - dnspython

Files to include in .gitignore:
  - config.py
  - cd_116.geojson
  - \_\_pycache_\_

Files needed:
  - config.py in the same directory as app.py with ProPublica Congress API key as a variable named "congress_key" (get here: https://projects.propublica.org/api-docs/congress-api/)

To run the flask app simply run the app.py script in the app directory.

## Notes
The database is currently dependent on manually running the buildDB.py script periodically. If you would like a copy of the database, run the buildDB.py script in the main directory, adjusting the following code for your MongoDB instance:

    MONGODB_URI = 'mongodb+srv://heroku_user:heroku_user@cluster0-anhwr.mongodb.net/test' # Create connection variable
    client = pymongo.MongoClient(MONGODB_URI)  # Pass connection to the pymongo instance.
    db = client.congress_db  # create/connect to db

Note that data displayed on the site is dependent on a recent API query. Because members of Congress do not change frequently, the database will only need to be updated after an election for most data points. 

Bill data for the Plotly chart changes much more frequently. This chart is under maintenance. The chart has known issues aggregating votes on different parts of bills with the same name. If the total votes for any bill exceed 535 (the number of Congress members), the data is being aggregated. View the "/votes" route to see the data directly.

As the buildDB.py script is written in this repository, the database includes Congress members budget data. Budget data is not currently used in the project, but if you wish to use it, then the database will need to be updated quarterly.

The districts for the Tableau map came from the geoJSON file created by the convertGeoJSON.py script in the geo_data directory. Due to its size, it was included in the .gitignore file. The convertGeoJSON.py script is dependent on a zip file located in the same directory. See Credits below to download the most recent congressional districts shapefile.

The recipe included in the geo_data directory was for a deprecated version of the map using [Mapbox](https://www.mapbox.com/), but included for those who may wish to use it. 

## CREDIT TO:
ProPublica for the API: https://projects.propublica.org/api-docs/congress-api/

unitedstates GitHub for Congressmembers photos: https://github.com/unitedstates/images/tree/gh-pages/congress/225x275

Data.gov for congressional districts shapefile: https://catalog.data.gov/dataset/tiger-line-shapefile-2018-nation-u-s-116th-congressional-district-national

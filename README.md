# Know Your Congress

## Know how they vote, when they vote, if they vote

![](https://physicsworld.com/wp-content/uploads/2018/11/Washington-DC-Capitol-building-109755791-Shutterstock_orhan-cam-635x421.jpg)

### [View the Project](http://knowyourcongress.herokuapp.com/) (data current as of Fall 2020)

Our team was interested in the congresspeople that represent each of us. We want to make this data exciting and easily accessible through an interactive dashboard.

The dashboard includes members' demographic and contact information populated by a dropdown menu using D3.js, a D3.js scatterchart of aggregated data about congressmembers generally with reposive axes, a Plotly bar chart displaying a breakdown of how political parties have voted on recent bills, and a Tableau map of congressional districts colored by members' years in Congress.

To accomplish this we used the ProPublica Congress API. We queried the API with Python and used PyMongo to upload the responses to MongoDB. We served the Flask API routes from the database collections hosted on Mongo Atlas. 

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

MongoDB

## AVAILABLE ROUTES

 - "/members" contains MongoDB collections feeding data for the following sections: About Your Representative, See Their Activity, and Find Your District
 - "/votes" contains MongoDB collections feeding data for the following sections: About Your Bills
 
 There are direct links to these routes on the main route.

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
  - config.py in the same directoy as app.py with ProPublica Congress API key as a variable named "congress_key" (get here: https://projects.propublica.org/api-docs/congress-api/)

To run the flask app simply run the app.py script in the app directory.

#### Notes
The mongo database is hosted using Mongo Atlas. If you would like a copy of the database, run the buildDB.py script in the main directory, adjusting the code for your MongoDB instance. Note that data displayed on the site is dependent on a recent API query. Because members of Congress do not change frequently, the database will only need to be updated after an election. 

As it is written in this repository, the database includes Congressmembers budget data. Budget data is not currently used in the project, but if you wish to use it, then the database will need to be updated quarterly.

The districts for the Tableau map came from the geoJSON file created by the convertGeoJSON.py script in the geo_data directory. This script is dependent on a zip file located in the same directory. See Credits below to download the most recent congressional districts shapefile.

#### CREDIT TO:
ProPublica for the API: https://projects.propublica.org/api-docs/congress-api/

unitedstates GitHub for Congressmembers photos: https://github.com/unitedstates/images/tree/gh-pages/congress/225x275

Data.gov for congressional districts shapefile: https://catalog.data.gov/dataset/tiger-line-shapefile-2018-nation-u-s-116th-congressional-district-national

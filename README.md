# Know Your Congress

## Know how they vote, when they vote, if they vote

Our team was interested in the congresspeople that represent each of us. We want to make this data exciting and easily accessible through an interactive dashboard.

To accomplish this we used the ProPublica Congress API. We queried the API with Python requests and json libraries then used PyMongo to upload the JSON responses to a Mongo database. We served the Flask API routes from the database collections. 

The dashboard includes member demographics populated by a dropdown menu using D3.js, a D3.js scatterchart with aggregated data about all congressmembers, a Plotly bar chart displaying a breakdown of how political parties have voted on recent bills, and a mapbox map of congressional districts.

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
  - mapbox gl

HTML/CSS:
  - Bootstrap

MongoDB

## INSTRUCTIONS FOR USE

Python Depedencies:
  - flask
  - pymongo
  - requests
  - json
  - geopandas

Files to include in .gitignore:
  - config.py
  - config.js
  - cd_116.geojson
  - \_\_pycache_\_

Files to include in .gitignore:
  - config.py
  - cd_116.geojson
  - \_\_pycache_\_

Files needed:
  - config.py in the same directoy as app.py with ProPublica Congress API key as a variable named "key" (get here: https://projects.propublica.org/api-docs/congress-api/)

To run the flask app simply run the app.py script in the app directory.

The mongo database is hosted using Mongo Atlas. If you would like a local copy of the database run the buildDB.py script in the main directory.

#### CREDIT TO:
ProPublica for the API: https://projects.propublica.org/api-docs/congress-api/

unitedstates GitHub for Congressmembers photos: https://github.com/unitedstates/images/tree/gh-pages/congress/225x275

Data.gov for congressional districts shapefile: https://catalog.data.gov/dataset/tiger-line-shapefile-2018-nation-u-s-116th-congressional-district-national

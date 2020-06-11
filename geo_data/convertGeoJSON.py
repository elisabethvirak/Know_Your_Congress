import geopandas as gpd

#use geopandas to create geopandas dataframe from zip file (downloaded from census.gov)
zipfile = r"zip://tl_2019_us_cd116.zip"
districts_gdf = gpd.read_file(zipfile)

#save dataframe as geoJSON
districts_gdf.to_file("../../Know_Your_Congress_extras/map/cd_116.geojson", driver='GeoJSON') 

#the geoJSON was loaded into Mapbox to create a tile layer. Styling for map done in Mapbox Studio.
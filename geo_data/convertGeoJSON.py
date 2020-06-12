import geopandas as gpd

zipfile = r"zip://tl_2019_us_cd116.zip"
districts_gdf = gpd.read_file(zipfile) #use geopandas to create geopandas dataframe from zip file

districts_gdf.to_file("cd_116.geojson", driver='GeoJSON') #save dataframe as geoJSON

#the geoJSON was loaded into Mapbox to create a tile layer. Styling for map done in Mapbox Studio.
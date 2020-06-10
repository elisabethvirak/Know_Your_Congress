//var cd_geojson = "../../Know_Your_Congress_extras/map/cd_116.geojson"
//var data = fetchJSON(cd_geojson).then(function(data) {
//  return data;
//})

var map = L.map('mapid', {
  center: [39.809860, -98.555183],
  zoom: 3
});
 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/streets-v11',
  accessToken: MAP_API
  }).addTo(map);

  L.geoJSON(geojsonFeature).addTo(map);
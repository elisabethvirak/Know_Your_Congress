
mapboxgl.accessToken = MAP_API;

var map = new mapboxgl.Map({
  container: '#map', // HTML container ID
  style: "mapbox://styles/wisemantyr/ckba88c190acp1io27sujasln", // style URL (custom style made in mapbox studio)
  center: [-98.555183, 39.809860], // starting position as [lng, lat]
  zoom: 4
});
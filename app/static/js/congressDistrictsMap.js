
mapboxgl.accessToken = "pk.eyJ1Ijoid2lzZW1hbnR5ciIsImEiOiJja2I5aGlpdGswOWtsMzNvdndwbms4NnptIn0.fkx-pV6ImNfnw53zhd0W9w";

var map = new mapboxgl.Map({
  container: 'map', // HTML container ID
  style: "mapbox://styles/wisemantyr/ckba88c190acp1io27sujasln", // style URL (custom style made in mapbox studio)
  center: [-98.555183, 39.809860], // starting position as [lng, lat]
  zoom: 4
});
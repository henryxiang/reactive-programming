import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';
import L from 'leaflet';

const mapStyle = {
  width: "90%",
  height: window.innerHeight - 100,
  margin: "0 auto"
};
$('#mapView').css(mapStyle);
$('#head').css({width: mapStyle.width, margin: mapStyle.margin});

const location = [38.544907, -121.740517];  // Davis, California
const zoom = 8;
// const mapUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
const mapUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
const mapConfig = {
  maxZoom: 18,
  id: 'mymap'
};

const mymap = L.map('mapView').setView(location, zoom);
L.tileLayer(mapUrl, mapConfig).addTo(mymap);


const quakeUrl = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
const ajaxRequest = $.ajax({
  url: quakeUrl,
  dataType: 'json',
  crossDomain: true
}).promise();
const ajax$ = Rx.Observable.fromPromise(ajaxRequest);

Rx.Observable.timer(0, 5000)
  .switchMap(t => ajax$)
  .map(data => data.features)
  .switchMap(features => Rx.Observable.from(features))
  .distinct(quake => quake.properties.code)
  .subscribe(value => {
    console.log(value);
    let pos = [value.geometry.coordinates[1], value.geometry.coordinates[0]];
    let title = value.properties.title;
    let magnitude = value.properties.mag;
    // L.marker(pos)
    L.circle(pos, {color: "#f03", fillColor: '#f03', radius: magnitude*2000})
      .addTo(mymap)
      .bindPopup(title);
  })

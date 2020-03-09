// Use a version of this to test data is available from db
// snazzymaps.com for styling
//
// $(() => {
//   $.get('http://localhost:3000/walls').done(data => {
//     console.log(data.walls);
//   });
// });

const googleMap = googleMap || {};
const google = google;

googleMap.addInfoWindowForWall = function(wall, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    this.infoWindow = new google.maps.InfoWindow({
      content:
      `
      <img src='../images/${ wall.file }' alt='${ wall.name }'>
      <a href='${ wall.website }'>
        <h3>${ wall.name }</h3>
      </a>
      <p>${ wall.location }</p>
      <p>${ wall.postcode }</p>
      `
    });
    this.infoWindow.open(this.map, marker);
  });
};

googleMap.createMarkerForWall = function(wall) {
  const latlng = new google.maps.LatLng(wall.lat, wall.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: '/images/marker.png',
    animation: google.maps.Animation.DROP
  });
  this.addInfoWindowForWall(wall, marker);
};

googleMap.loopThroughWalls = function(data) {
  $.each(data.walls, (index, wall) => {
    setTimeout(() => {
      googleMap.createMarkerForWall(wall);
    }, index * 50);
  });
};

googleMap.getWalls = function() {
  $.get('http://localhost:3000/walls').done(this.loopThroughWalls);
};

googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{'featureType': 'all', 'elementType': 'geometry.fill', 'stylers': [{'weight': '2.00'}]}, {'featureType': 'all', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#9c9c9c'}]}, {'featureType': 'all','elementType': 'labels.text', 'stylers': [{'visibility': 'on'}]}, {'featureType': 'landscape', 'elementType': 'all', 'stylers': [{'color': '#f2f2f2'}]}, {'featureType': 'landscape', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'poi', 'elementType': 'all','stylers': [{'visibility': 'off'}]}, {'featureType': 'road', 'elementType': 'all','stylers': [{'saturation': -100}, {'lightness': 45}]}, {'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{'color': '#eeeeee'}]}, {'featureType': 'road','elementType': 'labels.text.fill', 'stylers': [{'color': '#7b7b7b'}]}, {'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{'visibility': 'simplified'}]}, {'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'transit', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'water', 'elementType': 'all', 'stylers': [{'color': '#46bcec'}, {'visibility': 'on'}]}, {'featureType': 'water', 'elementType': 'geometry.fill', 'stylers': [{'color': '#c8d7d4'}]}, {'featureType': 'water', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#070707'}]}, {'featureType': 'water', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]}]
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getWalls();
};

$(googleMap.mapSetup.bind(googleMap));

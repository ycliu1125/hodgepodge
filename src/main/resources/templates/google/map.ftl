<#ftl output_format="HTML" />
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Simple Google Map</title>
  <meta name="viewport" content="initial-scale=1.0">
    <#include "*/includes/meta.ftl">
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHpe0cCGNRa5ru4v2C9xznc16zGsAqt3g&callback=initMap"></script>
  <script src="<@spring.url "/js/home/map.js" />"></script>
  <link rel="stylesheet" href="<@spring.url "/css/home/map.css"/>">
</head>
<body>

<div id="buttons">
  <a class="btn btn-success m-2" type="button" href="<@spring.url "/home/index"/>">
    <i class="fa fa-arrow-left"></i>
  </a>
</div>

<div id="select">
  <select class="form-control m-2" id="map-type">
    <option value="roadmap">roadmap</option>
    <option value="satellite">satellite</option>
    <option value="hybrid">hybrid</option>
    <option value="terrain">terrain</option>
    <option value="dark_mode">dark_mode</option>
  </select>
</div>

<div id="map"></div>

</body>
</html>
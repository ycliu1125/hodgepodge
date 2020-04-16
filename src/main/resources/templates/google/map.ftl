<#ftl output_format="HTML" />
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Simple Google Map</title>
  <meta name="viewport" content="initial-scale=1.0">
    <#include "*/includes/meta.ftl">
  <script src="https://maps.googleapis.com/maps/api/js?key=${mapKey}&callback=initMap&libraries=visualization,drawing"></script>
  <script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js"></script>
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
<div id="capture"></div>
<#-- 顯示步驟-->
<#--<div id="directionsPanel" style="float:right;width:30%;height:100%"></div>-->

</body>
</html>
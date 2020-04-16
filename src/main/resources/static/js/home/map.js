var map;
var markers = [];
var heatmapData = [];

$(function () {
    initMap();
    // setScenicSpots();
    // initKmlMap();
    // addGeoJson();
    // initDirectionMap();
    // distanceMatrix();
    geoCoding();

    // 設定塗層上的 legend
    var buttons = $('#buttons')[0];
    var legend = $('#select')[0];

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(buttons);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(legend);

    $('#map-type').change(function () {
        map.setMapTypeId($(this).val());
    });

    // 畫圖工具bar (drawingManager)
    var drawingManager = new google.maps.drawing.DrawingManager();
    drawingManager.setMap(map);


});

function initMap() {
    var darkModeType = new google.maps.StyledMapType(myStyledMapJSON, {name: 'dark_mode'});

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 24.1617242, lng: 120.6680997},
        zoom: 8,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        //gestureHandling: 'none' // 預設是 greedy <--> none
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'dark_mode']
        }
    });

    map.mapTypes.set('dark_mode', darkModeType);

}

// 前10個 觀光景點
function setScenicSpots() {
    $.getJSON(
        'http://192.168.1.105/repo/temp/scenic_spot_C_f.json',
        function (data) {
            var i = 0;
            data.XML_Head.Infos.Info.forEach(function (info) {

                i++;
                // if (i < 10) { //這裡只印10個點就好
                var marker = new google.maps.Marker({
                    tist: {name: info.Name},
                    position: {lat: info.Py, lng: info.Px},
                    map: map
                });
                // 添加事件監聽器
                marker.addListener('click', function (data) {
                    map.setZoom(15);
                    map.setCenter(marker.getPosition());
                    var infowindow = new google.maps.InfoWindow({
                        content: marker.tist.name
                    });
                    infowindow.open(map, marker);
                });
                markers.push(marker);
                // }

                // 熱度圖
                // heatmapData.push(
                //     new google.maps.LatLng(info.Py, info.Px)
                // );

            });

            // Marker叢集
            var markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

            // 熱度圖
            // var heatmap = new google.maps.visualization.HeatmapLayer({
            //     data: heatmapData
            // });
            // heatmap.setMap(map);
        }
    );

}

// Displaying KML
function initKmlMap() {
    var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';

    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(-19.257753, 146.823688),
        zoom: 2,
        mapTypeId: 'terrain'
    });

    var kmlLayer = new google.maps.KmlLayer(src, {
        suppressInfoWindows: true,
        preserveViewport: false,
        map: map
    });
    kmlLayer.addListener('click', function (event) {
        var content = event.featureData.infoWindowHtml;
        var testimonial = document.getElementById('capture');
        testimonial.innerHTML = content;
    });
}

function addGeoJson() {
    $.getJSON("http://192.168.1.105/repo/temp/taiwan.json", function (data) {
        var features = map.data.addGeoJson(data);

        map.data.addListener('mouseover', function (event) {
            map.data.overrideStyle(event.feature, {fillColor: 'red'});
        });
        map.data.addListener('mouseout', function (event) {
            map.data.overrideStyle(event.feature, {fillColor: 'blue'});
        });
        map.data.addListener('click', function (event) {
            console.log(event);
        });
    });
}

function initDirectionMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var xxx = map;
    directionsRenderer.setMap(xxx);
    // 顯示步驟
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    var start = '台中火車站';
    var end = '勤美綠園道';
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status === 'OK') { // 建議處理 200 就好了
            console.log(result);
            directionsRenderer.setDirections(result);
        }
    });
}

function distanceMatrix() {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: ['台中火車站', '勤美綠園道'],
        destinations: ['臺中公園', '中友百貨'],
        travelMode: 'DRIVING'
    }, function (result, status) {
        if (status === 'OK') { // 建議處理 200 就好了
            console.log(result);
        }
    });
}

function geoCoding() {
    new google.maps.Geocoder().geocode(
        {'address': '台中市北區太原路一段532號5樓之3'},
        function (results, status) {
            if (status === 'OK') { // 建議處理 200 就好了
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                console.log(results);
            }
        }
    );
}


var myStyledMapJSON = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#263c3f"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6b9a76"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#38414e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#212a37"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9ca5b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1f2835"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f3d19c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2f3948"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#515c6d"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    }
];

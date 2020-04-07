var map;
var markers = [];

$(function () {
    initMap();
    setScenicSpots();

    // 設定塗層上的 legend
    var buttons = $('#buttons')[0];
    var legend = $('#select')[0];

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(buttons);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(legend);

    $('#map-type').change(function () {
        map.setMapTypeId($(this).val());
    });

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

    map.mapTypes.set('dark_mode', darkModeType)
}

// 前10個 觀光景點
function setScenicSpots() {
    $.getJSON(
        'http://192.168.1.105/repo/temp/scenic_spot_C_f.json',
        function (data) {
            var i = 0;
            data.XML_Head.Infos.Info.forEach(function (info) {
                i++;
                if (i < 10) { //這裡只印10個點就好
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
                }
            });
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

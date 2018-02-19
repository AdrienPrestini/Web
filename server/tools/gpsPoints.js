var geolib = require('geolib');

exports.getPolygonAroundLocation = function(lat, lng, distance) {
    var result = [];
    for(var i = 0; i < 5; ++i) {
        var point = geolib.computeDestinationPoint({latitude: lat, longitude: lng}, distance, 90*i);
        result.push([point.longitude, point.latitude]);
    }
    return result;
}
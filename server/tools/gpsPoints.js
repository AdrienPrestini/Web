var geolib = require('geolib');

exports.getPolygonAroundLocation = function(lat, lng, distance) {
    console.log(lat);
    var result = [];
    for(var i = 0; i < 5; ++i) {
        var point = geolib.computeDestinationPoint({latitude: lat, longitude: lng}, distance, 90*i);
        console.log(point);
        result.push([point.longitude, point.latitude]);
    }
    console.log(result);
    return result;
}
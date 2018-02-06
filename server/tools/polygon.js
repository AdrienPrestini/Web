var polyline = require('polyline');
var geolib = require('geolib');

var DISTANCE = 25;

exports.getPolygonByPolyline = function(_polyline) {
    var polyline_decoded = polyline.decode(_polyline);
    var result = [];
    var _bearing = [];

    for(var i = 1; i < polyline_decoded.length; ++i) {
        var bearing = geolib.getBearing(
            {latitude: polyline_decoded[i-1][0], longitude: polyline_decoded[i-1][1]}, 
            {latitude: polyline_decoded[i][0], longitude: polyline_decoded[i][1]}
        );
        _bearing.push(bearing);
    }

    var newBeginPos = geolib.computeDestinationPoint({latitude: polyline_decoded[0][0], longitude: polyline_decoded[0][1]}, DISTANCE, _bearing[0]-90);
    var array = [newBeginPos.longitude, newBeginPos.latitude];
    result.push(array);

    for(var i = 1; i < polyline_decoded.length-1; ++i) {
        var inf_bearing = _bearing[i-1];
        var sup_bearing = _bearing[i];
        var avg_bearing;
        if(sup_bearing > inf_bearing) {
            if((sup_bearing - inf_bearing) > 180) {
                avg_bearing = ((inf_bearing+sup_bearing)/2)+90;
            } else {
                avg_bearing = ((inf_bearing+sup_bearing)/2)-90;
            }
        } else {
            if((inf_bearing - sup_bearing) > 180) {
                avg_bearing = ((inf_bearing+sup_bearing)/2)+90;
            } else {
                avg_bearing = ((inf_bearing+sup_bearing)/2)-90;
            }
        }
        var new_pos = geolib.computeDestinationPoint({latitude: polyline_decoded[i][0], longitude: polyline_decoded[i][1]}, DISTANCE, avg_bearing);
        array = [new_pos.longitude, new_pos.latitude];
        result.push(array);
    }

    
    var newEndPos = geolib.computeDestinationPoint({latitude: polyline_decoded[polyline_decoded.length-1][0], longitude: polyline_decoded[polyline_decoded.length-1][1]}, DISTANCE, _bearing[_bearing.length-1]-90);
    var array = [newEndPos.longitude, newEndPos.latitude];
    result.push(array);

    var newEndPos2 = geolib.computeDestinationPoint({latitude: polyline_decoded[polyline_decoded.length-1][0], longitude: polyline_decoded[polyline_decoded.length-1][1]}, DISTANCE, _bearing[_bearing.length-1]+90);
    var array = [newEndPos2.longitude, newEndPos2.latitude];
    result.push(array);

    for(var i = polyline_decoded.length-2; i > 0; --i) {
        var inf_bearing = _bearing[i];
        var sup_bearing = _bearing[i-1];
        
        var avg_bearing;
        if(sup_bearing > inf_bearing) {
            if((sup_bearing - inf_bearing) > 180) {
                avg_bearing = ((inf_bearing+sup_bearing)/2)-90;
            } else {
                avg_bearing = ((inf_bearing+sup_bearing)/2)+90;
            }
        } else {
            if((inf_bearing - sup_bearing) > 180) {
                avg_bearing = ((inf_bearing+sup_bearing)/2)-90;
            } else {
                avg_bearing = ((inf_bearing+sup_bearing)/2)+90;
            }
        }
        
        var new_pos = geolib.computeDestinationPoint({latitude: polyline_decoded[i][0], longitude: polyline_decoded[i][1]}, DISTANCE, avg_bearing);
        array = [new_pos.longitude, new_pos.latitude];
        result.push(array);
    }

    var newBeginPos2 = geolib.computeDestinationPoint({latitude: polyline_decoded[0][0], longitude: polyline_decoded[0][1]}, DISTANCE, _bearing[0]+90);
    var array = [newBeginPos2.longitude, newBeginPos2.latitude];
    result.push(array);


    result.push(result[0]);
    return result;
}
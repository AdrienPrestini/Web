#!/bin/bash

SCRIPT_PATH="$(cd "$(dirname "$0")" && pwd)"

mongoimport --db accidents -c Accidents --file "$SCRIPT_PATH/accidents.geojson" --jsonArray
mongoimport --db accidents -c communes --file "$SCRIPT_PATH/communes.geojson" --jsonArray
mongoimport --db accidents -c departements --file "$SCRIPT_PATH/departements.geojson" --jsonArray
mongoimport --db accidents -c regions --file "$SCRIPT_PATH/regions.geojson" --jsonArray

mongoimport --db accidents_test -c Accidents --file "$SCRIPT_PATH/tests/accidents.json"
mongoimport --db accidents_test -c communes --file "$SCRIPT_PATH/tests/communes.json"
mongoimport --db accidents_test -c departements --file "$SCRIPT_PATH/tests/departements.json"
mongoimport --db accidents_test -c regions --file "$SCRIPT_PATH/tests/regions.json"
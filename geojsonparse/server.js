var fs = require('fs'); 
var parse = require('csv-parse');
const util = require('util');

var geojson = {
  type: 'FeatureCollection', 
  features: []
}

function randomNoise(min = 0, max = 1, startingDecimalPosition = 2, fractionDigits = 0, inclusive = true) {
  var precision = Math.pow(10, Math.max(fractionDigits, 0));
  var scaledMax = max * precision;
  var scaledMin = min * precision;
  var offset = inclusive ? 1 : 0;
  var num = Math.floor(Math.random() * (scaledMax - scaledMin + offset)) + scaledMin;

  var randomNumber = num / precision;
  
  return parseFloat(randomNumber - randomNumber.toFixed(startingDecimalPosition))
}

var csvData=[];
fs.createReadStream('data.csv')
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
        var feature = {};

        coords = csvrow[3].split(',');

        feature.type = 'Feature'; 
        feature.geometry = {}; 
        feature.geometry.type = 'Point'; 
        feature.geometry.coordinates = [coords[0] + randomNoise(0, 1, 2, 5, false), coords[1] + randomNoise(0, 1, 2, 5, false)];
        // feature.geometry.coordinates = [parseFloat(coords[0]), parseFloat(coords[1])]; // Lat long 
        feature.properties = {}; 
        feature.properties.title = csvrow[0];
        feature.properties.supplier_level = csvrow[7]; 
        feature.properties.specialized = csvrow[8]; 
        feature.properties.talens_specialized_order = csvrow[9];
        feature.properties.main_supplier_sops = csvrow[10];
        feature.properties.manufacturer = csvrow[4];

        // console.log(csvrow);
        //do something with csvrow
        geojson.features.push(feature)    
    })
    .on('end',function() {
      //do something with csvData
      console.log(util.inspect(geojson, {showHidden: false, depth: null}))
    });
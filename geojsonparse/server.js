var fs = require('fs'); 
var parse = require('csv-parse');
const util = require('util');

var geojson = {
  type: 'FeatureCollection', 
  features: []
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
        feature.geometry.coordinates = [parseFloat(coords[0]), parseFloat(coords[1])]; // Lat long 
        feature.properties = {}; 
        feature.properties.title = csvrow[0];
        feature.properties.supplier_level = csvrow[7]; 
        feature.properties.specialized = csvrow[8]; 
        feature.properties.talens_specialized_order = csvrow[9];
        feature.properties.main_supplier_sops = csvrow[10];

        // console.log(csvrow);
        //do something with csvrow
        geojson.features.push(feature)    
    })
    .on('end',function() {
      //do something with csvData
      console.log(util.inspect(geojson, {showHidden: false, depth: null}))
    });
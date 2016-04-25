/**
 * Created by bitcanny on 4/18/16.
 */

var parser = require('xml2json'),
    fs = require('fs');


fs.readFile(__dirname + '/ZWave_cmd_classes_001.xml', function(err, data) {

    var options = {
        object: false,
        reversible: true,
        coerce: true,
        sanitize: true,
        trim: true,
        arrayNotation: false
    };


    var json = parser.toJson(data, options);

    fs.writeFile("ZWave_cmd_classes_001.json",json,function(err){

        if(err){
            console.log(err);
        }else{
            console.log("New JSON File created...");
        }
    });


});

//var json = parser.toJson(xml); //returns a string containing the JSON structure by default
//console.log(json);






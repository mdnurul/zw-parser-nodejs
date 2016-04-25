/**
 * Created by bitcanny on 4/18/16.
 */

var fs = require('fs');

/*
var exjson = {'key':'...abc...', 'key2':'...xyz...'};
for(var exKey in exjson) {
    console.log("key:"+exKey+", value:"+exjson[exKey]);
}
 */

var NewZWaveCmdClass = {};

fs.readFile(__dirname + '/ZWave_cmd_classes_001.json', function(err, data) {

    if(err){console.log(err);}
    else{

        var ZWave_cmd_class =  JSON.parse(data);

        var zw_class =  ZWave_cmd_class.zw_classes;
        var basic_devices = zw_class.bas_dev;
        var generic_devices = zw_class.gen_dev;
        var zw_cmd_class = zw_class.cmd_class;

        NewZWaveCmdClass["zw_classes"] = {};


        NewZWaveCmdClass.zw_classes["bas_dev"] = {};
        zw_class["bas_dev"] = {};

        for(var i=0; i < basic_devices.length ; i++){
            NewZWaveCmdClass.zw_classes.bas_dev[basic_devices[i].name] = basic_devices[i];
            delete NewZWaveCmdClass.zw_classes.bas_dev[basic_devices[i].name].name;

        }
        console.log("Basic Device:",basic_devices.length);

        NewZWaveCmdClass.zw_classes["gen_dev"] = {};

        for(var j =0; j < generic_devices.length; j++){

            var genric_spec_dev = generic_devices[j].spec_dev;
            delete generic_devices[j].spec_dev;
            generic_devices[j]["spec_dev"] = {};
            generic_devices[j].spec_dev=  jsonArraytoObject(genric_spec_dev);

            NewZWaveCmdClass.zw_classes.gen_dev[generic_devices[j].name] = generic_devices[j];
            delete NewZWaveCmdClass.zw_classes.gen_dev[generic_devices[j].name].name;
        }

        console.log("Generic Device:",generic_devices.length);



        NewZWaveCmdClass.zw_classes["cmd_class"] = {};

        for(var k=0; k < zw_cmd_class.length; k++){

            if(zw_cmd_class[k].hasOwnProperty("cmd")){
                var command_class_cmd = zw_cmd_class[k].cmd;
                delete zw_cmd_class[k].spec_dev;

                zw_cmd_class[k]["cmd"] = {};
                zw_cmd_class[k].cmd = jsonArraytoObject(command_class_cmd);
            }

            var cmd_class_varsion = "";
            if(zw_cmd_class[k].hasOwnProperty("version")){
                cmd_class_varsion = zw_cmd_class[k].name+"_V"+ zw_cmd_class[k].version ;
                //console.log("Command Class Version",cmd_class_varsion);
            }else{
                cmd_class_varsion = zw_cmd_class[k].name;
                //console.log("Command Class Version",cmd_class_varsion);
            }

            NewZWaveCmdClass.zw_classes.cmd_class[cmd_class_varsion] = zw_cmd_class[k];
            delete NewZWaveCmdClass.zw_classes.cmd_class[cmd_class_varsion].name;
            delete NewZWaveCmdClass.zw_classes.cmd_class[cmd_class_varsion].help;
            delete NewZWaveCmdClass.zw_classes.cmd_class[cmd_class_varsion].read_only;
            delete NewZWaveCmdClass.zw_classes.cmd_class[cmd_class_varsion].comment;

        }

        console.log("Generic Device:",zw_cmd_class.length);



        fs.writeFile("New_ZWave_cmd_classes_001.json",JSON.stringify(NewZWaveCmdClass),function(err){

            if(err){
                console.log(err);
            }else{
                console.log("Json Reformat Complete:");
            }

        });

    }

});

var jsonArraytoObject = function(jsonArray){

    var jsonObj = {};

    for(var l=0; l < jsonArray.length; l++){

        jsonObj[jsonArray[l].name] = jsonArray[l];

        delete jsonObj[jsonArray[l].name].name;

    }

    return jsonObj;
};

/**
 * Created by bitcanny on 4/25/16.
 */


var fs = require('fs');

var rawdata1 = [133, 2, 1,3,6,9];

var rawdata2 = [133, 2, 1];
var rawdata3 = [133, 2, 1];
var rawdata4 = [133, 2, 1];
var rawdata5 = [133, 2, 1];



console.log("This is a encrip decretp test program...");

var data = fs.readFileSync('New_ZWave_cmd_classes_001.json').toString();

var zwcmdclass = JSON.parse(data);

var parseRawData = function(RawData){
    var commndPcket = {
        cmd_class: "",
        cmd: "",
        payload: []
    };
    var cmdClass = zwcmdclass.zw_classes.cmd_class;
    for (var klass in cmdClass) {
        if (RawData[0] == cmdClass[klass].key) {
            commndPcket.cmd_class = klass;
            var clscmd = cmdClass[klass].cmd;
            for (var clmd in clscmd) {
                if (RawData[1] == clscmd[clmd].key) {
                    commndPcket.cmd = clmd;
                    var data = rawdata1.slice(2,rawdata1.length);
                    commndPcket.payload = data;
                    return commndPcket;
                }
            }
        }
    }
};

var makeRawData = function(command_class, command, payload){
    var RawPack = [];

    var cmdClass = zwcmdclass.zw_classes.cmd_class;
    for (var klass in cmdClass) {
        if (command_class == klass) {
            RawPack.push(cmdClass[klass].key);
            var clscmd = cmdClass[klass].cmd;
            for (var clmd in clscmd) {
                if (command == clmd) {
                    RawPack.push(clscmd[clmd].key);
                    RawPack = RawPack.concat(payload);
                    return RawPack;
                }
            }
        }
    }
}


var unpack = parseRawData(rawdata1);

var pack = makeRawData(unpack.cmd_class, unpack.cmd, unpack.payload);

console.log("Parsed Unpack Packet:",unpack);
console.log("Parsed  make pack :",pack);





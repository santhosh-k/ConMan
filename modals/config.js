var mongoose = require("mongoose");

mongoose.connect("mongodb://192.168.8.101/CVP");

var databaseObject = mongoose.connection;

var Schema = mongoose.Schema;

var ConfigletSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    added_on: {
        type: Date,
        default: Date.now
    },
    config: {
        type: String,
        required: true
    },
    config_type: {
        type: String,
        default: "static"
    }
});

var configModel = databaseObject.model('config', ConfigletSchema);
module.exports = configModel
module.exports.add = function (config, callback) {
    var newConfig = new configModel(config);
    newConfig.save(function (err, res) {
        console.log(res);
    });
}
module.exports.get = function (configName, callback) {
    configModel.findOne({name:configName},function(err,config){
        if(!err){
            callback(config);
        }
    });
}
module.exports.getAll = function (callback) {
    configModel.find(function(err,configs){
        if(!err){
            callback(configs);
        }
    });
}
var mongoose = require("mongoose");

mongoose.connect("mongodb://192.168.8.101/CVP");

var db = mongoose.connection;

db.on('error', function (error) {
    console.log(error);
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
});

var userModel = module.exports = mongoose.model('users', userSchema);

module.exports.getDBPassword = function (userId, callback) {
    userModel.findOne({ username: userId }, function (err, user) {
        if (user) {
            callback(user.password);
        } else {
            callback(null);
        }
    });
}

module.exports.addUser = function (user, callback) {
    var newUser = new userModel(user);
    newUser.save(function (err, userObject) {
        console.log(userObject);
        if (!err) {
            callback("Added");
        } else {
            callback("Error");
        }
    });
}

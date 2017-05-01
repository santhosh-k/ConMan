var express = require('express');
var User = require("../modals/user")
var router = express.Router();

var handleSigninCallback = function (req, res) {

    var cookies = req.cookies;

    console.log(cookies);

    var reqBody = req.body;

    User.getDBPassword(reqBody.username, function (dbPass) {
        if (dbPass === null) {
            res.status(401);
            res.send("Unauthorized");
            res.end();
        } else {
            res.cookie("sessionId","generatredSessionId");
            res.status(200);
            res.send("Success");
            res.end();
        }
    });
}

var handleSignupCallback = function (req, res) {
    var reqBody = req.body;
    User.addUser(reqBody, function (result) {
        res.writeHead(200);
        res.write(result);
        res.end();
    });
}

router.post("/signin", handleSigninCallback);
router.post("/signup", handleSignupCallback);

module.exports = router;

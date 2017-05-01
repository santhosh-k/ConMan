var express = require("express");
var Config = require("../modals/config")
var router = express.Router();

var handleAddConfigCallback = function (req, res) {
    var reqBody = req.body;
    console.log(reqBody);
    Config.add(reqBody, function (result) {

    });
};

var handleGetConfigCallback = function (req, res) {
    var reqParams = req.params;
    console.log(reqParams.config_id);
    Config.get(reqParams.config_id, function (config) {
        if (config === null) {
            res.json({});
        } else {
            res.json(config);
        }
    });
}

var handleGetAllCallback = function (req, res) {
    Config.getAll(function (config) {
        if (config === null) {
            res.json([]);
        } else {
            res.json(config);
        }
    });
}

router.get("/getAll", handleGetAllCallback);
router.post("/add", handleAddConfigCallback);
router.get("/getConfig/:config_id", handleGetConfigCallback);
//router.delete("/delete/:config_id", handleDeleteConfigCallback);

module.exports = router;

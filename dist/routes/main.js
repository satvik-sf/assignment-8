"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get("/", function (req, res) {
    res.render('index');
});
router.post("/:id", function (req, res) {
});
router.delete("/:id", function (req, res) {
});
exports.default = router;

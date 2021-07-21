"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var pg_1 = __importDefault(require("pg"));
var conString = 'postgresql://admin:123456@localhost/user-db';
var client = new pg_1.default.Client(conString);
router.get("/", function (req, res) {
    client.connect();
    client.query('SELECT * FROM roles', function (err, result) {
        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows);
        res.render('index', { recipes: result.rows });
        client.end();
    });
});
router.post("/new/:id", function (req, res) {
});
router.patch("/update/:id", function (req, res) {
});
router.delete("/delete/:id", function (req, res) {
});
exports.default = router;

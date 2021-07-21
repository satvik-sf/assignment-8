"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var body_parser_1 = require("body-parser");
router.use(body_parser_1.json());
var pg_1 = require("pg");
// const conString = 'postgresql://admin:123456@localhost/user-db'
var pool = new pg_1.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'user-db',
    password: '123456',
    port: 5432,
});
router.get("/", function (req, res) {
    var query = 'SELECT * FROM users';
    pool.query(query, function (err, result) {
        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows);
        res.render('index', { recipes: result.rows });
    });
});
router.post("/new", function (req, res) {
    var query = "INSERT INTO users(\"first_name\", \"last_name\", \"phone\", \"email\", \"address\", \"role_id\", \"costumer_web\") VALUES( '" + req.body.first_name + "' , '" + req.body.last_name + "' ,'" + req.body.phone + "' , '" + req.body.email + "', '" + req.body.address + "' , '" + req.body.role_id + "' , '" + req.body.customer_web + "' )";
    // console.log(req.body);
    // console.log(`Hi, ${req.body.first_name}`);
    console.log(req.body.first_name + ", " + req.body.last_name + "," + req.body.phone + ", " + req.body.address + ", " + req.body.role_id + ", " + req.body.customer_web);
    pool.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});
router.patch("/update/:id", function (req, res) {
});
router.delete("/delete/:phone", function (req, res) {
    // client.connect();
    // client.query('DELETE FROM users WHERE phone = ${req.params.phone}', function(err, result) {
    //     if(err) {
    //      return console.error('error running query', err);
    //     }
    //     console.log(result.rows);
    //     client.end();
    //     res.redirect("/");
    // }); 
});
exports.default = router;

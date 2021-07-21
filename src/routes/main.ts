import {Router} from "express";
const router  = Router();

import pg from "pg";
const conString = 'postgresql://admin:123456@localhost/user-db'

var client = new pg.Client(conString);


router.get("/", (req, res) => {
    client.connect();
    client.query('SELECT * FROM roles', function(err, result) {
        if(err) {
         return console.error('error running query', err);
        }
        console.log(result.rows);
        res.render('index', {recipes: result.rows});
        client.end();
    }); 
});

router.post("/new/:id", (req, res) => {

});

router.patch("/update/:id", (req, res) => {

});

router.delete("/delete/:id", (req, res) => {

});


export default router;
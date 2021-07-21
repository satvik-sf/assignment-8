import {Router} from "express";
const router  = Router();
import {json} from 'body-parser';
router.use(json());


import {Pool} from "pg";

// const conString = 'postgresql://admin:123456@localhost/user-db'
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'user-db',
    password: '123456',
    port: 5432,
})

router.get("/", (req, res) => {
    let query = 'SELECT * FROM users';
    pool.query(query, (err, result) => {
        if(err) {
         return console.error('error running query', err);
        }
        // console.log(result.rows);
        res.render('index', {users: result.rows});
    }); 
});


router.post("/new", (req, res) => {
    let query = `INSERT INTO users("first_name", "last_name", "phone", "email", "address", "role_id", "costumer_web") VALUES( '${req.body.first_name}' , '${req.body.last_name}' ,'${req.body.phone}' , '${req.body.email}', '${req.body.address}' , '${req.body.role_id}' , '${req.body.costumer_web}' )`;
    // console.log(req.body);
    // console.log(`Hi, ${req.body.first_name}`);
    // console.log(`${req.body.first_name}, ${req.body.last_name},${req.body.phone}, ${req.body.address}, ${req.body.role_id}, ${req.body.customer_web}`);
    pool.query(query, function(err, result){
        if (err) {
            throw err;
        }
        res.redirect("/");
        // res.send(result);
    })
});


router.post("/update/:phone", (req, res) => {

    let phone = req.params.phone;
    console.log("update route");
    console.log(req.body, phone);
    let query = `UPDATE users SET "first_name"='${req.body.first_name}', "last_name"='${req.body.last_name}', "phone"='${req.body.phone}', email='${req.body.email}', address='${req.body.address}', role_id = ${Number.parseInt(req.body.role_id)} , costumer_web ='${req.body.costumer_web}' WHERE phone = '${phone}'`;
    console.log(query);
    pool.query(query, function(err, result){
        if (err) {
            throw err;
        }
        res.redirect("/");
        console.log("success");
    });

});

router.post("/delete/:phone", (req, res) => {

    const query = `DELETE from users where phone= '${req.params.phone}'`;
    pool.query(query, (error: any, result: any) => {
        if (error) {
            throw error
        }
        console.log(query, result);
        res.redirect("/");
    })
    
});


export default router;
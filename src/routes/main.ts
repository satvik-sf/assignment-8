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
    const query = 'SELECT * FROM users';
    pool.query(query, (err, result) => {
        if(err) {
         return console.error('error running query', err);
        }
        console.log(result.rows);
        res.render('index', {recipes: result.rows});
    }); 
});


router.post("/new", (req, res) => {
    const query = `INSERT INTO users("first_name", "last_name", "phone", "email", "address", "role_id", "costumer_web") VALUES( '${req.body.first_name}' , '${req.body.last_name}' ,'${req.body.phone}' , '${req.body.email}', '${req.body.address}' , '${req.body.role_id}' , '${req.body.customer_web}' )`;
    // console.log(req.body);
    // console.log(`Hi, ${req.body.first_name}`);
    console.log(`${req.body.first_name}, ${req.body.last_name},${req.body.phone}, ${req.body.address}, ${req.body.role_id}, ${req.body.customer_web}`);
    pool.query(query, (err: any, result: any) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
});

router.patch("/update/:id", (req, res) => {

});

router.delete("/delete/:phone", (req, res) => {
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


export default router;
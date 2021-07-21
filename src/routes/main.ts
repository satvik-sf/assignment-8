import {Router} from "express";
const router  = Router();


router.get("/", (req, res) => {
    res.render('index');
});

router.post("/:id", (req, res) => {

});

router.delete("/:id", (req, res) => {

});


export default router;
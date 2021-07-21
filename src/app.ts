import express, { Request, Response, NextFunction } from "express";
import { mainModule } from "process";
const app = express();

import {json} from 'body-parser';
app.use(json());

app.use(express.static('./public'));
app.set("view engine", "ejs");


import routes from "./routes/main";
app.use("/", routes);

app.set('view engine', 'ejs');

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({msg : err.message});
});

app.listen(3000, function(){
    console.log("Server Started");
});

import express, { Request, Response, NextFunction } from "express";
import { mainModule } from "process";
const app = express();

import routes from "./routes/main";

app.use("/", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({msg : err.message});
});

app.listen(3000, function(){
    console.log("Server Started");
});

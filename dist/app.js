"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var main_1 = __importDefault(require("./routes/main"));
app.use("/", main_1.default);
app.use(function (err, req, res, next) {
    res.status(500).json({ msg: err.message });
});
app.listen(3000, function () {
    console.log("Server Started");
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get("/");
router.post("/:id");
router.delete("/:id");
exports.default = router;

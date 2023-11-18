"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const createWallet_1 = require("./services/createWallet");
const adminAuth_1 = require("./services/adminAuth");
const readNFC_1 = require("./services/readNFC");
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res) => {
    res.send("Hello123!!");
});
exports.router.get("/signup", createWallet_1.createWallet);
exports.router.get("/login", adminAuth_1.adminAuth);
exports.router.get("/readnfc", readNFC_1.readNFC);
//# sourceMappingURL=routes.js.map
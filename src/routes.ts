import { Router } from "express";

import { createWallet } from "./services/createWallet";
import { adminAuth } from "./services/adminAuth";
import { readNFC } from "./services/readNFC";


export const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello123!!");
});

router.get("/signup", createWallet);
router.get("/login", adminAuth);
router.get("/readnfc", readNFC);
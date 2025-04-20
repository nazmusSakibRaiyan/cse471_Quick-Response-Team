import express from "express";
import {
	sendSoftSOS,
	setAsResolved,
	getAllNonResolvedSOS,
	getAllMySOS,
} from "../controllers/sosController.js";

const router = express.Router();

router.post("/sendSoftSOS", sendSoftSOS);
router.post("/setAsResolved", setAsResolved);
router.get("/", getAllNonResolvedSOS);
router.post("/mySOS", getAllMySOS);

export default router;

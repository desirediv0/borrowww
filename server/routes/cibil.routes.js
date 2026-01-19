
import express from "express";
import {
    listCibilData, cibilStats, listSubmittedCibil, listUnsubmittedCibil,
    updateCibilData, deleteCibilData, getUserCibilData,
    createCibilData, seedCibilData, getCibilDetails, downloadCibilPdf,
    userGetCibilReport
} from "../controllers/cibil.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Admin routes
router.get("/", adminAuth, listCibilData);
router.get("/stats", adminAuth, cibilStats);
router.get("/submitted", adminAuth, listSubmittedCibil);
router.get("/summit", adminAuth, listSubmittedCibil); // alias for submitted
router.post("/summit", adminAuth, listSubmittedCibil); // POST alias for submitted
router.get("/unsubmitted", adminAuth, listUnsubmittedCibil);
router.get("/unsummit", adminAuth, listUnsubmittedCibil); // alias for unsubmitted
router.post("/unsummit", adminAuth, listUnsubmittedCibil); // POST alias for unsubmitted
router.get("/details/:id", adminAuth, getCibilDetails);
router.get("/download/:id", adminAuth, downloadCibilPdf);
router.put("/:id", adminAuth, updateCibilData);
router.delete("/:id", adminAuth, deleteCibilData);

// User routes
router.get("/my", userAuth, getUserCibilData);
router.post("/create", userAuth, createCibilData);

// User-specific summit/unsummit
import {
    userSummitCibil,
    userUnsummitCibil,
    fetchCibilResult
} from "../controllers/cibil.controller.js";

// User delete unsubmitted CIBIL
import { userDeleteUnsummitCibil } from "../controllers/cibil.controller.js";

router.get("/user/summit", userAuth, userSummitCibil);
router.post("/user/summit", userAuth, userSummitCibil);
router.get("/user/unsummit", userAuth, userUnsummitCibil);
router.post("/user/unsummit", userAuth, userUnsummitCibil);

// Fetch CIBIL report result
router.post("/user/fetch-result", userAuth, fetchCibilResult);
router.post("/user/fetch-result/:transactionId", userAuth, userGetCibilReport);

// User delete unsubmitted CIBIL
router.delete("/user/unsummit/:id", userAuth, userDeleteUnsummitCibil);

// Seed API (admin only)
router.post("/seed", adminAuth, seedCibilData);

export default router;

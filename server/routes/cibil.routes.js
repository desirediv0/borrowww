
import express from "express";
import {
    listCibilData, cibilStats, listSubmittedCibil, listUnsubmittedCibil,
    updateCibilData, deleteCibilData, getUserCibilData,
    createCibilData, seedCibilData, getCibilDetails, downloadCibilPdf,
    userGetCibilReport
} from "../controllers/cibil.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Admin routes
router.get("/", isAdmin, listCibilData);
router.get("/stats", isAdmin, cibilStats);
router.get("/submitted", isAdmin, listSubmittedCibil);
router.get("/summit", isAdmin, listSubmittedCibil); // alias for submitted
router.post("/summit", isAdmin, listSubmittedCibil); // POST alias for submitted
router.get("/unsubmitted", isAdmin, listUnsubmittedCibil);
router.get("/unsummit", isAdmin, listUnsubmittedCibil); // alias for unsubmitted
router.post("/unsummit", isAdmin, listUnsubmittedCibil); // POST alias for unsubmitted
router.get("/details/:id", isAdmin, getCibilDetails);
router.get("/download/:id", isAdmin, downloadCibilPdf);
router.put("/:id", isAdmin, updateCibilData);
router.delete("/:id", isAdmin, deleteCibilData);

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
router.post("/seed", isAdmin, seedCibilData);

export default router;

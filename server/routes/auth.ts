import express from "express";

import { passport } from "../core/passport";
import AuthController from "../controller/AuthController";

const router = express.Router();
// ===== GitHub =====
router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  AuthController.authCallback
);
// ===============

// =====Phone =====

router.get(
  "/auth/sms/activate",
  passport.authenticate("jwt", { session: false }),
  AuthController.activate
);

router.get(
  "/auth/sms",
  passport.authenticate("jwt", { session: false }),
  AuthController.sendSms
);

router.get(
  "/auth/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.getMe
);

export default router;

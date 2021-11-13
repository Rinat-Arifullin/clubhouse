import Axios from "../../core/axios";
import express from "express";
import { passport } from "server/core/passport";
import { Code } from "../../models";

const router = express.Router();

// ===== GitHub =====
router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.send(
      `<script>
          window.close();
          window.opener.postMessage(${JSON.stringify(
            req.user
          )}, "http://localhost:3000/");
        </script>`
    );
  }
);
// ===============

// =====Phone =====

router.post("/auth/phone", async (req, res) => {
  const phone = req.body.phone;
  const user_id = req.body.user.id;
  if (!phone) {
    res.status(400);
  }
  const data = await Axios.get("");
  const code = await Code.create({
    code: Math.floor(Math.random() * 9000) + 1000,
    user_id,
  });
});

export default router;

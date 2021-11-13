import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { nanoid } from "nanoid";
import sharp from "sharp";
import fs from "fs";
import { Code } from "../models";

dotenv.config({
  path: "server/.env",
});

import { passport } from "./core/passport";
import Axios from "../core/axios";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        nanoid(6) +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const upload = multer({ storage: storage });

app.post("/upload", upload.single("photo"), async (req, res) => {
  const filePath = req.file?.path;
  const filePathResized =
    filePath?.replace(
      req.file?.filename ?? "",
      "resized-" + req.file?.filename
    ) ?? "";
  await sharp(filePath)
    .resize({ width: 150, height: 150 })
    .toFile(filePathResized, (err) => {
      if (err) {
        throw err;
      }
      fs.unlinkSync(filePath ?? "");
      res.json({
        url: `avatars/resized-${req.file?.filename}`,
      });
    });
});

app.post("/auth/phone", async (req, res) => {
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

app.get("/auth/github", passport.authenticate("github"));

app.get(
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

app.listen(3001, async () => {
  console.log("Server started!");
});

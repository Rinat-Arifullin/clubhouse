import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";

import routerAuth from "./routes/auth";

dotenv.config({
  path: "server/.env",
});

import { passport } from "./core/passport";
import { storage } from "./core/uploader";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const upload = multer({ storage });

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

app.use(routerAuth);

app.listen(3001, async () => {
  console.log("Server started!");
});

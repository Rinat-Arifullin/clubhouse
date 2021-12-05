import multer from "multer";
import { nanoid } from "nanoid";

export const storage = multer.diskStorage({
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

import multer from "multer";

import { __dirname } from "../utils/index.js";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ 
  storage, 
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
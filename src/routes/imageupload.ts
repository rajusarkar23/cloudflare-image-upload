import { Router } from "express";
import { uploadImg } from "../controllers/controller";
import multer from "multer";
const router = Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})


router.post("/upload", upload.single("image"), uploadImg)

export default router
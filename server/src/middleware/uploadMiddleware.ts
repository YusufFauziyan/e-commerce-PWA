import multer from "multer";

// Configuration Multer for handle upload
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Middleware untuk file upload
export const uploadMiddleware = upload.single("file");
export const uploadMultipleMiddleware = upload.array("files", 10); // Maksimum 10 file

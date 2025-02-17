import cloudinary from "../config/cloudinaryConfig";

// single image
export const uploadImage = async (
  file: Express.Multer.File,
  userEmail: string
) => {
  try {
    if (!file) {
      return null;
    }

    // Upload file ke Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `e-commerece-pwa/${userEmail}`, // Folder Cloudinary
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
};

// multiple images
export const uploadMultipleImages = async (
  files: Express.Multer.File[],
  userEmail: string
) => {
  try {
    if (!files || !(files instanceof Array)) {
      return null;
    }

    // Upload setiap file ke Cloudinary
    const uploadResults = await Promise.all(
      files.map((file: Express.Multer.File) =>
        cloudinary.uploader.upload(file.path, {
          folder: `e-commerece-pwa/${userEmail}/products`, // Folder Cloudinary
        })
      )
    );

    // Kumpulkan URL dan ID setiap file yang berhasil diupload
    const responseData = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    return responseData;
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
  }
};

export const deleteImage = async (public_id: string) => {
  if (!public_id) {
    return null;
  }

  try {
    // Menghapus gambar dari Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

export const deleteMultipleImages = async (public_ids: string[]) => {
  if (!Array.isArray(public_ids) || public_ids.length === 0) {
    return null;
  }

  try {
    const results = await Promise.all(
      public_ids.map(async (public_id) => {
        const result = await cloudinary.uploader.destroy(public_id);
        return { public_id, result };
      })
    );

    // Filter results
    const deleted = results
      .filter((item) => item.result.result === "ok")
      .map((item) => item.public_id);
    const notFound = results
      .filter((item) => item.result.result === "not found")
      .map((item) => item.public_id);
    const errors = results.filter(
      (item) =>
        item.result.result !== "ok" && item.result.result !== "not found"
    );

    return { deleted, notFound, errors };
  } catch (error) {
    console.error("Error deleting multiple images from Cloudinary:", error);
  }
};

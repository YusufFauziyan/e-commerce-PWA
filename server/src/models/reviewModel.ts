// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/passwordUtils";

interface Review extends RowDataPacket {
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
}

// get all review
export const getAllReviewModel = async (
  product_id: string
): Promise<Review[]> => {
  let query = "";

  if (product_id) {
    query = "SELECT * FROM Review WHERE product_id = ?";
  } else {
    query = "SELECT * FROM Review";
  }

  const [rows] = await db.query<Review[]>(query, [product_id]);
  const review = rows.map(({ review_id, ...row }) => {
    return {
      ...row,
      id: review_id,
    };
  });

  return review as Review[];
};

// get review by id
export const getReviewModel = async (id: string): Promise<Review | null> => {
  const query = "SELECT * FROM Review WHERE review_id = ?";
  const [rows] = await db.query<Review[]>(query, [id]);

  if (rows.length === 0) return null;

  const { review_id, ...review } = rows[0];

  return { ...review, id: review_id };
};

// post review
export const createReviewModel = async (review: Review): Promise<Review> => {
  const { product_id, user_id, rating, comment } = review;

  const reviewId = uuidv4();
  const query =
    "INSERT INTO Review (review_id, product_id, user_id, rating, comment) VALUES (?, ?, ?, ?, ?)";

  await db.query<ResultSetHeader>(query, [
    reviewId,
    product_id,
    user_id,
    rating,
    comment,
  ]);

  // Fetch the newly created review from the database
  const reviewDetail = await getReviewModel(reviewId);

  return reviewDetail as Review;
};

// put review
export const updateReviewModel = async (
  id: string,
  review: Review
): Promise<Review | null> => {
  // Fetch the existing review
  const [rows] = await db.query<Review[]>(
    "SELECT * FROM Review WHERE review_id = ?",
    [id]
  );

  if (rows.length === 0) return null;

  const existingReview = rows[0];

  // Update the review
  const query =
    "UPDATE Review SET street_review = ?, city = ?, postal_code = ? WHERE review_id = ?";

  await db.query<ResultSetHeader>(query, [
    review.street_review ?? existingReview.street_review,
    review.city ?? existingReview.city,
    review.postal_code ?? existingReview.postal_code,
    id,
  ]);

  // Fetch and return the updated review
  const reviewDetail = await getReviewModel(id);

  return reviewDetail as Review;
};

// delete review
export const deleteReviewModel = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM Review WHERE review_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};

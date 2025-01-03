// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/passwordUtils";

interface Category extends RowDataPacket {
  category_id: string;
  name: string;
  description: string;
}

// get all category
export const getAllCategoryModel = async (): Promise<Category[]> => {
  const query = "SELECT * FROM Category";

  const [rows] = await db.query<Category[]>(query);
  return rows as Category[];
};

// get category by id
export const getCategoryModel = async (
  id: string
): Promise<Category | null> => {
  const query = "SELECT * FROM Category WHERE category_id = ?";

  const [rows] = await db.query<Category[]>(query, [id]);
  return rows.length ? rows[0] : null;
};

// post category
export const createCategoryModel = async (
  category: Category
): Promise<Category> => {
  const { name, description } = category;

  const categoryId = uuidv4();
  const query =
    "INSERT INTO Category (category_id, name, description) VALUES (?, ?, ?)";

  await db.query<ResultSetHeader>(query, [categoryId, name, description]);

  // Fetch the newly created category from the database
  const [rows] = await db.query<Category[]>(
    "SELECT * FROM Category WHERE category_id = ?",
    [categoryId]
  );

  return rows[0];
};

// put category
export const updateCategoryModel = async (
  id: string,
  category: Category
): Promise<Category | null> => {
  // Fetch the existing category
  const [rows] = await db.query<Category[]>(
    "SELECT * FROM Category WHERE category_id = ?",
    [id]
  );

  if (rows.length === 0) return null;

  const existingCategory = rows[0];

  // Update the category
  const query =
    "UPDATE Category SET name = ?, description = ? WHERE category_id = ?";

  await db.query<ResultSetHeader>(query, [
    category.name ?? existingCategory.name,
    category.description ?? existingCategory.description,
    id,
  ]);

  // Fetch and return the updated category
  const [updatedRows] = await db.query<Category[]>(
    "SELECT * FROM Category WHERE category_id = ?",
    [id]
  );

  return updatedRows[0];
};

// delete category
export const deleteCategoryModel = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM Category WHERE category_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};

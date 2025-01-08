// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/passwordUtils";
import { getCategoryEmptyModel, getCategoryModel } from "./categoryModel";

interface Product extends RowDataPacket {
  name: string;
  description: string;
  price: number;
  stock_quantity: string;
  user_id: string;
  images: string[];
}

// get all product
export const getAllProductModel = async (): Promise<Product[]> => {
  const query = `
    SELECT p.*, GROUP_CONCAT(c.name) AS categories FROM Product p JOIN Product_Category pc USING(product_id) JOIN Category c USING(category_id) GROUP BY p.product_id;`;

  const [rows] = await db.query<Product[]>(query);

  const products = rows.map(({ product_id, ...product }) => {
    const categories = product.categories?.split(",").filter((f: string) => f);

    return {
      ...product,
      id: product_id,
      categories,
    };
  });

  return products as Product[];
};

// get product by id
export const getProductModel = async (id: string): Promise<Product | null> => {
  const query = `
    SELECT p.*, GROUP_CONCAT(c.name) AS categories FROM Product p JOIN Product_Category pc USING(product_id) JOIN Category c USING(category_id) WHERE p.product_id = ? GROUP BY p.product_id;`;

  const [rows] = await db.query<Product[]>(query, [id]);

  if (rows.length === 0) return null;

  const products = rows.map(({ product_id, ...product }) => {
    const categories = product.categories?.split(",").filter((f: string) => f);
    return {
      ...product,
      id: product_id,
      categories,
    };
  });

  if (products.length > 0) {
    return products[0];
  }

  const product = await findProductByIdModel(id);

  return product ? { ...product, categories: [] } : null;
};

// post product
export const createProductModel = async (
  product: Product
): Promise<Product> => {
  let {
    name,
    description,
    price,
    stock_quantity,
    user_id,
    images = [],
    categories = [],
  } = product;

  const emptyCategoryId = await getCategoryEmptyModel();

  if (categories.length === 0 && emptyCategoryId) {
    categories.push(emptyCategoryId);
  }

  const productId = uuidv4();
  const queryProduct =
    "INSERT INTO Product (product_id, name, description, price, stock_quantity, user_id, images) VALUES (?, ?, ?, ?, ?, ?, ?)";

  await db.query<ResultSetHeader>(queryProduct, [
    productId,
    name,
    description,
    price,
    stock_quantity,
    user_id,
    JSON.stringify(images),
  ]);

  // Insert product-category relations into Product_Category table (bulk insert)
  await Promise.all(
    categories.map((categoryId: string) =>
      insertProductCategoryModel(productId, categoryId)
    )
  );

  let categoriesDetail = [];
  const productDetail = await getProductModel(productId);

  categoriesDetail = await Promise.all(
    categories.map((categoryId: string) => getCategoryModel(categoryId))
  );

  return {
    ...productDetail,
    categories: categoriesDetail
      .filter((f) => f.name && f.description)
      .map((m) => m.name),
  } as Product;
};

// put product
export const updateProductModel = async (
  id: string,
  product: Product
): Promise<Product | null> => {
  // Fetch the existing product
  const productDetail = await getProductModel(id);

  if (!productDetail) return null;

  const existingProduct = productDetail;

  // // Update the product
  const queryProduct =
    "UPDATE Product SET name = ?, description = ?, price = ?, stock_quantity = ?, images = ? WHERE product_id = ?";

  await db.query<ResultSetHeader>(queryProduct, [
    product.name ?? existingProduct.name,
    product.description ?? existingProduct.description,
    product.price ?? existingProduct.price,
    product.stock_quantity ?? existingProduct.stock_quantity,
    product.images ? JSON.stringify(product.images) : existingProduct.images,
    id,
  ]);

  if (product.categories) {
    const queryProductCategory = `DELETE FROM Product_Category WHERE product_id = ?`;
    await db.query(queryProductCategory, [id]);

    const categories = (product.categories || []).filter((f: string) => f);

    const emptyCategoryId = await getCategoryEmptyModel();

    if (categories.length === 0 && emptyCategoryId) {
      categories.push(emptyCategoryId);
    }

    for (const categoryId of categories) {
      await insertProductCategoryModel(id, categoryId);
    }
  }

  // Fetch and return the updated product
  const updatedRows = await getProductModel(id);

  return updatedRows;
};

// delete product
export const deleteProductModel = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM Product WHERE product_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};

// inset into product_category
export const insertProductCategoryModel = async (
  productId: string,
  categoryId: string
): Promise<boolean> => {
  const query =
    "INSERT INTO Product_Category (product_id, category_id) VALUES (?, ?)";
  const [result] = await db.query<ResultSetHeader>(query, [
    productId,
    categoryId,
  ]);

  return result.affectedRows > 0;
};

// find product by id
export const findProductByIdModel = async (
  id: string
): Promise<Product | null> => {
  const query = `
    SELECT * FROM Product WHERE product_id = ?;`;

  const [rows] = await db.query<Product[]>(query, [id]);

  if (rows.length === 0) return null;

  const { product_id, ...product } = rows[0];

  return { ...product, id: product_id } as Product;
};

// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/passwordUtils";

interface User extends RowDataPacket {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  verified_phone_number: boolean;
  verified_email: boolean;
}

// get all users
export const getUsers = async (): Promise<User[]> => {
  const query = "SELECT * FROM User";
  const [rows] = await db.query<User[]>(query);
  const users = rows.map(({ user_id, ...user }) => ({
    ...user,
    id: user_id,
  }));

  return users as User[];
};

// get user by id
export const getUserByIdModel = async (id: string): Promise<User | null> => {
  const query = "SELECT * FROM User WHERE user_id = ?";
  const [rows] = await db.query<User[]>(query, [id]);

  if (rows.length === 0) return null;

  const { user_id, ...user } = rows[0];
  return { ...user, id: user_id } as User;
};

// post user
export const postUser = async (user: User): Promise<string> => {
  const { username, email, password, verified_email, surename } = user;

  // hash password
  const hashedPassword = await hashPassword(password);

  const userId = uuidv4();
  const query =
    "INSERT INTO User (user_id, username, email, password, verified_email, surename) VALUES (?, ?, ?, ?, ?)";

  await db.query<ResultSetHeader>(query, [
    userId,
    username,
    email,
    hashedPassword,
    verified_email,
    surename,
  ]);

  return userId;
};

// put user
export const updateUserById = async (
  id: string,
  user: User
): Promise<User | null> => {
  const exitingUser = await getUserByIdModel(id);

  const { username, email, password, phone_number, surename } = user;
  const query =
    "UPDATE User SET username = ?, email = ?, password = ?, phone_number = ?, surename = ? WHERE user_id = ?";

  const [result] = await db.query<ResultSetHeader>(query, [
    username || exitingUser?.username,
    email || exitingUser?.email,
    password || exitingUser?.password,
    phone_number || exitingUser?.phone_number,
    surename || exitingUser?.surename,
    id,
  ]);

  if (!result.affectedRows) return null;

  const updatedUser = await getUserByIdModel(id);

  return updatedUser;
};

// delete user
export const deleteUserById = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM User WHERE user_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};

// check user exists
export const checkUserExists = async (email: string): Promise<boolean> => {
  const query = "SELECT * FROM User WHERE email = ?";
  const [rows] = await db.query<User[]>(query, [email]);
  return rows.length > 0;
};

// check phone exits
export const checkPhoneExists = async (
  phone: string,
  user_id: string
): Promise<boolean> => {
  const query = "SELECT * FROM User WHERE phone_number = ? AND user_id <> ?";
  const [rows] = await db.query<User[]>(query, [phone, user_id]);
  return rows.length > 0;
};

// get user by email
export const getUserByEmail = async (
  email: string | undefined
): Promise<User | null> => {
  if (!email) return null;

  const query = "SELECT * FROM User WHERE email = ?";
  const [rows] = await db.query<User[]>(query, [email]);

  if (rows.length === 0) return null;

  const { user_id, ...user } = rows[0];
  return { ...user, id: user_id } as User;
};

// Save refresh token for a user
export const saveRefreshToken = async (
  userId: string,
  refreshToken: string
) => {
  const query = "UPDATE User SET refresh_token = ? WHERE user_id = ?";
  await db.execute(query, [refreshToken, userId]);
};

// Retrieve refresh token for a user
export const getRefreshToken = async (
  userId: string
): Promise<string | null> => {
  const query = "SELECT refresh_token FROM User WHERE user_id = ?";
  const [rows] = await db.execute<User[]>(query, [userId]);
  return rows[0]?.refresh_token || null;
};

// update verified phone number
export const updateVerifiedPhoneNumber = async (
  userId: string,
  phoneNumber: string,
  verifiedPhoneNumber: boolean
): Promise<User | null> => {
  const query =
    "UPDATE User SET phone_number = ?, verified_phone_number = ? WHERE user_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [
    phoneNumber,
    verifiedPhoneNumber,
    userId,
  ]);

  if (!result.affectedRows) return null;

  // Fetch the updated user
  const updatedUser = await getUserByIdModel(userId);

  return updatedUser;
};

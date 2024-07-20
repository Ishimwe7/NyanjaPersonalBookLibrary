import * as SQLite from "expo-sqlite";
import { Book } from "@/redux/types";
// Function to get the database connection
export const getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync("nyanja.books");
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      rating INTEGER,
      isRead BOOLEAN
    );
  `);
  return db;
};

// Function to insert a book into the database
// const addBook = async (book: Book) => {
//   const db = await getDBConnection();
//   const result = await db.runAsync(
//     "INSERT INTO books (title, author, rating, isRead) VALUES (?, ?, ?, ?)",
//     [book.title, book.author, book.rating, book.isRead]
//   );
//   console.log("Book added with ID:", result.lastInsertRowId);
// };
const addBook = async (book) => {
  try {
    const db = await getDBConnection();
    const { title, author, rating, isRead } = book;
    const result = await db.runAsync(
      "INSERT INTO books (title, author, rating, isRead) VALUES (?, ?, ?, ?)",
      [title, author, rating, isRead]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.log("An error occurred ", error);
    throw error;
  }
};
// Function to update a book in the database
const updateBook = async (book: Book) => {
  try {
    const db = await getDBConnection();
    const result = await db.runAsync(
      "UPDATE books SET title = ?, author = ?, rating = ? WHERE id = ?",
      [book.title, book.author, book.rating, book.id]
    );
    console.log("Number of rows updated:", result.changes);
  } catch (error) {
    console.log("An error occurred: ", error);
    throw error;
  }
};

const markBookAsRead = async (book: Book) => {
  try {
    const db = await getDBConnection();
    const result = await db.runAsync(
      "UPDATE books SET isRead = ? WHERE id = ?",
      [book.isRead, book.id]
    );
    console.log("Number of rows updated:", result.changes);
  } catch (error) {
    console.log("An error occurred: ", error);
    throw error;
  }
};

// Function to delete a book from the database
const deleteBook = async (id: number) => {
  try {
    const db = await getDBConnection();
    const result = await db.runAsync("DELETE FROM books WHERE id = ?", [id]);
    console.log("Number of rows deleted:", result.changes);
  } catch (error) {
    console.log("An error occurred: ", error);
    throw error;
  }
};

// Function to fetch a single book by id from the database
const getBookById = async (id: number) => {
  try {
    const db = await getDBConnection();
    const book = await db.getFirstAsync("SELECT * FROM books WHERE id = ?", [
      id,
    ]);
    console.log("Fetched book:", book);
    return book;
  } catch (error) {
    console.log("An error occurred: ", error);
  }
};

// Function to fetch all books from the database
const getAllBooks = async () => {
  try {
    const db = await getDBConnection();
    const books = await db.getAllAsync("SELECT * FROM books");
    console.log("Fetched books:", books);
    return books as Book[];
  } catch (error) {
    console.log("An error occurred: ", error);
    throw error;
  }
};

export {
  addBook,
  updateBook,
  markBookAsRead,
  deleteBook,
  getBookById,
  getAllBooks,
};

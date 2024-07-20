// // import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
// // import { Book } from '../redux/types';

// // const db: SQLiteDatabase = SQLite.openDatabase({ name: 'BookLibrary.db', location: 'default' });

// // export const initDatabase = (): Promise<void> => {
// //   return new Promise((resolve, reject) => {
// //     db.transaction((tx) => {
// //       tx.executeSql(
// //         'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, rating INTEGER, isRead INTEGER)',
// //         [],
// //         () => resolve(),
// //         (_, error) => reject(error)
// //       );
// //     });
// //   });
// // };

// // export const addBook = (book: Omit<Book, 'id'>): Promise<number> => {
// //   return new Promise((resolve, reject) => {
// //     db.transaction((tx) => {
// //       tx.executeSql(
// //         'INSERT INTO books (title, author, rating, isRead) VALUES (?, ?, ?, ?)',
// //         [book.title, book.author, book.rating, book.isRead ? 1 : 0],
// //         (_, result) => resolve(result.insertId),
// //         (_, error) => reject(error)
// //       );
// //     });
// //   });
// // };

// // export const getBooks = (): Promise<Book[]> => {
// //   return new Promise((resolve, reject) => {
// //     db.transaction((tx) => {
// //       tx.executeSql(
// //         'SELECT * FROM books',
// //         [],
// //         (_, result) => {
// //           const books: Book[] = [];
// //           for (let i = 0; i < result.rows.length; i++) {
// //             books.push(result.rows.item(i));
// //           }
// //           resolve(books);
// //         },
// //         (_, error) => reject(error)
// //       );
// //     });
// //   });
// // };

// // // Implement other CRUD operations (updateBook, deleteBook) here

// // src/services/DatabaseService.ts
// import SQLite, { SQLiteDatabase, openDatabase } from 'react-native-sqlite-storage';
// import { Book } from '../redux/types';

// // Enable promise-based SQLite
// SQLite.enablePromise(true);

// let db: SQLiteDatabase | null = null;

// export const initDatabase = async (): Promise<void> => {
//   if (db === null) {
//     db = await SQLite.openDatabase({ name: 'BookLibrary.db', location: 'default' });
//   }

//   return new Promise<void>((resolve, reject) => {
//     db!.transaction((tx) => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, rating INTEGER, isRead INTEGER)',
//         [],
//         () => resolve(),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// export const addBook = async (book: Omit<Book, 'id'>): Promise<number> => {
//   if (!db) {
//     await initDatabase();
//   }

//   return new Promise<number>((resolve, reject) => {
//     db!.transaction((tx) => {
//       tx.executeSql(
//         'INSERT INTO books (title, author, rating, isRead) VALUES (?, ?, ?, ?)',
//         [book.title, book.author, book.rating, book.isRead ? 1 : 0],
//         (_, result) => resolve(result.insertId),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// export const getBooks = async (): Promise<Book[]> => {
//   if (!db) {
//     await initDatabase();
//   }

//   return new Promise<Book[]>((resolve, reject) => {
//     db!.transaction((tx) => {
//       tx.executeSql(
//         'SELECT * FROM books',
//         [],
//         (_, result) => {
//           const books: Book[] = [];
//           for (let i = 0; i < result.rows.length; i++) {
//             books.push(result.rows.item(i));
//           }
//           resolve(books);
//         },
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// // Read (all books)

// // Read (single book)
// export const getBookById = async (id: number): Promise<Book | null> => {
//   if (!db) {
//     await initDatabase();
//   }

//   return new Promise<Book | null>((resolve, reject) => {
//     db!.transaction((tx) => {
//       tx.executeSql(
//         'SELECT * FROM books WHERE id = ?',
//         [id],
//         (_, result) => {
//           if (result.rows.length > 0) {
//             resolve(result.rows.item(0));
//           } else {
//             resolve(null);
//           }
//         },
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// // Update
// export const updateBook = async (book: Book): Promise<void> => {
//   if (!db) {
//     await initDatabase();
//   }

//   return new Promise<void>((resolve, reject) => {
//     db!.transaction((tx) => {
//       tx.executeSql(
//         'UPDATE books SET title = ?, author = ?, rating = ?, isRead = ? WHERE id = ?',
//         [book.title, book.author, book.rating, book.isRead ? 1 : 0, book.id],
//         (_, result) => {
//           if (result.rowsAffected > 0) {
//             resolve();
//           } else {
//             reject(new Error('No book found with the given id'));
//           }
//         },
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// // Delete
// export const deleteBook = async (id: number): Promise<void> => {
//   if (!db) {
//     await initDatabase();
//   }

//   return new Promise<void>((resolve, reject) => {
//     db!.transaction((tx) => {
//       tx.executeSql(
//         'DELETE FROM books WHERE id = ?',
//         [id],
//         (_, result) => {
//           if (result.rowsAffected > 0) {
//             resolve();
//           } else {
//             reject(new Error('No book found with the given id'));
//           }
//         },
//         (_, error) => reject(error)
//       );
//     });
//   });
// };
// // Implement other CRUD operations (updateBook, deleteBook) here

// export const closeDatabase = async (): Promise<void> => {
//   if (db) {
//     await db.close();
//     db = null;
//   }
// };

import { getDBConnection } from '../data-persistance/dbservice';
import { Book } from '../redux/types';

export const addBook = async (book: Omit<Book, 'id'>): Promise<number> => {
  const db = await getDBConnection();

  return new Promise<number>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO books (title, author, rating, isRead) VALUES (?, ?, ?, ?);`,
        [book.title, book.author, book.rating, book.isRead ? 1 : 0],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

export const getBooks = async (): Promise<Book[]> => {
  const db = await getDBConnection();

  return new Promise<Book[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM books',
        [],
        (_, result) => {
          const books: Book[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            books.push(result.rows.item(i));
          }
          resolve(books);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const getBookById = async (id: number): Promise<Book | null> => {
  const db = await getDBConnection();

  return new Promise<Book | null>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM books WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateBook = async (book: Book): Promise<void> => {
  const db = await getDBConnection();

  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE books SET title = ?, author = ?, rating = ?, isRead = ? WHERE id = ?',
        [book.title, book.author, book.rating, book.isRead ? 1 : 0, book.id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error('No book found with the given id'));
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteBook = async (id: number): Promise<void> => {
  const db = await getDBConnection();

  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM books WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error('No book found with the given id'));
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};
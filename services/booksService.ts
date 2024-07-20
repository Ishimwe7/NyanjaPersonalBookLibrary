import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Book } from '../redux/types';

const tableName = 'books';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'nyanja-books.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getBooks = async (db: SQLiteDatabase): Promise<Book[]> => {
  try {
    const books: Book[] = [];
    const results = await db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        books.push(result.rows.item(index))
      }
    });
    return books;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Books !!!');
  }
};

// export const addBook = async (db: SQLiteDatabase, books: Book[]) => {
//   const insertQuery =
//     `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
//     books.map(i => `(${i.id}, '${i.title}','${i.author}','${i.rating}','${i.rating}')`).join(',');

//   return db.executeSql(insertQuery);
// };
export const addBook = async (db: SQLiteDatabase, book: Omit<Book, 'id'>): Promise<number> => {
  const insertQuery = `INSERT INTO ${tableName} (title, author, rating, read) VALUES (?, ?, ?, ?)`;
  const result = await db.executeSql(insertQuery, [book.title, book.author, book.rating, book.isRead]);
  const insertId = result[0].insertId;
  return insertId;
};

export const updateBook = async (db: SQLiteDatabase, book: Book) => {
  const updateQuery = `UPDATE ${tableName} SET title = ?, author = ?, rating = ?, read = ? WHERE id = ?`;
  await db.executeSql(updateQuery, [book.title, book.author, book.rating, book.isRead, book.id]);
};


export const deleteBook = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
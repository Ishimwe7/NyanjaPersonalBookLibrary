import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'books.db',
    location: 'default',
  },
  () => {
    console.log('Database Connection Succeded');
  },
  (error) => {
    console.error(error);
  }
);

export const createTable = (): void => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        rating INTEGER,
        read INTEGER
      );`
    );
  });
};

export const addBook = (title: string, author: string, rating: number, read: number): void => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO books (title, author, rating, read) VALUES (?, ?, ?, ?);`,
      [title, author, rating, read]
    );
  });
};


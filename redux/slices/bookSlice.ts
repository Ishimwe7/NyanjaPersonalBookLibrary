import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types";
import {
  getAllBooks,
  addBook as addBookToDB,
  updateBook as updateBookInDB,
  markBookAsRead,
  deleteBook as deleteBookFromDB,
  editImage as editImageFromDB,
} from "@/data-persistance/sqliteconfig";

interface BooksState {
  items: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: "idle",
  error: null,
};

// Thunk to fetch books from the database
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const books = await getAllBooks();
  return books;
});

// Thunk to add a new book to the database
export const addBook = createAsyncThunk(
  "books/addBook",
  async (book: Omit<Book, "id">) => {
    const id = await addBookToDB(book);
    return { ...book, id } as Book;
  }
);

// Thunk to update an existing book in the database
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (book: Book) => {
    await updateBookInDB(book);
    return book;
  }
);
export const readBook = createAsyncThunk(
  "books/readBook",
  async (book: Book) => {
    await markBookAsRead(book);
    return book;
  }
);
export const editImage = createAsyncThunk(
  "books/editImage",
  async (book: Book) => {
    await editImage(book);
    return book;
  }
);

// Thunk to delete a book from the database
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: number) => {
    await deleteBookFromDB(id);
    return id;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.items.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.items.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(readBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.items.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editImage.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.items.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((book) => book.id !== action.payload);
      });
  },
});

export default booksSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as DatabaseService from '../../services/dbService';
import { Book } from '../types';

interface BooksState {
  items: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const books = await DatabaseService.getBooks();
  return books;
});

export const addBook = createAsyncThunk(
  'books/addBook',
  async (book: Omit<Book, 'id'>) => {
    const id = await DatabaseService.addBook(book);
    console.log(book);
    return { ...book, id };
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async (book: Book) => {
    await DatabaseService.updateBook(book);
    return book;
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id: number) => {
    await DatabaseService.deleteBook(id);
    return id;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.items.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.items.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(book => book.id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
export interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  isRead: boolean;
}

export interface RootState {
  books: {
    items: Book[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  settings: {
    sortBy: "title" | "author" | "rating";
    theme: "light" | "dark";
  };
}

export type RootStackParamList = {
  Home: undefined;
  BookDetail: { bookId: string };
  AddBook: undefined;
  Settings: undefined;
};

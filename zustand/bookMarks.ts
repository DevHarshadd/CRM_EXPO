import { create } from "zustand";

type BookmarkState = {
  bookmarks: any[];
  setBookmarks: (data: any[]) => void;
};

export const useBookmarkStore = create<BookmarkState>((set) => ({
  bookmarks: [],
  setBookmarks: (data) => set({ bookmarks: data }),
}));
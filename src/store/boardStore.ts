import { create } from "zustand";

interface BoardState {
  totalCount: number;
  currentPage: number;

  setTotalCount: (count: number) => void;
  setCurrentPage: (page: number) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  totalCount: 0,
  currentPage: 1,

  setTotalCount: (count) => set({ totalCount: count }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));

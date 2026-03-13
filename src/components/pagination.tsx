"use client";

import { useBoardStore } from "@/store/boardStore";

export default function Pagination() {
  const totalCount = useBoardStore((state) => state.totalCount);
  const pageSize = 8;
  const totalPage = Math.ceil(totalCount / pageSize);

  const setCurrentPage = useBoardStore((state) => state.setCurrentPage);
  const currentPage = useBoardStore((state) => state.currentPage);

  const pageGroupSize = 10;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPage);

  //버튼 배열 생성
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  if (totalCount === 0) return null;

  return (
    <div className="mt-6 flex justify-center gap-1 text-sm">
      <button
        onClick={() => {
          setCurrentPage(1);
        }}
        className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100"
      >
        {"<<"}
      </button>

      <button
        className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100"
        onClick={() => {
          setCurrentPage(Math.max(currentPage - 1, 1));
        }}
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
          }}
          className={
            currentPage === page
              ? `text-white" rounded border border-blue-400 bg-blue-400 px-3 py-1`
              : `bg-white-400 text-white" rounded border border-gray-300 px-3 py-1`
          }
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => {
          setCurrentPage(Math.min(currentPage + 1, totalPage));
        }}
        className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100"
      >
        {">"}
      </button>

      <button
        onClick={() => {
          setCurrentPage(totalPage);
        }}
        className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100"
      >
        {">>"}
      </button>
    </div>
  );
}

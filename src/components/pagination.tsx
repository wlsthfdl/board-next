"use client";

import { useBoardStore } from "@/store/boardStore";

export default function Pagination() {
  const totalCount = useBoardStore((state) => state.totalCount);
  const pageSize = 2;
  const totalPage = Math.ceil(totalCount / pageSize);
  const setCurrentPage = useBoardStore((state) => state.setCurrentPage);

  //버튼 배열 생성
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex justify-center gap-1 text-sm">
      <button className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100">
        {"<<"}
      </button>

      <button className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100">
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
          }}
          className="rounded border border-blue-400 bg-blue-400 px-3 py-1 text-white"
        >
          {page}
        </button>
      ))}

      <button className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100">
        {">"}
      </button>

      <button className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100">
        {">>"}
      </button>
    </div>
  );
}

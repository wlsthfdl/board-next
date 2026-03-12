"use client";

import { useBoardStore } from "@/store/boardStore";

export default function ListInfo() {
  //totalCount 읽기
  const totalCnt = useBoardStore((state) => state.totalCount);
  const currentPage = useBoardStore((state) => state.currentPage);
  const pageSize = 2;
  const totalPage = Math.ceil(totalCnt / pageSize);

  return (
    <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
      <div className="font-medium">
        현재 페이지 {currentPage} / {totalPage}
      </div>
      <div>총 {totalCnt}건이 검색되었습니다.</div>
    </div>
  );
}

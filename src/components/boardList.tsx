"use client";

import BoardItem from "./board-item";
import { BoardData } from "@/types";
import { useState, useEffect } from "react";
import { getBoards } from "@/lib/board";
import { useSearchParams } from "next/navigation";
import { useBoardStore } from "@/store/boardStore";

export default function BoardList() {
  const searchParam = useSearchParams();
  const q = searchParam.get("q") ?? "";

  const [boards, setBoards] = useState<BoardData[]>([]);

  //총 게시물 개수 set
  const setTotalCount = useBoardStore((state) => state.setTotalCount);
  const totalCount = useBoardStore((state) => state.totalCount);
  const currentPage = useBoardStore((state) => state.currentPage);

  const pageSize = 2;
  useEffect(() => {
    async function load() {
      const data = await getBoards();

      //검색어 포함 항목
      const filtered = data.filter((board) => board.title.includes(q));
      //내림차순 정렬
      const sorted = filtered.sort((a, b) => Number(b.id) - Number(a.id));
      //총 게시글 개수
      setTotalCount(filtered.length);

      //pagination
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;

      setBoards(sorted.slice(start, end));
    }

    load();
  }, [q, currentPage]);

  return (
    <div className="border-t border-gray-200">
      {/* header */}
      <div className="grid grid-cols-12 border-b bg-blue-50 px-4 py-1 text-sm font-semibold text-gray-600">
        <div className="col-span-1 text-center">번호</div>
        <div className="col-span-8">제목</div>
        <div className="col-span-3 text-center">작성일</div>
      </div>

      {/* list */}
      {boards.map((board, index) => {
        return (
          <BoardItem
            key={board.id}
            board={board}
            total={totalCount - (currentPage - 1) - index}
          ></BoardItem>
        );
      })}
    </div>
  );
}

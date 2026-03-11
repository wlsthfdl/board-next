"use client";

import BoardItem from "./board-item";
import { BoardData } from "@/types";
import { useState, useEffect } from "react";
import { getBoards } from "@/lib/board";
import { useSearchParams } from "next/navigation";

export default function BoardList() {
  const searchParam = useSearchParams();
  const q = searchParam.get("q") ?? "";

  const [boards, setBoards] = useState<BoardData[]>([]);

  console.log(boards);
  useEffect(() => {
    async function load() {
      const data = await getBoards();

      //검색어 포함 항목
      const filtered = data.filter((board) => board.title.includes(q));

      const sorted = filtered.sort((a, b) => Number(b.id) - Number(a.id));

      setBoards(sorted);
    }

    load();
  }, [q]);

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
            total={boards.length - index}
          ></BoardItem>
        );
      })}
    </div>
  );
}

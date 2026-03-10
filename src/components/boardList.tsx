"use client";

import BoardItem from "./board-item";
import { BoardData } from "@/types";
import { useState, useEffect } from "react";
import { getBoards } from "@/lib/board";

export default function BoardList() {
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getBoards();
      setBoards(data);
    }

    load();
  }, []);

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

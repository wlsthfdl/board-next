import type { BoardData } from "@/types";
import Link from "next/link";

export default function BoardItem({
  board,
  total,
}: {
  board: BoardData;
  total: number;
}) {
  return (
    <Link
      href={`/board/${board.id}`}
      className="grid grid-cols-12 border-b px-4 py-3 text-sm"
    >
      <div className="col-span-1 text-center text-gray-500">{total}</div>

      <div className="col-span-7 cursor-pointer hover:underline">
        {board.title}
        <img src="/img2.png" className="ml-2 inline h-4 w-4"></img>
      </div>

      <div className="col-span-3 text-center text-gray-500">{board.date}</div>
      <div className="col-span-1 text-center text-gray-500">
        {board.views ?? 0}
      </div>
    </Link>
  );
}

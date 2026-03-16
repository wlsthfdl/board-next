import type { BoardData } from "@/types";
import Link from "next/link";

export default function BoardItem({
  board,
  total,
}: {
  board: BoardData;
  total: number;
}) {
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 60000);

      if (minutes < 60) return `${minutes}분 전`;

      const hour = Math.floor(diff / 3600000);
      return `${hour}시간 전`;
    }
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  return (
    <Link
      href={`/board/${board.id}`}
      className="grid grid-cols-12 border-b px-4 py-3 text-sm"
    >
      <div className="col-span-1 text-center text-gray-500">{total}</div>

      <div className="col-span-6 cursor-pointer hover:underline">
        {board.title}
        <img src="/img2.png" className="ml-2 inline h-4 w-4"></img>
      </div>

      <div className="col-span-4 text-center text-gray-500">
        {formatDate(board.date)}
      </div>
      <div className="col-span-1 text-center text-gray-500">
        {board.views ?? 0}
      </div>
    </Link>
  );
}

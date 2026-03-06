import type { BoardData } from "@/types";
import Link from "next/link";

export default function BoardItem({
  id,
  title,
  nickname,
  userId,
  date,
  content,
}: BoardData) {
  return (
    <Link href={`/board/${id}`}>
      <div className="grid min-h-[480px] grid-cols-12 border-b px-4 py-3 text-sm">
        <div className="col-span-1 text-center text-gray-500">{id}</div>

        <div className="col-span-8 cursor-pointer hover:underline">{title}</div>

        <div className="col-span-3 text-center text-gray-500">{date}</div>
      </div>
    </Link>
  );
}

import Link from "next/link";

export default function Searchbar() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex w-[35%] gap-2">
        <input className="flex-[3] rounded border px-2 py-2" />
        <button className="bg-white-100 flex-[1] cursor-pointer rounded bg-blue-400 text-white">
          검색
        </button>
      </div>

      <Link
        href="/board/write"
        className="rounded bg-blue-400 px-4 py-2 text-white"
      >
        글쓰기
      </Link>
    </div>
  );
}

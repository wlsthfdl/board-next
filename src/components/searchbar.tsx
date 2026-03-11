"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const searchParam = useSearchParams();

  const q = searchParam.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;

    //url이 변경되면 자동 라우팅, board/page.tsx실행
    router.push(`/board?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex w-[35%] gap-2">
        <input
          value={search}
          className="flex-[3] rounded border px-2 py-2"
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <button
          className="bg-white-100 flex-[1] cursor-pointer rounded bg-blue-400 text-white"
          onClick={onSubmit}
        >
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

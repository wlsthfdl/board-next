"use client";

import { getBoard, addBoards, editBoards } from "@/lib/board";
import { BoardData } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BoardForm({
  id,
  mode,
}: {
  id?: string;
  mode: "write" | "edit";
}) {
  const [form, setForm] = useState<BoardData>({
    id: 0,
    title: "",
    content: "",
    nickname: "",
    userId: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const router = useRouter();

  useEffect(() => {
    async function load() {
      //edit 모드
      if (mode === "edit") {
        if (!id) {
          router.push("/board");
          return;
        }
        const data = await getBoard(id);

        if (data) {
          setForm(data);
        } else {
          alert("존재하지 않는 게시글입니다.");
          router.push("/board");
          return;
        }
      }

      //write 모드
      else if (mode === "write") {
        setForm((prev) => ({
          ...prev,
          date: new Date().toISOString().slice(0, 10),
        }));
      }
    }

    load();
  }, [id, mode, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    const msg = `게시글을 ${mode === "write" ? "등록" : "수정"} 하시겠습니까?`;

    if (!confirm(msg)) return;

    if (mode === "write") {
      addBoards(form);
      alert("게시글이 등록 되었습니다.");
    } else if (mode === "edit" && id) {
      editBoards(form, Number(id));
      alert("게시글이 수정 되었습니다.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-5">
      {/* 제목 */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 font-medium">제목</label>
        <input
          value={form.title}
          name="title"
          type="text"
          className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="게시글 제목을 입력하세요"
          onChange={handleChange}
        />
      </div>

      {/* 닉네임 */}
      <div className="mb-4 flex gap-4">
        <div className="flex flex-1 flex-col">
          <label className="mb-1 font-medium">작성자 닉네임</label>
          <input
            value={form.nickname}
            name="nickname"
            type="text"
            className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="닉네임 입력"
            onChange={handleChange}
          />
        </div>

        {/* 유저ID */}
        <div className="flex flex-1 flex-col">
          <label className="mb-1 font-medium">ID</label>
          <input
            value={form.userId}
            name="userId"
            type="text"
            className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="자동 생성 또는 입력 가능"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 작성일 */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 font-medium">작성일</label>
        <input
          value={form.date}
          name="date"
          type="date"
          className="rounded border border-gray-300 bg-gray-100 px-3 py-2"
          onChange={handleChange}
        />
      </div>

      {/* 내용 */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 font-medium">내용</label>
        <textarea
          value={form.content}
          name="content"
          className="h-60 resize-none rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="게시글 내용을 입력하세요"
          onChange={handleChange}
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-2">
        <button
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
          onClick={() => router.push("/board")}
        >
          뒤로가기
        </button>
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          onClick={handleSubmit}
        >
          {mode === "write" ? `등록` : `수정`}
        </button>
      </div>
    </div>
  );
}

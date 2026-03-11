"use client";

import { getBoard, addBoard, editBoard, deleteBoard } from "@/lib/board";
import { BoardData } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validation } from "@/app/utils/validation";

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
    if (!validation(form)) return;
    const msg = `게시글을 ${mode === "write" ? "등록" : "수정"} 하시겠습니까?`;

    if (!confirm(msg)) return;

    if (mode === "write") {
      addBoard(form);
      alert("게시글이 등록되었습니다.");
    } else if (mode === "edit" && id) {
      editBoard(form, Number(id));
      alert("게시글이 수정되었습니다.");
    }
  }

  function handleDelete() {
    const msg = "게시글을 삭제 하시겠습니까?";
    if (!confirm(msg)) return;

    deleteBoard(Number(id));
    alert("게시글이 삭제되었습니다.");
    router.push("/board");
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
          maxLength={200}
        />
      </div>

      {/* 닉네임 */}
      <div className="mb-4 flex gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-4">
            <label className="font-medium">닉네임</label>
            <span className="text-xs text-gray-500">
              ※ 영문, 숫자, _(underscore)만 사용 가능
            </span>
          </div>

          <input
            value={form.nickname}
            name="nickname"
            type="text"
            className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="닉네임 입력"
            onChange={handleChange}
            maxLength={25}
          />
        </div>

        {/* 유저ID */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-4">
            <label className="font-medium">ID</label>
            <span className="text-xs text-gray-500">
              ※ E-mail 형식으로 입력해주세요
            </span>
          </div>

          <input
            value={form.userId}
            name="userId"
            type="email"
            className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="자동 생성 또는 입력 가능"
            onChange={handleChange}
            maxLength={100}
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
          maxLength={10}
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
          maxLength={5000}
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-2">
        {mode === "edit" && (
          <button
            className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
            onClick={handleDelete}
          >
            삭제
          </button>
        )}
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

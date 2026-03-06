export default function BoardForm() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-5">
      {/* 제목 */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 font-medium">제목</label>
        <input
          type="text"
          className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="게시글 제목을 입력하세요"
        />
      </div>

      {/* 작성자 / ID */}
      <div className="mb-4 flex gap-4">
        <div className="flex flex-1 flex-col">
          <label className="mb-1 font-medium">작성자 닉네임</label>
          <input
            type="text"
            className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="닉네임 입력"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label className="mb-1 font-medium">ID</label>
          <input
            type="text"
            className="rounded border border-gray-300 bg-gray-100 px-3 py-2"
            placeholder="자동 생성 또는 입력 가능"
            readOnly
          />
        </div>
      </div>

      {/* 작성일 */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 font-medium">작성일</label>
        <input
          type="text"
          className="rounded border border-gray-300 bg-gray-100 px-3 py-2"
          value="YYYY-MM-DD"
          readOnly
        />
      </div>

      {/* 내용 */}
      <div className="mb-4 flex flex-col">
        <label className="mb-1 font-medium">내용</label>
        <textarea
          className="h-60 resize-none rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="게시글 내용을 입력하세요"
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-2">
        <button className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100">
          취소
        </button>
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
          등록
        </button>
      </div>
    </div>
  );
}

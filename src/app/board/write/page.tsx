import BoardForm from "@/components/boardForm";
export default function Page() {
  return (
    <div>
      <h1 className="mb-6 border-b pb-2 text-2xl font-bold">게시글 작성</h1>
      <BoardForm mode={"write"}></BoardForm>
    </div>
  );
}

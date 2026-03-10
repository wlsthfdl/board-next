import BoardForm from "@/components/boardForm";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div>
      <h1 className="mb-6 border-b pb-2 text-2xl font-bold">게시글</h1>
      <BoardForm mode={"edit"} id={id}></BoardForm>
    </div>
  );
}

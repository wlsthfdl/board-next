export default function Pagination() {
  return (
    <div className="mt-6 flex justify-center gap-1 text-sm">
      <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100">
        {"<<"}
      </button>

      <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100">
        {"<"}
      </button>

      <button className="rounded border border-blue-400 bg-blue-400 px-3 py-1 text-white">
        1
      </button>

      <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100">
        2
      </button>

      <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100">
        {">"}
      </button>

      <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100">
        {">>"}
      </button>
    </div>
  );
}

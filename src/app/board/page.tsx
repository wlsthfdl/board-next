import Searchbar from "@/components/searchbar";
import ListInfo from "@/components/listInfo";
import BoardList from "@/components/boardList";
import Pagination from "@/components/pagination";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* 검색 */}
      <Searchbar></Searchbar>
      {/* list_info */}
      <ListInfo></ListInfo>
      {/* 게시글 목록 */}
      <BoardList></BoardList>
      {/* 페이지네이션 */}
      <Pagination></Pagination>
    </div>
  );
}

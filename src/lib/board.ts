import { BoardData } from "@/types";
import mockData from "./../mock/board.json";

//목록
export async function getBoards(): Promise<BoardData[]> {
  const data = localStorage.getItem("board");

  if (!data) {
    localStorage.setItem("board", JSON.stringify(mockData));
    return mockData;
  }

  return JSON.parse(data);
}

//데이터 1개
export async function getBoard(id: string): Promise<BoardData | undefined> {
  const data = localStorage.getItem("board");

  if (!data) return undefined;

  const boards: BoardData[] = JSON.parse(data);

  return boards.find((item) => Number(item.id) === Number(id));
}

//등록
export async function addBoard(data: BoardData): Promise<BoardData[]> {
  const boards = await getBoards();

  const newBoards = {
    ...data,
    id: Date.now(),
  };
  const updateBoards = [...boards, newBoards];

  localStorage.setItem("board", JSON.stringify(updateBoards));

  return updateBoards;
}

//수정
export async function editBoard(data: BoardData, id: number) {
  const boards = await getBoards();

  /// {...prev, ...data} spread: 뒤에있는 값이 앞에있는 값을 덮어쓴다.
  const updateBoards = boards.map((prev) =>
    Number(prev.id) === Number(id) ? { ...prev, ...data } : prev,
  );

  localStorage.setItem("board", JSON.stringify(updateBoards));
}

//삭제
export async function deleteBoard(id: number) {
  const boards = await getBoards();
  const delBoard = boards.filter((item) => Number(item.id) !== Number(id));

  localStorage.setItem("board", JSON.stringify(delBoard));
}

//조회수 증가
export async function increaseView(id: number) {
  const boards = await getBoards();

  const updateViewBoard = boards.map((item) =>
    Number(item.id) === id ? { ...item, views: (item.views ?? 0) + 1 } : item,
  );

  localStorage.setItem("board", JSON.stringify(updateViewBoard));
}

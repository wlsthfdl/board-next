import { BoardData } from "@/types";
import mockData from "./../mock/board.json";
import { json } from "stream/consumers";

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

export async function addBoards(data: BoardData): Promise<BoardData[]> {
  const boards = await getBoards();

  const newBoards = {
    ...data,
    id: Date.now(),
    date: new Date().toISOString(),
  };
  const updateBoards = [...boards, newBoards];

  localStorage.setItem("board", JSON.stringify(updateBoards));

  return updateBoards;
}

export async function editBoards(data: BoardData, id: number) {
  const boards = await getBoards();

  /// {...prev, ...data} spread: 뒤에있는 값이 앞에있는 값을 덮어쓴다.
  const updateBoards = boards.map((prev) =>
    prev.id === id ? { ...prev, ...data } : prev,
  );

  localStorage.setItem("board", JSON.stringify(updateBoards));
}

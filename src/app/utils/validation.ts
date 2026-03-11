import { BoardData } from "@/types";

//Form 유효성 검사
export function validation(form: BoardData) {
  if (!form.title.trim()) {
    alert("제목을 입력하세요");
    return false;
  }
  if (!form.nickname.trim()) {
    alert("닉네임을 입력하세요");
    return false;
  }
  if (!form.userId.trim()) {
    alert("ID를 입력하세요");
    return false;
  }
  if (!form.date.trim()) {
    alert("작성일을 입력하세요");
    return false;
  }
  if (!form.content.trim()) {
    alert("내용을 입력하세요");
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) {
    alert("날짜 형식이 올바르지 않습니다.");
    return false;
  }

  if (!validateNickname(form.nickname)) {
    alert("닉네임 형식이 올바르지 않습니다.");
    return false;
  }

  if (!validateUserId(form.userId)) {
    alert("ID는 E-mail 형식으로 입력해 주세요.");
    return false;
  }

  return true;
}

//닉네임 검사
function validateNickname(nickname: string) {
  const regex = /^(?!.*__)[A-Za-z][A-Za-z0-9_]{0,24}$/;
  return regex.test(nickname);
}

function validateUserId(userId: string) {
  const emailRegex = /^\S+@\S+\.\S+$/;

  return emailRegex.test(userId);
}

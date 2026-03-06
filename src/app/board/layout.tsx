// app/board/layout.tsx
import { ReactNode } from "react";

export default function BoardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>; // 그냥 children만 렌더링
}

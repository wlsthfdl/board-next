import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col bg-white">
          {/* header */}
          <header className="border-b bg-white shadow-sm">
            <div className="mx-auto max-w-3xl p-5 text-xl font-bold">
              <Link href="/board">📚 board</Link>
            </div>
          </header>

          {/* main */}
          <main className="mx-auto w-full max-w-3xl flex-1 p-5">
            {children}
          </main>

          {/* footer */}
          <footer className="border-t bg-white">
            <div className="mx-auto max-w-3xl p-4 text-center text-sm text-gray-500">
              제작 @wlsthfdl
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

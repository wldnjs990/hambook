import Link from "next/link";
import { ReactNode } from "react";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto min-h-screen w-full max-w-[600px] bg-white p-5 shadow-lg">
        <header className="mb-3">
          <nav>
            <Link href={"/"}>
              <h1 className="text-[20px] font-bold">📚hambooks</h1>
            </Link>
          </nav>
        </header>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

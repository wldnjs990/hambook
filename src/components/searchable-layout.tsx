import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [keywords, setKeywords] = useState("");
  const router = useRouter();
  return (
    <>
      <div className="mb-3 flex w-full items-center gap-1">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="w-4/5 border p-3"
          onChange={(e) => setKeywords(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?q=${keywords}`);
            }
          }}
        />
        <Link
          href={`/search?q=${keywords}`}
          className="border bg-blue-400 p-3 text-white"
        >
          검색
        </Link>
      </div>
      {children}
    </>
  );
}

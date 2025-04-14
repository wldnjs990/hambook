import { BookData } from "@/types";
import Link from "next/link";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link
      href={`book/${id}`}
      className="flex w-full gap-4 border-b-slate-200 px-2.5 py-5"
    >
      <img src={coverImgUrl} alt={title} className="w-1/5" />
      <div className="w-4/5">
        <div className="font-bold">{title}</div>
        <div className="w-full truncate">{subTitle}</div>
        <br />
        <div className="text-gray-500">
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}

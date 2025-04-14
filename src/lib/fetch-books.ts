import { BookData } from "@/types";

export default async function fetchBooks(
  bookName?: string,
): Promise<BookData[]> {
  const url = bookName
    ? `${process.env.NEXT_API_URL}/book/search?q=${bookName}`
    : `${process.env.NEXT_API_URL}/book`;

  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("데이터 통신중 에러가 발생했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

import { BookData } from "@/types";

export default async function fetchOneBook(
  bookId: string,
): Promise<BookData | null> {
  const url = `${process.env.NEXT_API_URL}/book/${bookId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("데이터 통신중 에러가 발생했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

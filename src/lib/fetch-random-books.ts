import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = process.env.NEXT_API_URL;
  try {
    const response = await fetch(`${url}/book/random`);
    if (!response.ok) throw new Error("데이터 통신중 오류가 발생했습니다.");
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

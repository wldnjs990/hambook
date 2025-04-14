import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import { InferGetStaticPropsType } from "next";
import { ReactNode } from "react";
import Head from "next/head";

export const getStaticProps = async () => {
  const [books, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      books,
      randomBooks,
    },
  };
};

export default function Home({
  books,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className="flex flex-col gap-5">
        <section className="flex w-full flex-col">
          <h3>지금 추천하는 도서</h3>
          {randomBooks.map((book) => {
            return <BookItem key={book.id} {...book} />;
          })}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {books.map((book) => {
            return <BookItem key={book.id} {...book} />;
          })}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

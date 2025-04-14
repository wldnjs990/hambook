import fetchOneBook from "@/lib/fetch-one-book";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: "blocking",
    // fallback : false => 404페이지로 이동
    // fallback : 'blocking' => SSR 사전 렌더링
    // fallback : true => props없는 빈 페이지를 먼저 보여주고(fallback상태) props계산이 완료되면 하이드레이션된 페이지 렌더링
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const bookId = context.params?.id as string;
  const curBook = await fetchOneBook(bookId);

  return {
    props: {
      curBook,
    },
  };
};

export default function Book({
  curBook,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback)
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
        <div>페이지 로드중입니다...</div>
      </>
    );
  if (!curBook)
    return (
      <>
        <div>문제가 발생했습니다 새로고침을 눌러 재시작해주세요.</div>
      </>
    );
  const { title, author, subTitle, publisher, description, coverImgUrl } =
    curBook;

  return (
    <>
      <Head>
        <title>한입북스 - {title}</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content={`한입북스 - ${title}`} />
        <meta
          property="og:description"
          content={`한입 북스에서 ${title} 책에 대한 상세정보입니다.`}
        />
      </Head>
      <div className="flex flex-col gap-2.5">
        <div
          style={{
            background: `url(${coverImgUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="relative flex items-center justify-center p-5 before:absolute before:h-full before:w-full before:bg-black before:opacity-70"
        >
          <img src={coverImgUrl} alt={`${title} 이미지`} className="z-10" />
        </div>
        <h3 className="text-[18px]">{title}</h3>
        <div className="text-gray-500">{subTitle}</div>
        <div className="text-gray-500">{`${author} | ${publisher}`}</div>
        <div className="whitespace-pre-line rounded-md bg-[rgb(245,245,245)] p-4 leading-[1.3]">
          {description}
        </div>
      </div>
    </>
  );
}

"use client";
import { Fragment, useState, useEffect } from "react";
import  Link  from 'next/link';
import { time } from "./_utils/time";
import type { Post } from './_utils/post';


export default function Home() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await res.json()
      setPosts(data.posts)
      setLoad(!load)
    }

    fetcher()
  }, [])

  if (load) {
    return <div className="mx-auto text-center mt-5">記事読み込み中！！！</div>
  } else if (posts.length === 0) {
    return
    <div className="mx-auto text-center mt-5">記事が見つかりません</div>
  };

  return (
    <>
      <span className="text-2xl justify-between text-left m-30">記事一覧</span>
      {
        posts.map((elem: Post) => (
          <Fragment key={elem.id} >
            <Link href={`posts/${elem.id}`}>
              <main className="flex justify-between mx-auto container items-center">
                <div >
                  <img src={elem.thumbnailUrl} />
                </div>

                <div className="text-left items-center">
                  <time dateTime={elem.createdAt}>{time(new Date(elem.createdAt))}</time>
                  <>{console.log(elem.categories)}</>
                  <span>{elem.categories.map(category => (
                    <span className="bg-gray-200 text-black rounded-2xl p-1" key={elem.id}>{category}</span>
                  ))}
                  </span>

                  <h6 className="text-2xl">{elem.title}</h6>
                  <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: elem.content }}></div>
                </div>
              </main>
            </Link>

            <hr className="m-3" />

          </Fragment>
        ))}
    </>
  );

}
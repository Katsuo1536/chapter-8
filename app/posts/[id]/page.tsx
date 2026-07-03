"use client";

import { Fragment, useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { time } from "../../_utils/time";
import type { Post } from '../../_types/post';

export default function Article() {

  const { id } = useParams<string>();

  const [post, setPost] = useState<Post | null>(null);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res: Response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${(id)}`)
      const data = await res.json()
      setPost(data.post)
      setLoad(!load)
    }


    fetcher()
  }, [])


  if (load) {
    return <div className="mx-auto text-center mt-5">投稿読み込み中！！！</div>
  } else if (!post) {
    return <div>
      <div className="mx-auto text-center mt-5">投稿が見つかりません</div>
      <Link href="/" className="mx-auto text-blue-400 text-0xl" >記事一覧へ戻る</Link>
    </div>
  };



  return (
    <>
      {
        <Link href={`/posts/${post.id}`}>
          <Fragment key={post.id} >
            <main className="mx-auto max-w-3xl px-4 mt-3">
              <div>
                <Image className="items-center"
                  src={post.thumbnailUrl}
                  alt="post.thumbnailUrlの画像"
                  width={800}
                  height={400} /><br />
              </div>

              <div className="text-left">
                <time dateTime={post.createdAt}>{time(new Date(post.createdAt))}</time>



                <span>{post.categories?.map(category => (
                  <span className="bg-gray-200 text-black rounded-2xl p-1" >{category}</span>
                ))}
                </span>


                <h6 className="text-3xl mt-2">{post.title}</h6>

                <div className="my-3" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </div>

              <Link href="/" className="text-blue-400" >記事一覧へ戻る</Link>
            </main>
          </Fragment>
        </Link>
      }
    </>
  );

}
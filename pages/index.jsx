import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Author from "../components/_child/author";
import Format from "../layout/format";
import fetcher from "../lib/fetcher";

export default function Home() {
  const { data, isLoading, isError } = fetcher("api/posts");

  const [search, setsearch] = useState("");

  return (
    <Format searchtext={search} setsearchtext={setsearch}>
      <section className="container mx-auto md:px-20 py-10">
        {/* grid columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {data
            ?.filter((i) => i.title.toLowerCase().includes(search))
            .map((value, index) => (
              <Post data={value} key={index}></Post>
            ))}
        </div>
      </section>
    </Format>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, author, description } = data;
  return (
    <div className="item">
      <div className="images">
        <Link legacyBehavior href={`/posts/${id}`}>
          <Image
            alt="blog"
            src={img || "/"}
            className="rounded"
            width={500}
            height={350}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link legacyBehavior href={`/posts/${id}`}>
            <p className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </p>
          </Link>
          <Link legacyBehavior href={`/posts/${id}`}>
            <p className="text-gray-800 hover:text-gray-600">
              - {published || "Unknown"}
            </p>
          </Link>
        </div>
        <div className="title">
          <Link legacyBehavior href={`/posts/${id}`}>
            <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Title"}
            </p>
          </Link>
        </div>
        <p className="text-gray-500 py-3 h-14 text-ellipsis overflow-hidden">
          {description || "description"}
        </p>
        {author ? <Author {...author}></Author> : <></>}
      </div>
    </div>
  );
}

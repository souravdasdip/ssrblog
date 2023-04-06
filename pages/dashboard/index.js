import Image from "next/image";
import Link from "next/link";
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import React, { useEffect, useState } from "react";
import { useQuill } from 'react-quilljs';
import Author from "../../components/_child/author";
import Format from "../../layout/format";
import fetcher from "../../lib/fetcher";

export default function Dashboard() {
  const { data: users } = fetcher("api/users");
  const { data: posts } = fetcher("api/posts");
  const [create, setcreate] = useState(false);
  const [user, setuser] = useState()
  const [post, setpost] = useState()
  const { quill, quillRef } = useQuill();
  const [title, settitle] = useState('')
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem('signin__user')))
  }, [])

  const handlePost = async () => {
    let body = {
      id: 5,
      title,
      subtitle: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
      category: "Business, Travel",
      img: user.img,
      description: `${quill.getText()}`,
      published: new Date().toUTCString().slice(0, 17),
      author: {
        id: user.id,
        name: user.name,
        img: user.img,
        designation: user.description
      }
    }

    fetch('api/posts', {
      method: "POST",
      body: JSON.stringify({ ...body })
    })
      .then(res => res.json())
      .then(res => alert(res.message))
      .catch(err => alert(err.message))


  }
  return (
    <Format>
      <section className="container mx-auto md:px-20 py-10">
        {/* grid columns */}
        <h1 className='font-bold text-orange-600 text-lg'>Hello, {user?.name}</h1>

        <div className="flex gap-4 font-bold text-gray-600 mb-8">
          <h6 className="cursor-pointer underline" onClick={() => setcreate(false)}>My Posts</h6>
          <h6 className="cursor-pointer underline" onClick={() => setcreate(true)}>Create post</h6>
        </div>
        {!create ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {posts?.filter((item) => item.author?.id == user?.id).map((value, index) => (
              <Post data={value} key={index}></Post>
            ))}
          </div>
        ) : (
          <div>
            <div>
              <h1 className="mb-3">Create post</h1>
              <p>Title</p>
              <input className='p-2 w-3/4 border border-gray-300 rounded-sm' placeholder="Enter title here..." value={title} onChange={e => settitle(e.target.value)} />
              <div style={{ width: '80vw', height: 200 }}>
                <div ref={quillRef} />
              </div>
            </div>
            <button onClick={handlePost} className="m4 mt-20 border border-green-300 p-2">Create Post</button>
          </div>
        )}
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
          {description || 'post'}
        </p>
        {author ? <Author {...author}></Author> : <></>}
      </div>
    </div>
  );
}

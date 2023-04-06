import Image from "next/image"
import Link from "next/link"
import fetcher from "../../lib/fetcher"
import Author from "./author"
import Error from "./error"
import Spinner from "./spinner"

export default function Ralated() {

    const { data, isLoading, isError } = fetcher('api/posts')

    if (isLoading) return <Spinner></Spinner>;
    if (isError) return <Error></Error>

    return (
        <section className="pt-20">
            <h1 className="font-bold text-3xl py-10">Related</h1>

            <div className="flex flex-col gap-10">
                {
                    data.map((value, index) => (
                        <Post key={index} data={value}></Post>
                    ))
                }
            </div>
        </section>
    )
}


function Post({ data }) {

    const { id, title, category, img, published, author } = data;

    return (
        <div className="flex gap-5">
            <div className="image flex flex-col justify-start">
                <Link legacyBehavior href={`/posts/${id}`}><a><Image src={img || ""} className="rounded" width={300} height={200} /></a></Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link legacyBehavior href={`/posts/${id}`}><a className="text-orange-600 hover:text-orange-800">{category || "No Category"}</a></Link>
                    <Link legacyBehavior href={`/posts/${id}`}><a className="text-gray-800 hover:text-gray-600">- {published || ""}</a></Link>
                </div>
                <div className="title">
                    <Link legacyBehavior href={`/posts/${id}`}><a className="text-xl font-bold text-gray-800 hover:text-gray-600">{title || "No Title"}</a></Link>
                </div>
                {author ? <Author {...author}></Author> : <></>}
            </div>
        </div>
    )
}
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function header(props) {
    const [user, setuser] = useState()
    useEffect(() => {
        setuser(JSON.parse(localStorage.getItem('signin__user')))
    }, [])

    return (
        <header className="bg-gray-50">
            <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
                <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
                    <input value={props.searchtext} onChange={e => props.setsearchtext(e.target.value)} type="text" className="input-text" placeholder="Search..." />
                </div>
                <div className="shrink w-80 sm:order-2">
                    <Link legacyBehavior href={"/"}>
                        <a className="font-bold uppercase text-3xl">Blog</a>
                    </Link>
                </div>
                <div className="w-96 order-3 flex justify-center">
                    <div className="flex gap-6">
                        {
                            user ?
                                <>
                                    <Link href={"/dashboard"}>
                                        <p className='text-gray-500 cursor-pointer'>
                                            Dashboard
                                        </p>
                                    </Link>
                                    <p className='text-gray-500 cursor-pointer' onClick={() => {
                                        localStorage.removeItem('signin__user')
                                        setuser()
                                    }}>Logout</p>
                                </>
                                :
                                <Link legacyBehavior href={"/signin"}><span style={{ color: 'green' }}>Login</span></Link>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Format from "../../layout/format";

const SignIn = () => {
    const [signin, setsignin] = useState(true)
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const router = useRouter();

    const handleSubmit = () => {
        console.log(email, pass);
        if (signin) {
            if (!email || !pass) {
                return alert("Email and Password is required!")
            }
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    pass
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.status == 'ok') {
                        console.log(json);
                        localStorage.setItem('signin__user', JSON.stringify(json.data))
                        router.push('/dashboard')
                    } else {
                        alert(json.message)
                    }

                })
                .catch(err => console.log(err))
        } else {
            if (!email || !pass || !name) {
                return alert("Name, Email and Password is required!")
            }
            fetch('/api/users', {
                method: 'PUT',
                body: JSON.stringify({
                    email,
                    pass,
                    name
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.status == 'ok') {
                        console.log(json);
                        alert(json.message)
                        localStorage.setItem('signin__user', JSON.stringify(json.data))
                        router.push('/dashboard')

                    } else {
                        alert(json.message)
                    }

                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Format>
            <section className='gradient-form md:h-screen h-full'>
                <div className='container py-12 px-6 m-auto h-3/4'>
                    <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
                        <div className=''>
                            <div className='block bg-white shadow-lg rounded-lg'>
                                <div className='lg:flex lg:flex-wrap g-0'>
                                    <div className='px-4 md:px-0'>
                                        <div className='md:p-12 md:mx-6'>
                                            <div className='text-center'>
                                                <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                                                    {signin ? "Login" : "Registration"}
                                                </h4>
                                            </div>
                                            <form>
                                                <p className='mb-4'>
                                                    Please Sign {signin ? 'In if you have an account' : 'Up if you do not have an account'}
                                                </p>
                                                {
                                                    !signin &&
                                                    <div className='mb-4'>
                                                        <input
                                                            value={name}
                                                            onChange={e => setname(e.target.value)}
                                                            type='text'
                                                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                                            placeholder='Your Name'
                                                            name='userName'
                                                        />
                                                    </div>

                                                }
                                                <div className='mb-4'>
                                                    <input
                                                        value={email}
                                                        onChange={e => setemail(e.target.value)}
                                                        type='email'
                                                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                                        placeholder='Your Email'
                                                        name='userEmail'
                                                    />
                                                </div>
                                                <div className='mb-4'>
                                                    <input
                                                        value={pass}
                                                        onChange={e => setpass(e.target.value)}
                                                        type='password'
                                                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                                        placeholder='Password'
                                                        name='pin'
                                                    />
                                                </div>
                                                <div className='text-center pt-1 mb-12 pb-1'>
                                                    <button
                                                        className='inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                                                        type='button'
                                                        onClick={handleSubmit}
                                                    >
                                                        {signin ? 'Sign In' : 'Sign Up'}
                                                    </button>
                                                </div>
                                                <div className='flex items-center justify-between pb-6'>
                                                    <p className='mb-0 mr-2'>{!signin ? 'Do you have an account?' : "Create new one?"}</p>
                                                    <button
                                                        type='button'
                                                        className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                                                        onClick={() => { setsignin(prev => !prev) }}
                                                    >
                                                        {!signin ? 'Log In' : 'Register'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Format>
    );
};
export default SignIn;
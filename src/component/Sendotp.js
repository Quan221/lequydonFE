import React, { useContext, useState, Fragment, useRef } from 'react';
import axios from 'axios';
import Api from '../configs/Api';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState()
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)


    const handleSendOtp = async () => {
        try {
            const response = await Api.post('http://127.0.0.1:8000/api/send-otp/', { email });
            if (response.status === 200) {
                setOtpSent(true);
                setMessage(response.data.message);

            } else {
                setMessage(response.data.message);


            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/verify-otp/', { username, otp, password });
            if (response.status === 200) {
                setMessage(response.data.message);
                toast.success(response.data.message);

            } else {
                setMessage(response.data.message);
                toast.error(response.data.message);

            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.response.data.message)
            setOpen(true)
        }
    };

    return (
        // <div>
        //     <h2>Reset Password</h2>
        //     {!otpSent ? (
        //         <div>
        //             <input
        //                 type="email"
        //                 placeholder="Email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //             />
        //             <button onClick={handleSendOtp}>Send OTP</button>
        //         </div>
        //     ) : (
        //         <div>
        //             <p>{message}</p>
        //             <input
        //                 type="text"
        //                 placeholder="OTP"
        //                 value={otp}
        //                 onChange={(e) => setOtp(e.target.value)}
        //             />
        //             <input
        //                 type="text"
        //                 placeholder="Username"
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //             />
        //             <input
        //                 type="password"
        //                 placeholder="New Password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //             <button onClick={handleResetPassword}>Reset Password</button>
        //         </div>
        //     )}
        // </div>

        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Error
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Toaster />
            <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-20 lg:px-8">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {!otpSent ? (
                        <div >
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                                <img
                                    className="mx-auto h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Your Company"
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Nhập Email của tài khoản
                                </h2>
                            </div>
                            <br />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                            <br />

                            <button onClick={handleSendOtp} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Send OTP</button>
                        </div>
                    ) : (
                        <div>

                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                                <img
                                    className="mx-auto h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Your Company"
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    {message}
                                </h2>
                            </div>
                            <br />
                            <input
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="New Password"
                                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <Link onClick={handleResetPassword} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Reset Password</Link>
                        </div>
                    )}
                </div>
            </div>

        </>

    )
};

export default PasswordReset;
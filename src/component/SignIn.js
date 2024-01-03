/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import axios from 'axios'
import React, { useState, useContext, useRef, Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Apis, { endpoints, authApi } from '../configs/Api.js'
import { UserContext } from '../App'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, UserCircleIcon } from '@heroicons/react/24/outline'


export default function SignIn() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [user, dispatch] = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  const login = async (evt) => {
    evt.preventDefault()


    const formData = new FormData()
    formData.append("password", password)
    formData.append("username", username)
    formData.append("client_id", 'O4vrvkNjJuWarEG8hMU4vwjjvnNvhkWcF6UYwWLe')
    formData.append("client_secret", 'aZrtNrkafIfSH4ppF4d0N9DG2YtBOoNMqdkSY0Zu4hQphRbe1XkzTbPhb0ghsknYSWeV1zmWcXJ0myUtJAVOTEaZXjDQJhXFVjXLydAAdD39kU6k8X7BrGZ4qmYMJ5BB')
    formData.append("grant_type", 'password')
    try {
      const res = await Apis.post(endpoints['login'], formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }

      })

      console.log(formData)
      localStorage.setItem('userToken', res.data.access_token)
      const user = await authApi().get(endpoints['current-user'])
      console.info(user.data)
      dispatch({
        'type': 'login',
        'payload': user.data
      })
    } catch (err) {
      console.error(err)
      setOpen(true)
    }
  }

  if (user != null)
    return <Navigate to="/trangchu" />
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
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
                            Tên đăng nhập hoặc mật khẩu không đúng
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"

          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Đăng Nhập Tài Khoản Của Bạn
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={login}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mật Khẩu
                </label>
                <div className="text-sm">
                  <Link to='/test' className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Quên Mật Khẩu
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng Nhập
              </button>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to='/dangky' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Đăng ký tài khoản
              </Link>
            </p>
          </form>


        </div>
      </div>
    </>
  )
}

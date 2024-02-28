import React, { useContext, useState, Fragment, useRef, useEffect } from 'react';
import axios from 'axios';
import Api, { endpoints } from '../configs/Api';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button, Col, Container, Figure, Form, FormSelect, Image, InputGroup, Row } from "react-bootstrap"
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
const CheckOTP = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState()
    const [open, setOpen] = useState(false)
    const [tenDK, setTenDK] = useState()
    const [hokhaunguoiDK, setHokhaunguoiDK] = useState()
    const [sdt, setSdt] = useState()
    const [choDK, setChoDK] = useState()
    const [IDdk, setIDdk] = useState()
    const [moiquanhe, setMoiquanhe] = useState()
    const [trinhdo, setTrinhdo] = useState()
    const [truong, setTruong] = useState()
    const [tenHS, setTenHS] = useState()
    const [gioitinh, setGioitinh] = useState()
    const [ngaysinh, setNgaysinh] = useState()
    const [dantoc, setDantoc] = useState()
    const [tongiao, setTongiao] = useState()
    const [noisinh, setNoisinh] = useState()
    const [dinhdanh, setDinhdanh] = useState()
    const [diachi, setDiachi] = useState()
    const [quan, setQuan] = useState()
    const [phuong, setPhuong] = useState()
    const [diachithuongtru, setDiachithuongtru] = useState()
    const [quanthuongtru, setQuanthuongtru] = useState()
    const [phuongthuongtru, setPhuongthuongtru] = useState()
    const [dienchinhsach, setDienchinhsach] = useState()
    const [suckhoe, setSuckhoe] = useState()
    const [tiengviet5, setTiengviet5] = useState()
    const [toan5, setToan5] = useState()
    const [diencutru, setDiencutru] = useState()
    const [cambridge, setCambridge] = useState()
    const [toefl, setToefl] = useState()
    const [pearson, setPearson] = useState()
    const [hocba, setHocba] = useState()
    const [boi, setBoi] = useState()
    const [nangkhieu, setNangkhieu] = useState()
    const [tdtt, setTdtt] = useState()
    const [tntp, setTntp] = useState()
    const [tencha, setTencha] = useState()
    const [namsinhcha, setNamsinhcha] = useState()
    const [nghenghiepcha, setNghenghiepcha] = useState()
    const [chucvu, setChucvu] = useState()
    const [noicongtac, setNoicongtac] = useState()
    const [sdtcha, setSdtcha] = useState()
    const [tenme, setTenme] = useState()
    const [namsinhme, setNamsinhme] = useState()
    const [nghenghiepme, setNghenghiepme] = useState()
    const [chucvume, setChucvume] = useState()
    const [noicongtacme, setNoicongtacme] = useState()
    const [sdtme, setSdtme] = useState()
    const [chonlop, setChonlop] = useState([])
    const [getphuong, setGetphuong] = useState([])
    const [getquan, setGetquan] = useState([])
    const [gettruong, setGettruong] = useState([])
    const [gettrinhdo, setGettrinhdo] = useState([])
    const [getphuong2, setGetphuong2] = useState([])
    const [dangkyhoc, setDangkyhoc] = useState()
    const tongdiem = (parseFloat(toan5) + parseFloat(tiengviet5))

    const cancelButtonRef = useRef(null)


    const handleSendOtp = async () => {
        try {
            const response = await Api.post('http://127.0.0.1:8000/check-otp/', { otp });
            if (response.status === 200) {
                setOtpSent(true);
                setMessage(response.data.message);

            } else {
                setMessage(response.data.message);


            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.response.data.message)
            setOpen(true)
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
    useEffect(() => {


        const loadQuan = async () => {

            const res = await Api.get(endpoints['quan'])

            setGetquan(res.data)
            console.log(res.data)
        }
        const trinhdo1 = async () => {

            const res = await Api.get(endpoints['trinhdo'])

            setGettrinhdo(res.data)
            console.log(res.data)
        }
        const chonLop = async () => {
            const res = await Api.get(endpoints['chonlop'])
            setChonlop(res.data)
            console.log(res.data)
        }

        loadQuan()
        trinhdo1()
        chonLop()





    }, [])



    const getPhuong = async (id) => {
        let res3 = await Api.get((endpoints['phuong'](id)))
        setGetphuong(res3.data)

    }
    const getTruong = async (id) => {
        let res = await Api.get((endpoints['truong'](id)))
        setGettruong(res.data)
    }
    const getPhuong2 = async (id) => {
        let res = await Api.get((endpoints['phuong'](id)))
        setGetphuong2(res.data)
    }

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

                <div >
                    {!otpSent ? (
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                                <img
                                    className="mx-auto h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Your Company"
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Nhập OTP
                                </h2>
                            </div>
                            <br />
                            <input
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                            <br />

                            <button onClick={handleSendOtp} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Send OTP</button>
                        </div>
                    ) : (
                        // <div>

                        //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        //         <img
                        //             className="mx-auto h-10 w-auto"
                        //             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        //             alt="Your Company"
                        //         />
                        //         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        //             {message}
                        //         </h2>
                        //     </div>
                        //     <br />
                        //     <input
                        //         type="text"
                        //         placeholder="OTP"
                        //         value={otp}
                        //         className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

                        //         onChange={(e) => setOtp(e.target.value)}
                        //     />
                        //     <br />
                        //     <input
                        //         type="text"
                        //         placeholder="Username"
                        //         value={username}
                        //         className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

                        //         onChange={(e) => setUsername(e.target.value)}
                        //     />
                        //     <br />
                        //     <input
                        //         type="password"
                        //         placeholder="New Password"
                        //         className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

                        //         value={password}
                        //         onChange={(e) => setPassword(e.target.value)}
                        //     />
                        //     <br />
                        //     <Link onClick={handleResetPassword} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Reset Password</Link>
                        // </div>


                        // <Container style={{ marginTop: '2%', background: '#ccd1d5', border: '1px solid #dedede', fontFamily: 'Chilanka', width: ' 60%' }}>
                        //     <div >
                        //         <div style={{ display: 'flex', position: 'relative', left: '35%' }} >
                        //             {/* <Figure>
                        //             <Figure.Image src={logo} width={65}
                        //                 height={50} />
                        //         </Figure> */}
                        //             <Image src={''} roundedCircle width={65}
                        //                 height={60} />
                        //             <h1 style={{ marginLeft: '2%' }} >   Đăng Ký Tuyển Sinh</h1>
                        //         </div>
                        //         <Form >
                        //             <h3>A. THÔNG TIN NGƯỜI ĐĂNG KÝ</h3>
                        //             <Form.Group as={Row}  >
                        //                 <Col sm='4' >
                        //                     <Form.Label >Tên Người Đăng Ký</Form.Label>

                        //                     <Form.Control type="text" value={tenDK} required onChange={(event) => setTenDK(event.target.value)} />
                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Cha/Mẹ/Người giám hộ</Form.Label>
                        //                     <Form.Control type="text" value={moiquanhe} required onChange={(event) => setMoiquanhe(event.target.value)} />

                        //                 </Col>

                        //                 <Col sm='3' >
                        //                     <Form.Label>CCCD</Form.Label>
                        //                     <Form.Control type="text" value={IDdk} required onChange={(event) => setIDdk(event.target.value)} />
                        //                 </Col>
                        //                 <Col sm='2' >
                        //                     <Form.Label >Số Điện Thoại</Form.Label>

                        //                     <Form.Control type="text" value={sdt} required onChange={(event) => setSdt(event.target.value)} />
                        //                 </Col>



                        //             </Form.Group>

                        //             <Form.Group as={Row} style={{ marginTop: '5px' }} >
                        //                 <Col>
                        //                     <Form.Label>Hộ Khẩu Thường Trú</Form.Label>
                        //                     <Form.Control type="text" value={hokhaunguoiDK} required onChange={(event) => setHokhaunguoiDK(event.target.value)} />
                        //                 </Col>

                        //                 <Col>
                        //                     <Form.Label>Chỗ Ở Hiện Nay</Form.Label>
                        //                     <Form.Control type="text" required value={choDK} onChange={(event) => setChoDK(event.target.value)} />
                        //                 </Col>


                        //             </Form.Group>
                        //             <Form.Group as={Row}>
                        //                 <Col>
                        //                     <Form.Label> Đã Học Tiểu Học ở Quận </Form.Label>
                        //                     <FormSelect   >
                        //                         <option disabled selected='true' >Chọn Quận</option>
                        //                         {getquan.map(c => {
                        //                             return <option value={c.id} onClick={() => getTruong(c.id)} >{c.name}</option>
                        //                         })}

                        //                     </FormSelect>
                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>
                        //                         Trường :
                        //                     </Form.Label>
                        //                     <FormSelect value={truong} onChange={(event) => setTruong(event.target.value)}  >
                        //                         <option disabled selected='true' >Chọn danh mục</option>
                        //                         {gettruong.map(c => {
                        //                             return <option value={c.name} >{c.name}</option>
                        //                         })}

                        //                     </FormSelect>
                        //                 </Col>

                        //                 <Col>
                        //                     <Form.Label>Đã học hết lớp 5 : </Form.Label>
                        //                     <FormSelect value={trinhdo} onChange={(event) => setTrinhdo(event.target.value)}  >
                        //                         <option disabled selected='true' >Chọn danh mục</option>
                        //                         {gettrinhdo.map(c => {
                        //                             return <option value={c.id} >{c.name}</option>
                        //                         })}

                        //                     </FormSelect>
                        //                 </Col>

                        //             </Form.Group>

                        //             <h3 style={{ marginTop: '2%' }} >B. THÔNG TIN VỀ HỌC SINH </h3>
                        //             <Form.Group as={Row}>
                        //                 <Col>
                        //                     <Form.Label>Mã định danh</Form.Label>
                        //                     <Form.Control type="text" value={dinhdanh} onChange={(event) => setDinhdanh(event.target.value)} />
                        //                 </Col>
                        //                 <Col  >
                        //                     <Form.Label>Tên Học Sinh</Form.Label>
                        //                     <Form.Control type="text" value={tenHS} onChange={(event) => setTenHS(event.target.value)} />
                        //                 </Col>



                        //             </Form.Group>
                        //             <Form.Group as={Row}>

                        //                 <Col>
                        //                     <Form.Label>Nơi Sinh</Form.Label>
                        //                     <Form.Control type="text" value={noisinh} onChange={(event) => setNoisinh(event.target.value)} />
                        //                 </Col>
                        //                 <Col sm='3' >
                        //                     <Form.Label>
                        //                         Ngày, tháng, năm sinh:
                        //                     </Form.Label>
                        //                     <Form.Control type="date" value={ngaysinh} onChange={(event) => setNgaysinh(event.target.value)} />
                        //                 </Col>
                        //                 <Col sm='2' >
                        //                     <FormCheckLabel form-check-label >Giới Tính</FormCheckLabel>
                        //                     <Col style={{ marginTop: '10px', display: ' flex' }} >
                        //                         <Form.Check
                        //                             inline
                        //                             label="Nam"
                        //                             name="group1"
                        //                             type="checkbox"
                        //                             style={{ marginLeft: '10px' }}
                        //                             value="Nam"
                        //                             checked={gioitinh == 'Nam'}
                        //                             onChange={(event) => setGioitinh(event.target.value)}

                        //                         />

                        //                         <Form.Check
                        //                             inline
                        //                             label="Nữ"
                        //                             name="group1"
                        //                             type="checkbox"
                        //                             value="Nữ"
                        //                             checked={gioitinh == 'Nữ'}
                        //                             onChange={(event) => setGioitinh(event.target.value)}
                        //                         />



                        //                     </Col>
                        //                 </Col>



                        //             </Form.Group>
                        //             <Form.Group as={Row}>
                        //                 <Col>
                        //                     <Form.Label>Dân Tộc</Form.Label>
                        //                     <Form.Control type="text" value={dantoc} onChange={(event) => setDantoc(event.target.value)} />
                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Tôn Giáo</Form.Label>
                        //                     <Form.Control type="text" value={tongiao} onChange={(event) => setTongiao(event.target.value)} />
                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Diện Cư Trú</Form.Label>
                        //                     <FormSelect value={diencutru} onChange={(event) => setDiencutru(event.target.value)}  >
                        //                         <option disabled selected='true' >Chọn danh mục</option>
                        //                         <option value="Thường Trú">Thường Trú</option>
                        //                         <option value="Tạm Trú">Tạm Trú</option>
                        //                         <option value="Diện Khác">Diện Khác</option>

                        //                     </FormSelect>
                        //                 </Col>

                        //             </Form.Group>
                        //             <Form.Group as={Row} >
                        //                 <span style={{ fontSize: '20px', margin: '10px' }} >Hộ khẩu thường trú : </span>
                        //                 <Col>
                        //                     {/* <Form.Label>Số nhà , tên đường : </Form.Label> */}
                        //                     <InputGroup>
                        //                         <InputGroup.Text>Số nhà , tên đường :</InputGroup.Text>
                        //                         <Form.Control type="text" value={diachithuongtru} onChange={(event) => setDiachithuongtru(event.target.value)} />
                        //                     </InputGroup>
                        //                 </Col>
                        //                 <Col>
                        //                     <InputGroup>
                        //                         <InputGroup.Text>Phường : </InputGroup.Text>
                        //                         <FormSelect value={phuongthuongtru} onChange={(event) => setPhuongthuongtru(event.target.value)}  >
                        //                             <option disabled selected='true' >Chọn danh mục</option>
                        //                             {getphuong.map(c => {
                        //                                 return <option value={c.name} >{c.name}</option>
                        //                             })}

                        //                         </FormSelect>
                        //                     </InputGroup>

                        //                 </Col>
                        //                 <Col>
                        //                     <InputGroup>
                        //                         <InputGroup.Text>Quận : </InputGroup.Text>
                        //                         <FormSelect value={quanthuongtru} onChange={(event) => { setQuanthuongtru(event.target.value); const selectedOption = event.target.options[event.target.selectedIndex]; getPhuong(selectedOption.getAttribute('data-id')); }}   >
                        //                             <option disabled selected='true' >Chọn danh mục</option>
                        //                             {getquan.map(c => {
                        //                                 return <option value={c.name} data-id={c.id} >{c.name}</option>
                        //                             })}

                        //                         </FormSelect>
                        //                     </InputGroup>

                        //                 </Col>

                        //             </Form.Group>
                        //             <Form.Group as={Row} >
                        //                 <span style={{ fontSize: '20px', margin: '10px' }} >Chỗ ở hiện nay : </span>
                        //                 <Col>
                        //                     {/* <Form.Label>Số nhà , tên đường : </Form.Label> */}
                        //                     <InputGroup>
                        //                         <InputGroup.Text>Số nhà , tên đường :</InputGroup.Text>
                        //                         <Form.Control type="text" value={diachi} onChange={(event) => setDiachi(event.target.value)} />
                        //                     </InputGroup>
                        //                 </Col>
                        //                 <Col>
                        //                     <InputGroup>
                        //                         <InputGroup.Text>Phường : </InputGroup.Text>
                        //                         <FormSelect value={phuong} onChange={(event) => setPhuong(event.target.value)}  >
                        //                             <option disabled selected='true' >Chọn danh mục</option>
                        //                             {getphuong2.map(c => {
                        //                                 return <option value={c.name} >{c.name}</option>
                        //                             })}

                        //                         </FormSelect>
                        //                     </InputGroup>

                        //                 </Col>
                        //                 <Col>
                        //                     <InputGroup>
                        //                         <InputGroup.Text>Quận : </InputGroup.Text>
                        //                         <FormSelect value={quan} onChange={(event) => { setQuan(event.target.value); const selectedOption = event.target.options[event.target.selectedIndex]; getPhuong2(selectedOption.getAttribute('data-id')); }} >
                        //                             <option disabled selected='true' >Chọn danh mục</option>
                        //                             {getquan.map(c => {
                        //                                 return <option value={c.id} data-id={c.id}>{c.name}</option>
                        //                             })}

                        //                         </FormSelect>
                        //                     </InputGroup>

                        //                 </Col>

                        //             </Form.Group>
                        //             <br />
                        //             <Form.Group as={Row}>
                        //                 <Col>
                        //                     <Form.Label>Diện chính sách (nếu có) : </Form.Label>
                        //                     <Form.Control type="text" value={dienchinhsach} onChange={(event) => setDienchinhsach(event.target.value)} />
                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Tình hình sức khỏe (ghi cụ thể, nếu có bệnh mãn tính): </Form.Label>
                        //                     <Form.Control type="text" value={suckhoe} onChange={(event) => setSuckhoe(event.target.value)} />
                        //                 </Col>

                        //             </Form.Group>
                        //             <Form.Group as={Row} >
                        //                 <span style={{ fontSize: '20px', margin: '10px' }} >* Kết quả học tập năm học 2022 – 2023: </span>
                        //                 <Form.Label>Điểm học kỳ 2 lớp 5: </Form.Label>
                        //                 <Col>
                        //                     {/* <Form.Label>Số nhà , tên đường : </Form.Label> */}
                        //                     <InputGroup>
                        //                         <InputGroup.Text>Tiếng Việt</InputGroup.Text>
                        //                         <Form.Control type="number" value={tiengviet5} onChange={(event) => setTiengviet5(event.target.value)} />
                        //                     </InputGroup>
                        //                 </Col>
                        //                 <Col>
                        //                     {/* <Form.Label>Số nhà , tên đường : </Form.Label> */}
                        //                     <InputGroup>
                        //                         <InputGroup.Text>Toán</InputGroup.Text>
                        //                         <Form.Control type="number" value={toan5} onChange={(event) => setToan5(event.target.value)} />
                        //                     </InputGroup>
                        //                 </Col>

                        //             </Form.Group>
                        //             <Form.Group as={Row}>
                        //                 <Form.Label>Đã có chứng chỉ tiếng Anh (nếu có):</Form.Label>
                        //                 {/* <Form.Control type="text" value={hocba} onChange={(event) => setHocba(event.target.value)} /> */}
                        //                 <Col>
                        //                     <Form.Label> Chứng chỉ Cambridge </Form.Label>
                        //                     <Form.Control type="number" value={cambridge} onChange={(event) => setCambridge(event.target.value)} />

                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label> Chứng chỉ Toefl </Form.Label>
                        //                     <Form.Control type="number" value={toefl} onChange={(event) => setToefl(event.target.value)} />

                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label> Chứng chỉ pearson </Form.Label>
                        //                     <Form.Control type="number" value={pearson} onChange={(event) => setPearson(event.target.value)} />

                        //                 </Col>

                        //             </Form.Group>
                        //             <Col style={{ marginTop: '10px', marginLeft: '10%' }} >
                        //                 <Form.Check
                        //                     inline
                        //                     label="Học bạ tích hợp EMG"
                        //                     name="group1"
                        //                     type="checkbox"
                        //                     style={{ marginLeft: '10px' }}
                        //                     value="Học bạ tích hợp EMG"

                        //                     checked={hocba == 'Học bạ tích hợp EMG'}
                        //                     onChange={(event) => setHocba(event.target.value)}

                        //                 />

                        //                 <Form.Check
                        //                     inline
                        //                     label="Hoặc học bạ TATC"
                        //                     name="group1"
                        //                     type="checkbox"
                        //                     value="Hoặc học bạ TATC"
                        //                     checked={hocba == 'Hoặc học bạ TATC'}
                        //                     onChange={(event) => setHocba(event.target.value)}
                        //                 />



                        //             </Col>
                        //             <FormCheckLabel form-check-label >Kỹ Năng Bơi</FormCheckLabel>
                        //             <Col style={{ marginTop: '10px' }} >
                        //                 <Form.Check
                        //                     inline
                        //                     label="Đã Biết"
                        //                     name="group1"
                        //                     type="checkbox"
                        //                     style={{ marginLeft: '10px' }}
                        //                     value="Đã biết bơi"

                        //                     checked={boi == 'Đã biết bơi'}
                        //                     onChange={(event) => setBoi(event.target.value)}

                        //                 />

                        //                 <Form.Check
                        //                     inline
                        //                     label="Chưa Biết"
                        //                     name="group1"
                        //                     type="checkbox"
                        //                     value="Chưa biết bơi"
                        //                     checked={boi == 'Chưa biết bơi'}
                        //                     onChange={(event) => setBoi(event.target.value)}
                        //                 />



                        //             </Col>
                        //             <Form.Group>
                        //                 <Form.Label>Năng khiếu sở trường thường xuyên:</Form.Label>
                        //                 <Form.Control type="text" value={nangkhieu} onChange={(event) => setNangkhieu(event.target.value)} />
                        //             </Form.Group>
                        //             <Form.Group>
                        //                 <Form.Label>+ Có thành tích về TDTT, Văn hóa, Nghệ thuật, các giải phong trào, Đội TNTPHCM (ghi cụ thể nếu có):</Form.Label>
                        //                 <Form.Control type="text" value={tdtt} onChange={(event) => setTdtt(event.target.value)} />
                        //             </Form.Group>
                        //             <Form.Group>
                        //                 <Form.Label>Tham gia công tác Đội TNTP HCM, chức vụ (nếu có):</Form.Label>
                        //                 <Form.Control type="text" value={tntp} onChange={(event) => setTntp(event.target.value)} />
                        //             </Form.Group>

                        //             <br />
                        //             <h3>C. THÔNG TIN VỀ CHA MẸ CỦA HỌC SINH: </h3>
                        //             <Form.Group as={Row} >
                        //                 <Col>
                        //                     <Form.Label>Họ Tên Cha</Form.Label>
                        //                     <Form.Control type="text" value={tencha} onChange={(event) => setTencha(event.target.value)} />

                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Năm Sinh</Form.Label>
                        //                     <Form.Control type="text" value={namsinhcha} onChange={(event) => setNamsinhcha(event.target.value)} />
                        //                 </Col>

                        //             </Form.Group>
                        //             <Form.Group as={Row} >
                        //                 <Col>
                        //                     <Form.Label>Nghề nghiệp</Form.Label>
                        //                     <Form.Control type="text" value={nghenghiepcha} onChange={(event) => setNghenghiepcha(event.target.value)} />

                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Nơi Công Tác</Form.Label>
                        //                     <Form.Control type="text" value={noicongtac} onChange={(event) => setNoicongtac(event.target.value)} />

                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Chức vụ</Form.Label>
                        //                     <Form.Control type="text" value={chucvu} onChange={(event) => setChucvu(event.target.value)} />
                        //                 </Col>

                        //             </Form.Group>
                        //             <Form.Label>Số điện thoại liên lạc</Form.Label>
                        //             <Form.Control type="text" value={sdtcha} onChange={(event) => setSdtcha(event.target.value)} />
                        //             <br />
                        //             <Form.Group as={Row} >
                        //                 <Col>
                        //                     <Form.Label>Họ Tên Mẹ</Form.Label>
                        //                     <Form.Control type="text" value={tenme} onChange={(event) => setTenme(event.target.value)} />

                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Năm Sinh</Form.Label>
                        //                     <Form.Control type="text" value={namsinhme} onChange={(event) => setNamsinhme(event.target.value)} />
                        //                 </Col>

                        //             </Form.Group>
                        //             <Form.Group as={Row} >
                        //                 <Col>
                        //                     <Form.Label>Nghề nghiệp</Form.Label>
                        //                     <Form.Control type="text" value={nghenghiepme} onChange={(event) => setNghenghiepme(event.target.value)} />

                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Nơi Công Tác</Form.Label>
                        //                     <Form.Control type="text" value={noicongtacme} onChange={(event) => setNoicongtacme(event.target.value)} />

                        //                 </Col>
                        //                 <Col>
                        //                     <Form.Label>Chức vụ</Form.Label>
                        //                     <Form.Control type="text" value={chucvume} onChange={(event) => setChucvume(event.target.value)} />
                        //                 </Col>

                        //             </Form.Group>
                        //             <Form.Label>Số điện thoại liên lạc</Form.Label>
                        //             <Form.Control type="text" value={sdtme} onChange={(event) => setSdtme(event.target.value)} />
                        //             <br />
                        //             <h3>C. ĐĂNG KÝ HỌC:</h3>
                        //             <br />
                        //             <span style={{ fontSize: '20px', margin: '10px' }} >Chỉ chọn 1 trong các hình thức lớp dưới đây </span>
                        //             <FormSelect value={dangkyhoc} onChange={(event) => setDangkyhoc(event.target.value)}  >
                        //                 {/* <option disabled selected='true' >Chọn danh mục</option> */}
                        //                 {chonlop.map(c => {
                        //                     return <option value={c.id}  >{c.name}</option>
                        //                 })}

                        //             </FormSelect>


                        //             {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        //         <Form.Label>Quan</Form.Label>
                        //         <FormSelect value={district} onChange={(event) => setDistrict(event.target.value)}  >
                        //             <option disabled selected='true' >Chọn danh mục</option>
                        //             {quan.map(c => {
                        //                 return <option value={c.id} onClick={() => getPhuong(c.id)} >{c.name}</option>
                        //             })}

                        //         </FormSelect>

                        //     </Form.Group>
                        //     <Form.Label>Phuong</Form.Label>
                        //     <FormSelect value={ward} onChange={(event) => setWard(event.target.value)}  >
                        //         <option disabled selected='true' >Chọn danh mục</option>
                        //         {phuong.map(c => {
                        //             return <option value={c.name}  >{c.name}</option>
                        //         })}

                        //     </FormSelect>
                        //     <Form.Label>City</Form.Label>
                        //     <Form.Control type="text" value={city} onChange={(event) => setCity(event.target.value)} /> */}

                        //             <Button variant="success" type="submit" style={{ position: 'relative', left: '40%', margin: '2%' }} >
                        //                 Đăng ký
                        //             </Button>
                        //         </Form>
                        //     </div>
                        // </Container >
                        <Container>
                            <form>
                                <div className="space-y-12">


                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tên Người Đăng Ký
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        autoComplete="given-name"
                                                        value={tenDK} required onChange={(event) => setTenDK(event.target.value)}

                                                        className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="parent" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cha/Mẹ/Người giám hộ
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="parent"
                                                        id="parent"
                                                        autoComplete="family-name"
                                                        value={moiquanhe} required onChange={(event) => setMoiquanhe(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="CCCD" className="block text-sm font-medium leading-6 text-gray-900">
                                                    CCCD
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="CCCD"
                                                        id="CCCD"

                                                        value={IDdk} required onChange={(event) => setIDdk(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="SDT" className="block text-sm font-medium leading-6 text-gray-900">
                                                    SDT
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="SDT"
                                                        id="SDT"

                                                        value={sdt} required onChange={(event) => setSdt(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label htmlFor="Hộ Khẩu Thường Trú" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Hộ Khẩu Thường Trú
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="Hộ Khẩu Thường Trú"
                                                        id="Hộ Khẩu Thường Trú"

                                                        value={hokhaunguoiDK} required onChange={(event) => setHokhaunguoiDK(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label htmlFor="Chỗ Ở Hiện Nay" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Chỗ Ở Hiện Nay
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="Chỗ Ở Hiện Nay"
                                                        id="Chỗ Ở Hiện Nay"

                                                        required value={choDK} onChange={(event) => setChoDK(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="Đã Học Tiểu Học ở Quận" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Đã Học Tiểu Học ở Quận
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="Đã Học Tiểu Học ở Quận"
                                                        name="Đã Học Tiểu Học ở Quận"

                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn Quận</option>
                                                        {getquan.map(c => {
                                                            return <option value={c.id} onClick={() => getTruong(c.id)} >{c.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Trường
                                                </label>
                                                <div className="mt-2">
                                                    <select

                                                        value={truong} onChange={(event) => setTruong(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        {gettruong.map(c => {
                                                            return <option value={c.name} >{c.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Đã học hết lớp 5 :
                                                </label>
                                                <div className="mt-2">
                                                    <select

                                                        value={trinhdo} onChange={(event) => setTrinhdo(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        {gettrinhdo.map(c => {
                                                            return <option value={c.id} >{c.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-12"><h3 style={{ marginTop: '2%' }} >B. THÔNG TIN VỀ HỌC SINH </h3></div>

                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Mã định danh
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={dinhdanh} onChange={(event) => setDinhdanh(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tên Học Sinh
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={tenHS} onChange={(event) => setTenHS(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Nơi Sinh
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={noisinh} onChange={(event) => setNoisinh(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Ngày, tháng, năm sinh:
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="date"
                                                        required
                                                        value={ngaysinh} onChange={(event) => setNgaysinh(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Giới Tính
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        value={gioitinh} onChange={(event) => setGioitinh(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option value='Nam'>Nam</option>
                                                        <option value='Nữ'>Nữ</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Dân Tộc
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={dantoc} onChange={(event) => setDantoc(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tôn Giáo
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={tongiao} onChange={(event) => setTongiao(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Diện Cư Trú
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        value={diencutru} onChange={(event) => setDiencutru(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        <option value="Thường Trú">Thường Trú</option>
                                                        <option value="Tạm Trú">Tạm Trú</option>
                                                        <option value="Diện Khác">Diện Khác</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='sm:col-span-12'>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Hộ khẩu thường trú :
                                                </label>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Số nhà , tên đường :
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={diachithuongtru} onChange={(event) => setDiachithuongtru(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phường :
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        value={phuongthuongtru} onChange={(event) => setPhuongthuongtru(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        {getphuong.map(c => {
                                                            return <option value={c.name} >{c.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Quận :
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        value={quanthuongtru} onChange={(event) => { setQuanthuongtru(event.target.value); const selectedOption = event.target.options[event.target.selectedIndex]; getPhuong(selectedOption.getAttribute('data-id')); }}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        {getquan.map(c => {
                                                            return <option value={c.name} data-id={c.id} >{c.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='sm:col-span-12'>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Chỗ ở hiện nay :
                                                </label>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Số nhà , tên đường :
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={diachi} onChange={(event) => setDiachi(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phường :
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        value={phuong} onChange={(event) => setPhuong(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        {getphuong2.map(c => {
                                                            return <option value={c.name} >{c.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Quận :
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        value={quan} onChange={(event) => { setQuan(event.target.value); const selectedOption = event.target.options[event.target.selectedIndex]; getPhuong2(selectedOption.getAttribute('data-id')); }}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        {getquan.map(c => {
                                                            return <option value={c.id} data-id={c.id}>{c.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Diện chính sách (nếu có) :
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={dienchinhsach} onChange={(event) => setDienchinhsach(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tình hình sức khỏe (ghi cụ thể, nếu có bệnh mãn tính):
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={suckhoe} onChange={(event) => setSuckhoe(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-12">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Điểm học kỳ 2 lớp 5:
                                                </label>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tiếng Việt
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="number"
                                                        required
                                                        value={tiengviet5} onChange={(event) => setTiengviet5(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Toán
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="number"
                                                        required
                                                        value={toan5} onChange={(event) => setToan5(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-12">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Đã có chứng chỉ tiếng Anh (nếu có):
                                                </label>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Chứng chỉ Cambridge
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="number"
                                                        required
                                                        value={cambridge} onChange={(event) => setCambridge(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Chứng chỉ Toefl
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="number"
                                                        required
                                                        value={toefl} onChange={(event) => setToefl(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Chứng chỉ Pearson
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="number"
                                                        required
                                                        value={pearson} onChange={(event) => setPearson(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Học bạ
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        value={hocba} onChange={(event) => setHocba(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        <option value="Học bạ tích hợp EMG">Học bạ tích hợp EMG</option>
                                                        <option value="Hoặc học bạ TATC">Hoặc học bạ TATC</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Kỹ Năng Bơi
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        value={boi} onChange={(event) => setBoi(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option disabled selected='true' >Chọn danh mục</option>
                                                        <option value="Đã biết bơi">Đã biết bơi</option>
                                                        <option value="Chưa biết bơi">Chưa biết bơi</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-12">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Năng khiếu sở trường thường xuyên:
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={nangkhieu} onChange={(event) => setNangkhieu(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-12">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Có thành tích về TDTT, Văn hóa, Nghệ thuật, các giải phong trào, Đội TNTPHCM (ghi cụ thể nếu có):
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={tdtt} onChange={(event) => setTdtt(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-12">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tham gia công tác Đội TNTP HCM, chức vụ (nếu có):
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={tntp} onChange={(event) => setTntp(event.target.value)}
                                                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-12">
                                                <h3>C. THÔNG TIN VỀ CHA MẸ CỦA HỌC SINH: </h3>
                                            </div>



                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Country
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        autoComplete="country-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option>United States</option>
                                                        <option>Canada</option>
                                                        <option>Mexico</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Street address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="street-address"
                                                        id="street-address"
                                                        autoComplete="street-address"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2 sm:col-start-1">
                                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                    City
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        autoComplete="address-level2"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                    State / Province
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="region"
                                                        id="region"
                                                        autoComplete="address-level1"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                    ZIP / Postal code
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="postal-code"
                                                        id="postal-code"
                                                        autoComplete="postal-code"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            We'll always let you know about important changes, but you pick what else you want to hear about.
                                        </p>

                                        <div className="mt-10 space-y-10">
                                            <fieldset>
                                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                                <div className="mt-6 space-y-6">
                                                    <div className="relative flex gap-x-3">
                                                        <div className="flex h-6 items-center">
                                                            <input
                                                                id="comments"
                                                                name="comments"
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </div>
                                                        <div className="text-sm leading-6">
                                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                                Comments
                                                            </label>
                                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                        </div>
                                                    </div>
                                                    <div className="relative flex gap-x-3">
                                                        <div className="flex h-6 items-center">
                                                            <input
                                                                id="candidates"
                                                                name="candidates"
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </div>
                                                        <div className="text-sm leading-6">
                                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                                Candidates
                                                            </label>
                                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                                        </div>
                                                    </div>
                                                    <div className="relative flex gap-x-3">
                                                        <div className="flex h-6 items-center">
                                                            <input
                                                                id="offers"
                                                                name="offers"
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                        </div>
                                                        <div className="text-sm leading-6">
                                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                                Offers
                                                            </label>
                                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                                <div className="mt-6 space-y-6">
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="push-everything"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Everything
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="push-email"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Same as email
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="push-nothing"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                            No push notifications
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </Container>
                    )}
                </div>
            </div>

        </>

    )
};

export default CheckOTP;
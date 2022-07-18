import React, { useState , useContext} from "react";
import Navbar from "../shared/navbar/navbar";
import './Login.css'
import { useFormik } from "formik";
import * as Yup from 'yup';
import apiService from "../../environment";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { UserContext } from "../../Context";

function Login() {
    const router = useNavigate()
    const [btn, setBtn] = useState(false)
    const [ show ,setShow ] = useState(false)

    const { setUser } = useContext( UserContext )

    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('please enter email')
                .email('invalid email address'),
            password: Yup.string()
                .required('please enter password')
        }),
        onSubmit: async (values) => {
            setBtn(false)

            let data = {
                clientIp: "122.160.200.204",
                lan: 76.6987128,
                lat: 30.7001338,
                loginDate: new Date(),
                source: "Chrome and version 96.0.4664.93",
                ...values
            }
            const loginData = await axios.post(apiService.login, data)
            if (loginData.data.code === 200) {
                // localStorage.setItem('token',loginData.data.data.token)
                localStorage.setItem('userInfo', JSON.stringify(loginData.data.data.userInfo))
                setUser({ ...loginData.data.data.userInfo })
                setBtn(false)
                toast.success(loginData.data.message)
                router('/')
            } else {
                setBtn(false)
                toast.warning(loginData.data.message)

            }
        }
    })


    return (

        <div className='login-out'>
            <Navbar />
            <div className='container text-center'>
                <div className='login-form row demo'>
                    <form onSubmit={formik.handleSubmit} >
                        <div className='login_head mt-2 mb-4 col-sm-12'>
                            <h2>Login</h2>
                        </div>
                        <div className='col-sm-12'>
                            <label>Email :</label>
                            <input type='text' className='form-control' name='email' placeholder='enter email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                            {formik.touched.email && formik.errors.email ? <small className='error_class' >{formik.errors.email}</small> : null}
                        </div>
                        <div className='col-sm-12 password'>
                            <label>Password :</label>
                            <input type={ show ? 'text' : 'password'} className='form-control' name='password' placeholder='enter password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                            <i className={ !show ? "cus-pos fa fa-eye" : "cus-pos fa fa-eye-slash"} onClick={ ()=>{ setShow( !show ) } }  ></i>
                            {formik.touched.password && formik.errors.password ? <small className='error_class' >{formik.errors.password}</small> : null}

                        </div>


                        <div className='col-sm-12 mt-4 mb-4'>
                            <button className='btn btn-primary' type='submit' disabled={btn}>Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div >



    )
}

export default Login;
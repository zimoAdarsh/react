import React, { useState } from "react";
import Navbar from '../shared/navbar/navbar';
import './Signup.css'
import { useFormik } from "formik";
import * as Yup from 'yup';
function Signup() {
    const [ show , setShow ] = useState({
        password : false,
        confirmPassword : false
    })
    const validate = (values)=>{
        const errors = {}
        if(values.password){
            errors.confirmPassword = 'Required'
        }
        

        return errors
    }


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'name too short')
                .max(30, 'name to long')
                .required('name is required'),
            email: Yup.string()
                .email('invalid email')
                .required('email is required'),
            phone: Yup.string()
                .matches('/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/',
                    'invalid phone number')
                .required('phone number is required')
                .max(10, 'invalid phone number')
                .min(10, 'invalid phone number'),
            password: Yup.string()
                .required('password is required')
                .min(8, 'password too short')
                .matches(
                    '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/',
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
            // confirmPassword: 
                // Yup.string()
                // .required('confirm password is required')
                // .oneOf([Yup.ref('password'), null], 'passwords should match')
        }),

        onSubmit: values => {
            console.log(values)
        }
    })




    return (
        <div className='signup'>
            <Navbar></Navbar>
            <div className='container'>
                <div className='signup_in'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <label>Name</label>
                            <input className='form-control' type='text' name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}></input>
                            {formik.touched.name && formik.errors.name ? <div className='error_class'> {formik.errors.name} </div> : ''}
                        </div>
                        <div className='form-group '>
                            <label>email</label>
                            <input type='text' name='email' className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} ></input>
                            {formik.touched.email && formik.errors.email ? <div className=' error_class'> {formik.errors.email} </div> : ''}

                        </div>
                        <div className='form-group '>
                            <label>Phone</label>
                            <input type='text' name='phone' id='name' className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}></input>

                            {formik.touched.phone && formik.errors.phone ? <div className='error_class'> {formik.errors.phone} </div> : ''}
                        </div>
                        <div className='form-group password'>
                            <label>Password</label>
                            <input type={ show.password ? "text"  :'password'} name='password' id='name' className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}></input>
                            <i className={ !show.password ? "cus-pos fa fa-eye" : "cus-pos fa fa-eye-slash"} onClick={ ()=>{ setShow( { password : !show.password }) } }  ></i>

                            {formik.touched.password && formik.errors.password ? <div className='error_class'> {formik.errors.password} </div> : ''}

                        </div>
                        <div className='form-group password'>
                            <label>Confirm Password</label>
                            <input type={show.confirmPassword ? "text" : 'password'} name='confirmPassword' id='confirmPassword' className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword}></input>
                            <i className={ !show.confirmPassword ? "cus-pos fa fa-eye" : "cus-pos fa fa-eye-slash"} onClick={ ()=>{ setShow ({ confirmPassword :! show.confirmPassword   }) } }  ></i>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='error_class'> {formik.errors.confirmPassword} </div> : ''}

                        </div>
                        <div className='row'>
                            <div className='col-sm-12 mt-2'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Signup;


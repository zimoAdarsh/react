import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import Autocomplete from "react-google-autocomplete";

import './List.css'
import axios from 'axios';
import apiService from '../../../environment';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import PaginatioN from '../../pagination';
import { set } from 'date-fns';
import Navbar from '../../shared/navbar/navbar';
import loadash from 'lodash'
// const load = require('lodash')
const JobList = () => {

    const [getPlaces, setPlaces] = useState('')
    const [getEducation, setEduction] = useState([])
    const [getIndu, setIndu] = useState([])
    const [getJobs, setJobs] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    useEffect(() => {
        eductionList()
        industryList()
    }, [])
    useEffect(() => {
        jobList()

    }, [page])

    const eductionList = () => {
        axios.post(apiService.eductionsList, { isActive: "true", isDeleted: "false" }).then((res) => {
            if (res['data'].code === 200) {
                setEduction(res['data'].data)
            }
        })
    }

    const industryList = () => {
        axios.post(apiService.industryList, { isActive: "true", isDeleted: "false" }).then((res) => {
            if (res['data'].code === 200) {
                setIndu(res['data'].data)
            } else {
                toast.error((res['data'].message))
            }
        })
    }

    const jobList = () => {
        let myArr = [ 1 ,2 ,3 , null , undefined ,4 ,5 ,6 , ""]
        
        let myArr1 = [ 'a' , 'b' , 'c' ]

        console.log( "loadash=====" , loadash.concat( myArr , myArr1) )

        let data = {
            ...formik.values,
            page: page,
            count: 5
        }
        axios.post(apiService.jobList, data).then((res) => {
            if (res['data'].code === 200) {
                
                setJobs(res['data'].data)
                setTotalCount(res['data'].totalCount)
            } else {
                toast.error((res['data'].message))
            }
        })
    }




    const formik = useFormik({

        initialValues: {
            fullAddress: '',
            searchKey: '',
            educationChks: [],
            industryChks: [],
            lat: null,
            lng: null
        },

        onSubmit: (values) => {
            jobList()
        }
    })

    const autosearch = (place) => {

        formik.setFieldValue('fullAddress', place.formatted_address)
        formik.setFieldValue('lat', place.geometry.location.lat())
        formik.setFieldValue('lng', place.geometry.location.lng())

    }
    // console.log('log==>', formik.values)

    const reset = () => {
        formik.values.educationChks = []
        formik.values.industryChks = []
        formik.values.searchKey = ""
        formik.values.fullAddress = ''
        formik.values.lat = null
        formik.values.lng = null
        formik.resetForm()
        setPage(1)
        jobList()
    }

    return (
        <>
        <Navbar></Navbar>
            <div className='job_post'>
                <div className='container'>
                    <div className='srch_header'>
                        <p className='cus_title'>
                            Search For Your Next Job
                        </p>
                        <form onSubmit={formik.handleSubmit} >
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <input type="text" className="form-control" name="searchKey" onChange={formik.handleChange} value={formik.values.searchKey} autoComplete='off' placeholder="Search by Title and Company" />
                                </div>
                                <div className='col-sm-4'>
                                    <Autocomplete
                                        className="form-control"
                                        name="fullAddress"
                                        value={formik.values.fullAddress} autoComplete='off' onChange={formik.handleChange}
                                        apiKey={'AIzaSyC0y2S4-iE2rHkYdyAsglz_qirv0UtpF1s'}
                                        onPlaceSelected={(place) => autosearch(place)}
                                    />
                                </div>
                                <div className='col-sm-4'>
                                    <button className='cus_btn' type='submit' >Submit</button>
                                    &nbsp;
                                    <button className='cus_btn' type='button' onClick={() => reset()}>Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='row job_post_list mt-5 '>
                        <div className='col-sm-3 col-xs-9 filters '>
                            <p style={{ borderBottom: '1px solid lightgray', padding: "10px" }} className='text-center'>All filters</p>
                            <div className="fill_sec mt-2 mb-2">
                                <p className='fill_type m-0 '>
                                    Education
                                </p>
                                <div className='list'>
                                    {getEducation.map((edu) =>
                                        <p className='m-0 p-0'><Checkbox type='checkbox' name='educationChks' checked={formik.values.educationChks.includes(edu._id)} onChange={formik.handleChange} value={edu._id} /> {edu.qualification}</p>
                                    )}
                                </div>
                            </div>
                            <div className="fill_sec mt-2 mb-2">
                                <p className='fill_type m-0'>
                                    Industries
                                </p>
                                <div className='list'>
                                    {getIndu.map((indus) =>
                                        <p className='m-0 p-0'><Checkbox type='checkbox' name='industryChks' checked={formik.values.industryChks.includes(indus._id)} onChange={formik.handleChange} value={indus._id} /> {indus.name}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-1'>

                        </div>
                        <div className='col-sm-8 '>
                            {getJobs.map((job) =>
                                <div className='jobs mb-2'>
                                    <div className='row'>
                                        <div className='col-sm-6'>

                                            <h6 className='job_title'> <Link to={'/jobs/view/' + job._id} style={{ textDecoration: "none", color: "#443f3f" }}>{job.title} </Link>  </h6>
                                        </div>
                                        <div className='col-sm-6 text-right'>
                                            <img className='cus-profile-img' src={apiService.companyImage + job.companyImg}></img>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: "15px", color: "#8b8a8a", fontWeight: "500" }}> {job.companyName} </p>
                                    <p> <span style={{ fontWeight: "600" }}>  Salary : </span>{job.salaryRang[0].currency} {job.salaryRang[0].max}.00-{job.salaryRang[0].min}.00</p>
                                    <p> <span style={{ fontWeight: "600" }}>  Job Location : </span>{job.fullAddress}</p>
                                    <p> <span style={{ fontWeight: "600" }}>  Job Description : </span > <span dangerouslySetInnerHTML={{__html: job.description}}></span> </p>
                                    
                                </div>
                            )}
                            <div className='row'>
                                <div className='col-sm-12 text-center cus_pagi'>
                                    {totalCount > 5 && <PaginatioN count={totalCount} page={page} setPage={setPage}></PaginatioN>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}



export default JobList
import { fontWeight } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import apiService from '../../../environment';
import JobAdd from '../add/add';
import './view.css'
const ViewJob = () => {

    const [jobData, setData] = useState({})

    const { id } = useParams()

    useEffect(() => {
        getJobDetail()
    }, [])

    const getJobDetail = () => {
        axios.post(apiService.jobDetail, { _id: id, userId: "624fcfb1bc86d15538faf61a" }).then((res) => {
            if (res['data'].code === 200) {

                setData(res['data'].data)
            } else {
                toast.error(res['data'].message)
            }
        })
    }
    console.log('==>', jobData)

    const saveUserJob = () => {
        let data ={
            jobId: jobData._id ,
            userId : "624fcfb1bc86d15538faf61a",
            companyId : jobData.createdById

        }
        axios.post(apiService.saveJob , data).then((res)=>{
            if(res['data'].code===200){
                jobData.isSaved = true
                setData({...jobData})
            }
            
        })
    }

    return (
        <>
            <div className='container'>
                <div className='view_job'>
                    <div className='row head_row'>
                        <div className='col-sm-6 job_head'>
                            Job Title : {jobData?.title}
                        </div>
                        <div className='col-sm-6 head_btn'>
                            <button className='cus_btn' onClick={() => window.history.back()} >Back</button>
                            <button disabled={ jobData.isSaved } className='cus_btn' onClick={() => saveUserJob()}> {jobData.isSaved ? "Saved" : "Save Job"} </button>
                            <button className='cus_btn'>{jobData.alreadyApplied ? "Applied" : "Apply"}</button>
                        </div>
                    </div>
                    <div className='content mt-3'>
                        <p>  <span style={{ fontWeight: "500" }}> Company Name :</span> {jobData?.companyName} </p>
                        <p className="m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
                                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" />
                            </svg>
                            &nbsp;
                            {jobData?.minimumExperience} months {jobData?.minimumExperience} years
                        </p >
                        <p className="m-1"> Salary Type : {jobData?.salaryType} </p>
                        {/* <p className="m-1"> {jobData?.salaryRang[0]?.currency} &nbsp; {jobData?.salaryRang[0]?.min} - {jobData?.salaryRang[0]?.max} </p> */}
                        <div className='content_sec mt-4'>
                            <p style={{ margin: '0px' }}> <span style={{ margin: '0px', fontWeight: "600" }}>  Posted  : </span>{jobData?.fullAddress}  </p>
                            <p style={{ margin: '0px' }}> <span style={{ margin: '0px', fontWeight: "600" }}> Job Location :     </span>{jobData?.postedAt} </p>
                            <p style={{ margin: '0px' }}> <span style={{ margin: '0px', fontWeight: "600" }}>  Openings  : </span> {jobData?.vacancy}</p>
                            <p style={{ margin: '0px' }}> <span style={{ margin: '0px', fontWeight: "600" }}>  Job Appplicants :</span> {jobData?.applicantCount} </p>
                        </div>
                    </div>
                </div>

            </div>
        </>


    )

}

export default ViewJob
import React, { useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik'
import apiService from '../../environment'
import axios from 'axios'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

import './Event.css'

const Event = () => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [checkValue, setCheckValue] = useState(true)

    const [timeZone, setTimezone] = useState([])
    const currency = [
        { value: 'USD' }, { value: 'CAD' }, { value: 'MXN' }
    ]
    const eventTypesList = [
        { Type: 'Public' }, { Type: 'Private' }
    ]


    function handleCheck(e) {
        console.log(checkValue)
        if (e.target.checked) {
            setCheckValue(false)
            formik.setFieldValue('showAddress', false)
            formik.setFieldValue('link', '')
            formik.setFieldValue('eventMode','online')
        } else {
            setCheckValue(true)
            formik.setFieldValue('showAddress', true)
            formik.setFieldValue('address', '')
            formik.setFieldValue('venue', '')
            formik.setFieldValue('eventMode','offline')


        }

    }


    useEffect(() => {
        const getTimezoneList = async () => {
            let timezonelist = await axios.post(apiService.timeZone)
            setTimezone(timezonelist['data']?.data)

            console.log('timezone', timeZone)
            console.log('timezonelist', timezonelist)

        }

        getTimezoneList()

    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            timezoneId: '',
            description: '',
            startDate: null,
            endDate: null,
            speaker: '',
            currency: '',
            eventFee: '',
            visibility: '',
            address: '',
            venue: '',
            link:'',
            showAddress: true,
            eventMode:'',
            createdById: "61a84b567410aec83e4266df"
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('name is required'),
            timezoneId: Yup.string()
                .required('please select timezone'),
            description: Yup.string()
                .required('event description is required'),
            startDate: Yup.string()
                .required('start date is required'),
            endDate: Yup.string()
                .required('end date is required'),
            speaker: Yup.string()
                .required('speaker name is required'),
            currency: Yup.string()
                .required('currency is required'),
            eventFee: Yup.number()
                .required('event fees is required'),
            visibility: Yup.string()
                .required('please select visibility'),
            showAddress: Yup.boolean(),

            address: Yup.string()
                .when('showAddress', {
                    is: true,
                    then: Yup.string().required('please enter address'),
                }),
            venue: Yup.string()
                .when('showAddress', {
                    is: true,
                    then: Yup.string().required('please enter venue'),
                }),
            link: Yup.string()
                .when('showAddress', {
                    is: false,
                    then: Yup.string().required('please enter link'),
                })
        }
        ),
        async onSubmit() {
            let data = {
                ...formik.values,
                broadcast :{
                    link:formik.values.link
                }
            }
            const eventData = await axios.post(apiService.addEvent,data)
            console.log('eventData',eventData)
            // let eventResult = await axios.post(formik.values)

        }
    })

    return (
        <div className='event'>
            <form onSubmit={formik.handleSubmit} >

                <div className='event-form row'>
                    <div className='event_head mt-2 mb-4 col-sm-12'>
                        <h2>Create Event</h2>
                    </div>
                    <div className='col-sm-6 mt-1 mb-1'>
                        <FormControl fullWidth>
                            <TextField id="outlined-basic" label="enter name" variant="outlined" name='name' value={formik.values.name} onChange={formik.handleChange} />
                            {formik.errors.name ? <div className='error'> {formik.errors.name} </div> : null}
                        </FormControl>
                    </div>
                    <div className='col-sm-6 mt-1 mb-1'>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                value={formik.values.timezoneId}
                                label="timezone"
                                name='timezoneId'
                                onChange={formik.handleChange}
                            >{
                                    timeZone.map((time) =>
                                        <MenuItem value={time._id} key={time.name}>{time.name}</MenuItem>
                                    )
                                }


                            </Select>
                        </FormControl>
                        {formik.errors.timezoneId ? <div className='error'> {formik.errors.timezoneId} </div> : null}

                    </div>
                    <div className='col-sm-12 mt-1 mb-1'>
                        <FormControl fullWidth>
                            <TextField id="outlined-basic" label="event description" variant="outlined" name='description' value={formik.values.description} onChange={formik.handleChange} />
                            {formik.errors.description ? <div className='error'> {formik.errors.description} </div> : null}
                        </FormControl>
                    </div>
                    <div className='col-sm-6 mt-1 mb-1'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DateTimePicker
                                    label="Start Date & Time"
                                    format="DD/mm/yyyy"
                                    value={formik.values.startDate}
                                    onChange={value => formik.setFieldValue('startDate', value)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                            {formik.errors.startDate ? <div className='error'> {formik.errors.startDate} </div> : null}

                        </LocalizationProvider>
                    </div>
                    <div className='col-sm-6 mt-1 mb-1'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DateTimePicker
                                    format="DD/mm/yyyy"
                                    label="End Date & Time"
                                    value={formik.values.endDate}
                                    onChange={value => formik.setFieldValue('endDate', value)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                            {formik.errors.endDate ? <div className='error'> {formik.errors.endDate} </div> : null}

                        </LocalizationProvider>
                    </div>
                    <div className='col-sm-12 mt-1 mb-1'>
                        <FormControl fullWidth>
                            <TextField id="outlined-basic" label="speaker" variant="outlined" name='speaker' value={formik.values.speaker} onChange={formik.handleChange} />
                            {formik.errors.speaker ? <div className='error'> {formik.errors.speaker} </div> : null}

                        </FormControl>
                    </div>
                    <div className='col-sm-5 mt-1 mb-1'>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                value={formik.values.currency}
                                label="select currency"
                                name='currency'
                                onChange={formik.handleChange}
                            >{
                                    currency.map((currency) =>
                                        <MenuItem value={currency.value} key={currency.value}>{currency.value}</MenuItem>
                                    )
                                }
                            </Select>
                            {formik.errors.currency ? <div className='error'> {formik.errors.currency} </div> : null}

                        </FormControl>
                    </div>
                    <div className='col-sm-7 mt-1 mb-1'>
                        <FormControl fullWidth>
                            <TextField id="outlined-basic" label="eventFee" variant="outlined" name='eventFee' value={formik.values.eventFee} onChange={formik.handleChange} />
                            {formik.errors.eventFee ? <div className='error'> {formik.errors.eventFee} </div> : null}

                        </FormControl>
                    </div>
                    <div className='col-sm-12 mt-1 mb-1'>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                value={formik.values.visibility}
                                label="visibility"
                                name='visibility'
                                onChange={formik.handleChange}
                            >{
                                    eventTypesList.map((visibility) =>
                                        <MenuItem value={visibility.Type} key={visibility.Type}>{visibility.Type}</MenuItem>
                                    )
                                }
                            </Select>
                            {formik.errors.visibility ? <div className='error'> {formik.errors.visibility} </div> : null}
                        </FormControl>
                    </div>
                    <div className='col-sm-4 mt-1 mb-1'>
                        <Checkbox {...label} checked={checkValue.checked} onChange={e => { handleCheck(e) }}></Checkbox>This is a virtual event
                    </div>
                    {checkValue ? <div className='row'>
                        <div className='col-sm-12 mt-1 mb-1'>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" label="address" variant="outlined" name='address' value={formik.values.address} onChange={formik.handleChange} />
                                {formik.errors.address ? <div className='error'> {formik.errors.address} </div> : null}

                            </FormControl>
                        </div>
                        <div className='col-sm-12 mt-1 mb-1'>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" label="venue" variant="outlined" name='venue' value={formik.values.venue} onChange={formik.handleChange} />
                                {formik.errors.venue ? <div className='error'> {formik.errors.venue} </div> : null}

                            </FormControl>
                        </div>
                    </div> : <div className='col-sm-12 mt-1 mb-1'>
                        <FormControl fullWidth>
                            <TextField id="outlined-basic" label="link" variant="outlined" name='link' value={formik.values.link} onChange={formik.handleChange} />
                            {formik.errors.link ? <div className='error'> {formik.errors.link} </div> : null}

                        </FormControl>
                    </div>}


                    <div className='col-sm-12 mt-4 mb-4'>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                </div>

            </form>


        </div>
    )
}

export default Event
import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import * as moment from "moment"
import "./Test.css"
const Test = () => {
    const [value, setValue] = useState(new Date());
    const [dates, setDates] = useState([])

    let week = [
        { day: 'sun', num: 0 },
        { day: 'mon', num: 1 },
        { day: 'tue', num: 2 },
        { day: 'wed', num: 3 },
        { day: 'thu', num: 4 },
        { day: 'fri', num: 5 },
        { day: 'sat', num: 6 }
    ]

    useEffect(() => {
        funcsion()
    }, [value])

    const funcsion = () => {

        let start = moment(value).startOf('month')
        let end = moment(value).endOf('month').utc()

        var currentDate = moment(start);
        var stopDate = moment(end);
        while (currentDate <= stopDate) {
            dates.push({ date: moment(currentDate).format('YYYY-MM-DD'), count: new Date(currentDate).getDay() })
            currentDate = moment(currentDate).add(1, 'days');
        }
        setDates([...dates])

        console.log(dates)



    }

    const handleChange = (newValue) => {
        setValue(newValue);

    };

    return (
        <>
            <div className='time mt-5'>
                <div className='container'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <div className='cal m-4'>
                        {
                            week.map((day) =>
                                <div className='cal_inner'>
                                    <p className=''> {day.day} </p>
                                    {
                                        dates.map((date) =>
                                        date.count === day.num? <p> {date.date}</p> : null)
                                    }
                                </div>

                            )
                        }
                    </div>

                </div>

            </div>

        </>
    )

}

export default Test
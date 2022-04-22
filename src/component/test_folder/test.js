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
import { date } from 'yup';
const Test = () => {
    const [value, setValue] = useState(new Date());
    const [dates, setDates] = useState([])

    let week = [
        { day: 'sun', num: 0, data: [] },
        { day: 'mon', num: 1, data: [] },
        { day: 'tue', num: 2, data: [] },
        { day: 'wed', num: 3, data: [] },
        { day: 'thu', num: 4, data: [] },
        { day: 'fri', num: 5, data: [] },
        { day: 'sat', num: 6, data: [] }
    ]

    useEffect(() => {
        funcsion()
    }, [value])

    const funcsion = () => {
        let datesArr = []
        let start = moment(value).startOf('month')
        let end = moment(value).endOf('month').utc()


        while (start <= end) {
            datesArr.push({ date: moment(start).format('YYYY-MM-DD'), count: new Date(start).getDay() })
            start = moment(start).add(1, 'days');
        }

        for (let i = 0; i < week.length; i++) {
            for (let j = 0; j < datesArr.length; j++) {
                if (week[i].num === datesArr[j].count) {
                    week[i].data.push(`<p> ${datesArr[j].date} </p>`)

                } else {
                    week[i].data.push("<div></div>")
                }

            }
        }





        setDates([...week])
        console.log('datesArr==>', dates)

    }

    const handleChange = (newValue) => {
        setValue(newValue);

    };

    return (
        <>
            <div className='time mt-5'>
                <div className='container'>
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider> */}

                    <div className='cal m-4 cal'>
                        {

                            dates.map((date) =>
                                <div>
                                    {/* <p className=''> {date.day} </p> */}
                                    {
                                        date.data.map((res) =>
                                            <p dangerouslySetInnerHTML={{ __html:  res  }}>  </p>
                                        )
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
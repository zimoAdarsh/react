import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Constant from '../constant';
const PaginatioN = (props) => {
    const [page , setPage] = useState(1) 
 
    const handleChange = (e , value)=>{
        setPage(value)
        props.function(value)
    }
    const totalPages = Math.ceil(props.count / Constant.itemsPerPage)

    return (
        <div className="pagination">
            <div className='row'>
                <div className='col-sm-12'>
                    <Stack spacing={props.count}>
                        <Pagination  count={totalPages} onChange={handleChange} de color="primary"  defaultPage={page}/>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default PaginatioN
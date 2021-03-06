import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Constant from '../constant';
const PaginatioN = (props) => {
    console.log('totalCount==>',props)
    const handleChange = (e , value)=>{
        props.setPage(value)
    }
    const totalPages = Math.ceil(props.count / Constant.itemsPerPage)

    return (
        <div className="pagination">
            {/* <div className='row'> */}
                {/* <div className='col-sm-12'> */}

                        <Pagination size="large" count={totalPages} onChange={handleChange} color="primary"  defaultPage={props?.page}/>
                {/* </div> */}
            {/* </div> */}
        </div>
    )
}

export default PaginatioN
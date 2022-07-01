import React from 'react'


const Sub = ({ items, subs , callFun}) => {

    console.log('sub menu items ', items, subs)

    return (
        <div className='menu '>
            {/* <div className='row'> */}
                {/* <div className='col-sm-12'> */}
                <p> {items.item}
                
                <div className=''> {subs && subs.map((res)=> <p className='ml-5' onClick={ callFun }> {res} </p> ) } </div>
                
                </p>
                {/* </div> */}
            {/* </div> */}
        </div>

    )

}

export default Sub
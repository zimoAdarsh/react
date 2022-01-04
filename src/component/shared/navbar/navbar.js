import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './navbar.css'
function Navbar() {
    console.log('Navbar render')
    const [userData , setUserData] = useState('')
    const getUserData = ()=>{
            let local = JSON.parse(localStorage.getItem('userInfo')) 
            // setUserData(  )

            console.log("userData",local)
    } 

    useEffect( ()=>{
        getUserData()
    },[])


    return (
        <div className='main-nav'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4 text-left'>

                        <h3 className='head'>
                            <Link to='/'> Logo</Link>
                        </h3>


                    </div>
                    <div className='links col-sm-4 mt-2'>
                            <ul>
                                <li> <Link to="/signup">Signup</Link>  </li>
                                <li> <Link to="/home">Home</Link> </li>
                                <li> <Link to="/event">Event</Link> </li>
                                <li> <Link to="/trip">Trips</Link> </li>

                            </ul>
                        

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar
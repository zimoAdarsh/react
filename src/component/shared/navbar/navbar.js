import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { UserContext } from "../../../Context";
import { margin } from "@mui/system";

function Navbar() {
    const local = useContext(UserContext)
    let isUser = false
//    setUser(local)
    

    // useEffect(()=>{
        
        if(local && local.user && local.user.token){   
            isUser = true
        }else{
            isUser = false
        }
   
    // },[])

    return (
        <div className='main-nav'>
            <div className='container'>
                <div className='row' style={{ margin : '19px 0'}}>
                    <div className='col-sm-4 text-left'>

                        <h3 className='head'>
                            <Link to='/'> Logo</Link>
                        </h3>


                    </div>
                    <div className='links col-sm-4 mt-2'>
                            <ul>
                               { !isUser ? <><li> <Link to="/signup">Signup</Link>  </li>
                                <li> <Link to="/">Login</Link>  </li> </>
                               :
                                <><li> <Link to="/home">Home</Link> </li><li> <Link to="/event">Event</Link> </li><li> <Link to="/trip">Trips</Link> </li><li> <Link to="/category">Products</Link> </li></>}

                            </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar
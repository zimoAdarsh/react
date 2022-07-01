import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { UserContext } from "../../../Context";
import { useNavigate } from "react-router";

function Navbar() {
    const local = useContext(UserContext)
    let navigator = useNavigate()
    console.log('navbar called here==>',local)

    const logout=()=>{
        localStorage.clear()
        navigator('')
    }




    return (
        <div className='main-nav'>
            <div className='container'>
                <div className='row' style={{ margin: '19px 0' }}>
                    <div className='col-sm-4 text-left'>

                        <h3 className='head'>
                            {/* <Link to='/'> Logo</Link> */}
                        </h3>


                    </div>
                    <div className='links col-sm-7 mt-2'>
                        <ul>
                            {!Object.keys(local.user).length ? <><li> <Link to="/signup">Signup</Link>  </li>
                                <li> <Link to="/">Login</Link>  </li> </>
                                :
                                <>
                                    <li> <Link to="/home">Home</Link> </li>
                                    <li> <Link to="/event">Event</Link> </li>
                                    <li> <Link to="/trip">Trips</Link> </li>
                                    <li> <Link to="/category">Products</Link> </li>
                                    <li> <Link to="/map">Map</Link> </li>
                                    <li> <Link to="/e-commerce">E-commerce </Link>  </li>
                                    <li onClick={()=> logout() } > Logout ({local.user.personName}) </li>
                                </>
                            }

                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default React.memo(Navbar)

// export default Navbar
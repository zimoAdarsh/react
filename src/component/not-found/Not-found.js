import React from "react";
import { Link } from "react-router-dom";
import './Not-Found.scss'

const NotFound = () => {
    return (
        <>
            <main>
                <div class="container">
                    <div class="row not-found">
                        <div className='col-sm-12 text-center'>
                            
                                <h1>404</h1>
                                <h2>UH OH! You're lost.</h2>
                                <p>The page you are looking for does not exist.
                                    How you got here is a mystery. But you can click the button below
                                    to go back to the homepage.
                                </p>
                                <button class="btn green"> <Link to='/home'>Home  </Link> </button>
                            
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default NotFound
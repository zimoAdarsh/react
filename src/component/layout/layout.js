import React , { Suspense } from 'react'
import Navbar from '../shared/navbar/navbar'
const Home = React.lazy(() => import('../home/home'))
const Layout = () => {
    return (
        <>
            <Suspense fallback={<div>Loading</div>}>
                {/* <div className="com_head"> */}
                    <Navbar> </Navbar>
                {/* </div> */}
                {/* <div className="coms"> */}
                    <Home></Home>
                {/* </div> */}
            </Suspense>

        </>
    )
}

export default Layout
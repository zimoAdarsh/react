import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiService from "../../environment";
import Navbar from '../shared/navbar/navbar';
import "./Trip.css"
import PaginatioN from '../pagination';
import Constant from '../../constant';
const Trip = () => {
    const [tripData, setTripData] = useState(null)
    const [ page , setPage] =useState(1)

    useEffect(() => {
        Tripsdata(1)
    }, [page])


    const Tripsdata =  (page) => {

         axios.post(apiService.tripData, { createdById: "624fcb27bc86d15538faf573",driverId: "624fcfb1bc86d15538faf61a", runningStatus: "ALL", count: Constant.itemsPerPage, page: page }).then((res) => {
            if (res.data.code === 200) {
                setTripData(res.data)

            }
            
        })
    }

    return (
        <div className="trip">
            <Navbar />
            <div className='container'>
                <div className="out">
                    <div className='row'>
                        <div className="col-sm-2 mb-2 cus_head">
                            <strong>Source</strong>
                        </div>
                        <div className="col-sm-2 mb-2 cus_head  ">
                            <strong>Destination</strong>
                        </div>
                        <div className="col-sm-2 mb-2 cus_head">
                            <strong>Driver</strong>
                        </div>
                        <div className="col-sm-2 mb-2 cus_head">
                            <strong>Truck</strong>
                        </div>
                        <div className="col-sm-2 mb-2 cus_head">
                            <strong>Load number</strong>
                        </div>
                        <div className="col-sm-2 mb-2 cus_head">
                            <strong>Person Name</strong>
                        </div>
                    </div>
                    {tripData?.data.map((trip) =>
                        <div className='row' key={trip._id}>
                            <div className="col-sm-2 cus_detail">
                                {trip.source.address}
                            </div>
                            <div className="col-sm-2 cus_detail">
                                {trip.destination.address}
                            </div>
                            <div className="col-sm-2 cus_detail">
                                {trip.driverData.firstName} {trip.driverData.lastName}
                            </div>
                            <div className="col-sm-2 cus_detail">
                                {trip.truckData.name}
                            </div>
                            <div className="col-sm-2 cus_detail">
                                {trip.loadNumber}
                            </div>
                            <div className="col-sm-2 cus_detail">
                                {trip.personName}
                            </div>
                        </div>
                    )}
                    <div className='row'>
                        <div className='col-sm-12 text-center cus_pagi'>
                       {<PaginatioN count={tripData?.totalCount} page ={page}  setPage={ setPage }></PaginatioN>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Trip
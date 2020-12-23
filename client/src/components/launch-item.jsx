import React from 'react'
import Moment from 'react-moment'
import {LaunchDetails} from './styling/launch-details'

const LaunchItem = ({ data }) => {
    const {flight_number, mission_name, launch_success, launch_date_local} = data
    return(
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-10">
                    <h4>
                        Mission: 
                        <span className={launch_success? 'text-success' : 'text-danger'}>{mission_name}</span> 
                    </h4>
                    <h6>
                        Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
                    </h6>
                </div>
                <div className="col-md-2">
                    <LaunchDetails to={`/launch/${flight_number}`} className="btn btn-secondary">Launch details</LaunchDetails>
                </div>
            </div>
        </div>
    )
}

export default LaunchItem
import React, { Component, Fragment } from 'react'
import {gql} from 'apollo-boost'
import {Query} from 'react-apollo'

import Legend from './styling/success_failure_legend'
import LaunchItem from './launch-item'

const LAUNCHES_QUERY = gql`
    query LaunchesQuery{
        launches{
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`


class Launches extends Component {
    render(){
        return(
            <Fragment>
                <h2 className="display-4 my-3">Launches</h2>
                <Legend />
                <Query query={LAUNCHES_QUERY}>
                {
                    ({ loading, error, data }) => {
                        if (loading)
                            return <h4>Loading...</h4>
                        if (error)
                            console.log(error)
                        else
                        return data.launches.map(launch => (
                            <LaunchItem key={launch.flight_number} data={launch}/>
                        ))
                    }
                }
                </Query>
            </Fragment>
        )
    }
}

export default Launches
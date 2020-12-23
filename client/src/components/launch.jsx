import React, { Component, Fragment } from 'react'
import {gql} from 'apollo-boost'
import {Query} from 'react-apollo'
import {Link} from 'react-router-dom'


// Syntax for queries with arg is "$(graphql variable as defined in schema) : (its type)"
// launch() takes in flight_number as its arg as per schema which requires variable name assigned using $
const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number){
            flight_number,
            launch_date_local,
            launch_success,
            mission_name,
            launch_year,
            rocket{
                rocket_id,
                rocket_name,
                rocket_type
            }
        }
    }
`

// Since the query needs arg flight_number, without passing it through variables={{}} in Query would cause an internal 500 error saying
// Int is undefined since it never would get the flight_number
// ALSO, although flight_number would return a "number" apparenly, its required to do parseInt to fully convert it to a number, else error
class Launch extends Component{
    render(){
        let {flight_number} = this.props.match.params
        flight_number = parseInt(flight_number)
        return(
            <Fragment>
                <Query query={LAUNCH_QUERY} variables={{flight_number}}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) {
                            return <h3 className="d-flex justify-content-center mt-5">Error 404: Page not found</h3>
                        }
                        else{
                            const {
                                mission_name, 
                                launch_year, 
                                launch_success
                            } = data.launch
                            const {
                                rocket_id,
                                rocket_name,
                                rocket_type
                            } = data.launch.rocket
                            return(
                                <Fragment>
                                    <h1 className="display-4 my-3">
                                        <span className="text-dark">Mission:</span> {mission_name}
                                    </h1>
                                    <br/>
                                    <h4 className="mb-3">Launch Details</h4>
                                    <ul style={{ padding:0, marginTop:20 }}>
                                        <li className="list-group-item">
                                            Flight Number : {flight_number}
                                        </li>
                                        <li className="list-group-item">
                                            Launch Year : {launch_year}
                                        </li>
                                        <li className="list-group-item">
                                            Launch Successful : 
                                                {
                                                    launch_success ? 
                                                    <span className="text-success"> Yes</span> :
                                                    <span className="text-danger"> No</span>
                                                }
                                        </li>
                                    </ul>

                                    <h4 className="mb-3 mt-4">Rocket Details</h4>
                                    <ul style={{ padding:0, marginTop:20 }}>
                                        <li className="list-group-item">
                                            Rocket Name : {rocket_name}
                                        </li>
                                        <li className="list-group-item">
                                            Rocket Type : {rocket_type}
                                        </li>
                                        <li className="list-group-item">
                                            Rocket ID : {rocket_id}
                                        </li>
                                    </ul>
                                    
                                    <div className="d-flex justify-content-between">
                                        {
                                            flight_number===1 ?
                                            <Link to="/" className="btn btn-secondary">Home</Link> :
                                            <Link to={`/launch/${flight_number-1}`} className="btn btn-secondary">Back</Link>
                                        }                                        
                                        <Link to={`/launch/${flight_number+1}`} className="btn btn-secondary">Next</Link>
                                    </div>
                                    
                                </Fragment>
                            )
                        }
                    }
                }
                </Query>
            </Fragment>
        )
    }
}

export default Launch
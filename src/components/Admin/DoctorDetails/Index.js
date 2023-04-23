import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Index() {
    const location=useLocation();
    
  return (
    <div className='container'>
        <div class="row">
    <div class="col-sm-8">
        <p class="font-weight-bold">First Name : {location.state.fname}</p>
        <p class="font-weight-bold">Last Name : {location.state.lname}</p>
        <p class="font-weight-bold">Email : {location.state.email}</p>
        <p class="font-weight-bold">Type : {location.state.type}</p>
        <p class="font-weight-bold">Phone Number : {location.state.ph_number}</p>
        <p class="font-weight-bold">Patient Count : {location.state.patient_count}</p>
    </div>
    <div class="col-sm-4">
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-primary btn-lg btn-block">Time Table</button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-secondary btn-lg btn-block">Appointment History</button>
            </div>
        </div>
    </div>
    </div>

      
    </div>
  )
}

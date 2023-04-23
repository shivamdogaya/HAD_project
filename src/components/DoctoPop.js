import React, { useState } from 'react'
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
function DoctoPop({status,hide}) {
  const [email,setEmail]=useState("");
  const navigate=useNavigate();
    const submit=(e)=>{
        e.preventDefault();
        let jwt=null;
        jwt=localStorage.getItem('adminauthenticate');
        jwt="Bearer "+jwt;
        const config = {
        headers:{
          'Authorization':jwt
          }
        };
        axios.get(`http://localhost:8000/admin/get_doctor/${email}`,config)
        .then(res=>{console.log(res);
          hide();
          navigate("/admin/doctordetails",{state:res.data});})
        .catch(error=>{
          console.log(error.response.status);
          alert("Not Found");
          hide();
        });
    }
  return (
    <div>
        <Modal show={status} onHide={hide}>
              <Modal.Header>
              <Modal.Title>Enter details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={submit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Enter doctor email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""
                        value={email}
                        onChange={(e)=>{
                          setEmail(e.target.value)
                        }}/>
                    </div>
                    <button style={{width:'30%' ,marginLeft:'150px',height:30, backgroundColor: 'grey',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success">Submit</button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={hide}>Cancel</Button>
              </Modal.Footer>
            </Modal>
    </div>
  )
}
export default DoctoPop;

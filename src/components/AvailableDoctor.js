import React, { useEffect, useRef, useState } from 'react'  
import { createChannel, createClient } from 'agora-rtm-react'
import PatientServices from '../services/PatientServices';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { Button, Stack } from '@mui/material';
import { AppBar, Toolbar, Typography,Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAlert } from 'react-alert'
import PersonIcon from '@mui/icons-material/Person';
export default function () {
    let jwt=null;
    jwt=localStorage.getItem('patientauthenticate');
    jwt="Bearer "+jwt;
    const config = {
        headers:{
            'Authorization':jwt
        }
    };
    const [doctors,setDoctors]=useState([]);
    const location=useLocation();
    let type=location.state;
    const btn=useRef([]);
    let APP_ID="7ce97bbc3ec1405ca54c724c87817be4";
    let token=null;
    const patientId = useSelector(state => state.patient.patientId);
    let uid=String(patientId);
    
    const navigate=useNavigate();
    let client;
    let channel={};
    const useClient = createClient(APP_ID);
    let useChannel;
    client = useClient();
  
    
    
    const notifyreject = () => toast
    (
    'Request Rejected',{
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      onClose: () => {
        navigate(0);
      }
    });

    const notifyaccept = () => toast
    (
    'Request Accepted',{
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      onClose: () => {
        doctors.map((el, index) => {
          btn.current[index].disabled = false;
          btn.current[index].textContent = 'Select';
        });
      }
    });

    const notifyjoin = () => toast
    (
    <>
    <div>Join Now
    <button style={{backgroundColor:'gray', color:'white'}} onClick={()=>{
        navigate('/ChatRoom');
        toast.dismiss(patientId);
      }}>
        Ok</button>
    </div> 
    </>,{
      toastId: patientId,
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
      draggable: false
    });
    useEffect(()=>{
        PatientServices.getAvailableDoctor({"id":patientId,"type":type}, config)
        .then(res=>{
            console.log(res);
            setDoctors(res.data);
            })
        .catch(error=>{
          console.log(error.response.status);
        });
    },[]);
    useEffect(()=>{
      doctors.map((doc)=>{
        useChannel=createChannel(doc.email);
        let e=doc.email;
        channel[e]=useChannel(client);
      });
    },[doctors])
    
    const joinChannel=async(email)=>{
        await client.login({ uid,token });
        await channel[email].join();   
        client.on('MessageFromPeer',handleMessageFromPeer);
    }
    const send=async (email)=>{
        doctors.map((el, index) => {
          btn.current[index].disabled = true;
          btn.current[index].textContent = 'Wait.....';
        });
        
        await joinChannel(email);
    }
   
    
    let handleMessageFromPeer=async(message,MemberId)=>{
        message=JSON.parse(message.text);
        if(message.type==='accept'){
          notifyaccept("accepted");
        }
        else if(message.type==='reject'){
          await channel[message.email].leave();
          await client.logout();
          notifyreject("rejected");
        }
        else if(message.type==='join'){
          notifyjoin();      
        }
    }
    const addButtonRef = (ref) => {
      btn.current.push(ref);
    };

  return (
    <div>
      <div style={{backgroundColor:'#F0F0F0', height: '100%',minHeight:'100vh'}}>
      <AppBar position="static" style={{ background: '#FFFFFF' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img src={process.env.PUBLIC_URL + '/logo.png'} style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto'}}/>
         </Typography>
        </Toolbar>
       </AppBar>
      
      <table className="table">
        <tbody>
          {
              doctors.map((doc, index)=> 
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:'5%',
               
              }}
            >
              <Box
                sx={{
                  width: '1000px',
                  height: '100px',
                  bgcolor: 'white',
                  borderRadius: '20px',
                  boxShadow: 20,
                  padding:'20px'
    
                }}
              >
              <thead>
        </thead>
                <td><PersonIcon sx={{fontSize:'50px'}}/></td>
                <td style={{margin:'50%',font:'bold',fontSize:'20px'}}>{doc.fname} {doc.lname}</td>
                <td style={{font:'bold',fontSize:'20px'}}>Type: {doc.type}</td>
                <td >{doc.gender}</td>
  
                
                <td>
               
                <Button ref={(ref)=>addButtonRef(ref)} style={{color:'black',backgroundColor:'#33DDFB',marginLeft:'500px'}} type="button"  onClick={()=>send(doc.email) }>Select</Button>                  
            
                </td>
            
              </Box> 
          </Box>   
              )
          }
        </tbody>
      </table>
    
        <ToastContainer/>
      </div>
    </div>
  )
}

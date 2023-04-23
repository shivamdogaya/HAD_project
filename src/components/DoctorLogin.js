import { useEffect, useState } from 'react';
import { TextField, Button, Link, AppBar, Toolbar, Typography ,Box} from '@mui/material';
import DoctorServices from '../services/DoctorServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from './Redux/store';
import { setdoctorLogin, setdoctorId, setdoctorEmail } from './Redux/DoctorSlice';
import { createChannel, createClient } from 'agora-rtm-react'

function DoctorLogin() {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password) {
        alert('Please enter both username and password');
        return;
      }
    // Handle login logic here
        let doctor = {
      email: formData.username,
      password : formData.password
     }
      DoctorServices.logindoctor(doctor).then((response) => {
     // console.log(typeof(response.data.doctorId));
     console.log(response);
      localStorage.setItem('doctorauthenticate', response.data.doctortoken);
         
            // set doctor authenticated or not
      let doctorAuthenticated = response.data.status;
        let doctorId = response.data.doctorId;
        let doctorEmail = response.data.doctorEmail;
    //    console.log(typeof(doctorId));
     //   console.log(doctorId);
     //   console.log(doctorAuthenticated);
      
      // dispatch actions to update state
       dispatch(setdoctorLogin(doctorAuthenticated));
       dispatch(setdoctorId(doctorId));
       dispatch(setdoctorEmail(doctorEmail));
       localStorage.setItem('doctorLogin', JSON.stringify(doctorAuthenticated));
       localStorage.setItem('doctorId', JSON.stringify(doctorId));
       localStorage.setItem('doctorEmail', JSON.stringify(doctorEmail));
             //    console.log(doctorId);
     //    console.log(isDoctorAuthenticated);
    
      
      navigate("/DoctorDashboard");
    })
      .catch((error) => {
        console.log(error);
            alert("Bad Credentials");
        setFormData({ username: '', password: '' });
      });

  };
  


  //    const isDoctorAuthenticated = useSelector((state) => state.doctor.doctorLogin);
  //  const doctorId = useSelector((state) => state.doctor.doctorId);

  //         console.log(doctorId);
  //       console.log(isDoctorAuthenticated);

  return (
    <div>
      <div style={{backgroundColor:'#F0F0F0',minHeight: '100vh',height:'100%'}}>
      <AppBar position="static" style={{ background: '#FFFFFF' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img  style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto' }} src='logo.png' alt='e-mantrana'></img>
         </Typography>
        </Toolbar>
       </AppBar>
       <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'5%'
          }}
        >
          <Box
            sx={{
              width: '40%',
              height: '600px',
              bgcolor: '#FFFFFF',
              borderRadius: '20px',
              boxShadow: 20,
        
            }}
          >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '5%', marginBottom: '30px' }}>
          <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' }}>
            Welcome!
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom style={{ color: 'black' }}>
            Please Login to Your Account
          </Typography>
          </div>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '2%', marginBottom: '30px' }} onSubmit={handleSubmit}>
        <TextField style={{ width: 400, marginRight: '80px', marginBottom: '30px',marginTop:'10px', margin: '30px', backgroundColor: 'white' }} label="Username" variant="outlined" name="username" value={formData.username} onChange={handleInputChange} margin="normal" />
          <TextField style={{ width: 400, marginRight: '80px', margin: '30px', backgroundColor: 'white' }} label="Password" variant="outlined" type="password" name="password" value={formData.password} onChange={handleInputChange} margin="normal" />
          <Button style={{ width: 120, height: 50, backgroundColor: '#33DDFB', margin: '20px', borderRadius: 25 ,color:'black'}} type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
          <Link style={{color:'black', margin: '0px' }} href="/DoctorForgotPassword" variant="body2">
            Forgot Password?
          </Link>
        </form>
        </Box>
        </Box>
        <Typography variant="body2" align="center" style={{ marginTop: '5%' }}>
      <h3 style={{color:'black'}}>Need help? Our support team is available 24/7 to assist you with any questions or issues you may have. Contact us at <a style={{color:'red'}} href="tel:6265161019">123-456-7890</a> or <a  style={{color:'red'}} href="shivamdogaya07@gmail.com">support@example.com</a>.</h3>
        </Typography>

      </div>
    </div>
  );
}

export default DoctorLogin;

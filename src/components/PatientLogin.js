import { useState } from 'react';
import { TextField, Button, Link, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PatientServices from '../services/PatientServices';
import { useDispatch, useSelector } from 'react-redux';
import store from './Redux/store';
import { setPatientId, setpatientLogin } from './Redux/PatientSlice';
import {Box} from '@mui/material';
function PatientLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });
  
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
    let patient = {
      phoneNumber: formData.username,
      password : formData.password
     }
    PatientServices.loginPatient(patient).then((response) => {
      console.log(response);
      localStorage.setItem('patientauthenticate', response.data.token);

        // set patient authenticated or not
      let patientAuthenticated = response.data.status;
        let patientId = response.data.patientId;
        console.log(typeof(patientId));
       
       
      
      // dispatch actions to update state
       dispatch(setpatientLogin(patientAuthenticated));
       dispatch(setPatientId(patientId));

       // store login status in localStorage
      localStorage.setItem('patientLogin', JSON.stringify(patientAuthenticated));
      localStorage.setItem('patientId', JSON.stringify(patientId))

      navigate("/PatientDashboard");
    })
      .catch((error) => {
        console.log(error);
            alert("Bad Credentials");
        setFormData({ username: '', password: '' });
      });
    // Handle login logic here

  };


  return (
    <div>
      <div style={{backgroundColor:'#F0F0F0',minHeight: '100vh',height:'100%'}}>
      <AppBar position="static" style={{ background: 'white' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img  style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto'}} src='logo.png' alt='e-mantrana'></img>
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
              bgcolor: 'white',
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
          <TextField style={{ width: 400, marginRight: '80px', marginBottom: '30px',marginTop:'10px' ,margin: '30px', backgroundColor: 'white' }} label="Username" variant="outlined" name="username" value={formData.username} onChange={handleInputChange} margin="normal" />
          <TextField style={{ width: 400, marginRight: '80px', margin: '30px', backgroundColor: 'white' }} label="Password" variant="outlined" type="password" name="password" value={formData.password} onChange={handleInputChange} margin="normal" />
          <div style={{display: 'flex', justifyContent: 'space-between',marginBottom:'20px'}}>
        <Button style={{height:'50px',width:'100px',margin:'15px', borderRadius: 25, backgroundColor: '#33DDFB',color:'black'}} type="submit" variant="contained" color="primary">
           <h4 >Sign In</h4>
        </Button>
        <Button onClick={()=>{navigate("/PatientRegistration")}} style={{height:'50px',width:'100px',margin:'15px', borderRadius: 25, backgroundColor: '#33DDFB',color:'black'}} type="submit" variant="contained" color="primary">
        <h4>Sign Up</h4>
        </Button>
        </div>
        <Link style={{ margin: '0px' ,color:'black'}} href='/VerifyForgotOtp' variant="body2"> 
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

export default PatientLogin;
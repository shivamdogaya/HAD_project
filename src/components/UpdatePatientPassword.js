import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';
import PatientServices from '../services/PatientServices';
import { useNavigate } from 'react-router-dom';

function PatientRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber:'',
    password:'',
    confirmPassword: ''
  });

  const [update, setUpdate] = useState({
    phoneNumber:'',
    password:''
  });

 // const handleFormChange = (e) => {
 //   const { id, value } = e.target;
 //   setFormData({ ...formData, [id]: value });
 // };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form input before submission
    if (!formData.phoneNumber || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }


    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const { confirmPassword, ...update } = formData;


    // Handle form submission here
    console.log('Submitted form:', update);

    PatientServices.updatePassword(update).then((response) => {
      console.log(response);
      navigate("/PatientLogin");
    })
      .catch((error) => {
        console.log(error);
      });

    // Reset form fields
    setFormData({
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div style={{background: ' linear-gradient(135deg, #FFA07A, #87CEFA)',minHeight: '100vh',height:'100%'}}>
      <form style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center', marginBottom:'80px' }} onSubmit={handleSubmit}>
    <AppBar position="static" style={{ background: 'black' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img  style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto'}}  src='logo.png' alt='e-mantrana'></img>
         </Typography>
        </Toolbar>
       </AppBar>
       <div className='header' style={{ display:'flex',justifyContent: 'center',color:'white',padding: 80}}><h1>PATIENT  REGISTRATION</h1></div>
      <div style={{ display: "flex", flexWrap:'wrap',flexDirection:'column', gap: '16px', justifyContent: 'center',alignItems:'center'}}>
        <div style={{ flex: "1 1 50%", marginBottom: '40px' }}>
          <TextField
            style={{ width: 400, marginRight: '80px', backgroundColor: '#faebd7' }}
            id="phoneNumber"
            label="Enter Mobile Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e)=> handleChange(e)}
          />
    </div>
    <div style={{ flex: "1 1 50%", marginBottom: '40px' }}>
          <TextField
            style={{ width: 400, marginRight: '80px', backgroundColor: '#faebd7' }}
            id="password"
            label="Enter Password"
            value={formData.password}
            onChange={(e)=> handleChange(e)}
          />
          <TextField
            style={{ width: 400, backgroundColor: '#faebd7' }}
            id="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e)=> handleChange(e)}
          />
        </div>
    </div>
<Button style={{width: 120,height:50,backgroundColor:'darkgray', borderRadius: 25 }} variant="contained" color="success" type="submit">
<h3 style={{color:'black'}}>SAVE</h3>
</Button>
</form>
<Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
      <h3 style={{color:'Darkgray'}}>Need help?Contact us at <a style={{color:'red'}} href="tel:6265161019">123-456-7890</a> or <a  style={{color:'red'}} href="shivamdogaya07@gmail.com">support@example.com</a>.</h3>
 </Typography>
</div>

  );
}
export default PatientRegistration;
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';
import PatientServices from '../services/PatientServices';
import { useNavigate } from 'react-router-dom';
import DoctorServices from '../services/DoctorServices';

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:''
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
    if (!formData.email) {
      alert('Please fill in all fields.');
      return;
    }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }





    // Handle form submission here
    console.log('Submitted form:', formData);
     
    DoctorServices.forgotpassword(formData).then((response) => {
      console.log(response);
      navigate("/DoctorLogin");
    })
      .catch((error) => {
        console.log(error);
      });

    // Reset form fields
    setFormData({
      email: ''
    });
  };

  return (
    <div style={{background: ' linear-gradient(135deg, #FFA07A, #87CEFA)',minHeight: '100vh',height:'100%'}}>
    <form style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center', marginBottom:'80px' }} onSubmit={handleSubmit}>
    <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img  style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto'}}  src='logo.png' alt='e-mantrana'></img>
         </Typography>
        </Toolbar>
       </AppBar>
       <div className='header' style={{ display:'flex',justifyContent: 'center',color:'white',padding: 80}}><h1>ENTER E-MAIL</h1></div>
      <div style={{ display: "flex", flexWrap:'wrap',flexDirection:'column', gap: '16px', justifyContent: 'center',alignItems:'center'}}>
        <div style={{ flex: "1 1 50%", marginBottom: '40px' }}>
          <TextField
            style={{ width: 400, marginRight: '80px', backgroundColor: '#faebd7' }}
            id="email"
            label="Enter Email"
            type="tel"
            value={formData.email}
            onChange={(e)=> handleChange(e)}
          />
    </div>
    </div>
<Button style={{width: 120,height:50,backgroundColor:'darkgray', borderRadius: 25 }} variant="contained" color="success" type="submit">
<h3 style={{color:'black'}}>Save</h3>
</Button>
</form>
</div>

  );
}
export default ForgotPassword;
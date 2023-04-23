import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem,Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Footer from './Footer';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%',
    backgroundColor: 'lightgrey',
    color: 'black',
    fontSize: '1rem',
    fontWeight: 'bold',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    marginBottom:'5%'
    
  },
  info: {
    position: 'absolute',
    right: '-100%',
    top: '50%',
    transform: 'translateY(-50%)',
    whiteSpace: 'nowrap',
    animationName: 'move',
    animationDuration: '20s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
};

const keyframes = `
@keyframes move {
  from {
    right: -100%;
  }
  to {
    right: 100%;
  }
}
`;



const options = [
  { label: 'Skin & Hair', value: 'Skin & Hair' },
  { label: 'Dental Care', value: 'Dental Care' },
  { label: 'Bones & Joints', value: 'Bones & Joints' },
  { label: 'Sexual Health', value: 'Sexual Health' },
  { label: 'Child Specialist', value: 'Child Specialist' },
  { label: 'Cancer', value: 'Cancer' },
  { label: 'Kidney Issues', value: 'Kidney Issues' },
  { label: 'Heart', value: 'Heart' },
  { label: 'Lungs & Breathing', value: 'Lungs & Breathing' },
  { label: 'Eye Specialist', value: 'Eye Specialist' },
  { label: 'Diabetes', value: 'Diabetes' },
  { label: 'Urinary Issues', value: 'Urinary Issues' },
  { label: 'Ear, Nose, Throat', value: 'Ear, Nose, Throat' },
  { label: 'Digestive Issues', value: 'Digestive Issues' }
];

const PatientDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const logoStyles = {
    maxWidth: '100%',
    height: 'auto',
    '@media (max-width: 600px)': {
      maxWidth: '80%',
    },
  };

  const [special,setSpecial] = useState(false);
  const [info, setInfo] = useState('Emantrana is on a mission to make quality healthcare affordable and accessible. We believe in empowering our users with the most accurate, comprehensive, and curated information and care, enabling them to make better healthcare decisions.');

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleButtonClick = () => {
    navigate('/patient/getall',{state:selectedOption.value});
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGeneralOPD = () => {
    navigate('/patient/getall',{state:'General'});
  }

  const handleLogoutClick = () => {
    console.log('redirect to login page');
  }
  const handleUploadHealthRecordClick = () => {
    // navigate to view/edit profile page
    navigate('/health-record');
  };
  const handleViewEditProfileClick = () => {
    // navigate to view/edit profile page
    navigate('/updatePatientProfile');
  };
  const handlePrescriptionClick = () => {
    // navigate to view/edit profile page
    navigate('/edit-profile');
  };
  const handleViewRecords = () => {
    // navigate to view/edit profile page
    navigate('/MedicalList');
  };
  const handleSpecializedOPD = ()=>{
    setSpecial(true);
  }
  return (
    <div style={{ backgroundColor:'#F0F0F0',position:'relative',minHeight:'100vh',height:'100%' }} >

      <AppBar position="static" sx={{ background: 'white' }}>
        <Toolbar >
          <IconButton
            edge="start"
            color="black"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={open}
            onClose={handleClose}
            sx={{ mr: 2 }}
          >
            <MenuItem style={{ height: '100px', width: '200px' }} onClick={handleUploadHealthRecordClick}>Upload Health Records</MenuItem>
            <MenuItem style={{ height: '100px', width: '200px' }} onClick={handleViewEditProfileClick}>View/Edit Profile</MenuItem>
            <MenuItem style={{ height: '100px', width: '200px' }} onClick={handlePrescriptionClick}>Prescription</MenuItem>
            <MenuItem style={{ height: '100px', width: '200px' }} onClick={handleViewRecords}>View Medical Records</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="logo.png" alt="e-mantrana" style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto', logoStyles }} />
          </Typography>
          <Button style={{color:'black',backgroundColor:'lightgrey'}} onClick={handleLogoutClick}>LogOut</Button>
        </Toolbar>
      </AppBar>
      <div style={styles.header}>
        <style>{keyframes}</style>
        <div style={styles.info}>{info}</div>
      </div>
      <Grid container justifyContent="center">
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft:'50%'
          }}
        >
          <Box
            sx={{
              width: '800px',
              height: '300px',
              bgcolor: 'white',
              borderRadius: '20px',
              boxShadow: 20,
             
            }}
          >
          <Typography variant="h4" component="h2" gutterBottom style={{ color: 'black',margin:'2%',fontSize:'130%' }}>
          GENERAL OPD:
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom style={{ color: 'black',margin:'2%',fontSize:'110%'  }}>
          If u want to connect to a general Doctor(MBBS) for consultation related to some general disease.please select the GENERAL OPD button and proceed further
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom style={{ color: 'black',margin:'2%',fontSize:'110%' }}>
          SPECIALIZED OPD:
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom style={{ color: 'black',margin:'2%',fontSize:'110%'  }}>
          If u want to connect to a specialized Doctor(MD) for consultation related to some specific disease(ex.neurology,gynacology,etc) .please select the Specialized OPD button and proceed further
          </Typography>
           </Box>
            </Box>
     
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight:'50%',
          }}
        >
           <Box
            sx={{
              width: '800px',
              height: '300px',
              bgcolor: 'white',
              borderRadius: '20px',
              boxShadow: 20,
            }}
          >
        <Grid item xs={12} sm={6} md={4}>
          <Button
            style={{ width: '500px',marginTop:'40%', marginBottom: '5%', height: '50px', backgroundColor: '#33DDFB', borderRadius: '25px',marginLeft:'50%' }}
            variant="contained"
            color="success"
            type="submit"
            onClick={handleGeneralOPD}
          >
            <h3 style={{ color: 'black' }}>GENERAL OPD</h3>
          </Button>
          {(special===false)?
          <Button
            style={{ width: '500px', marginBottom: '5%', height: '50px', backgroundColor: '#33DDFB', borderRadius: '25px',marginLeft:'50%' }}
            variant="contained"
            color="success"
            type="submit"
            onClick={handleSpecializedOPD}
          >
            <h3 style={{ color: 'black' }}>Specialized OPD</h3>
          </Button>
          :<>
          <div  style={{ width: '500px', marginLeft: '50%', marginBottom: '5%', marginTop: '2%', height: '50px'}} >
          <Select  options={options} value={selectedOption} onChange={handleChange} placeholder='Select Speciality...' />
          </div>
          <Button
            style={{ width: '500px', marginLeft: '50%', marginBottom: '5%', marginTop: '2%', height: '50px', backgroundColor: '#33DDFB', borderRadius: '25px' }}
            variant="contained"
            color="success"
            type="submit"
            onClick={handleButtonClick}
          >
            <h3 style={{ color: 'black' }}>Specialized OPD</h3>
          </Button>
       
          </>}

        </Grid>
        </Box>
        </Box>
      </Grid>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '5%', marginBottom: '30px' }}>
          <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' ,fontSize:'150%'}}>
         HOW IT WORKS:
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom style={{ color: 'black' ,marginTop:'3%',fontSize:'120%'}}>
         <PersonOutlineOutlinedIcon /> Select a speciality----< VideoCameraBackIcon/> Audio/ video call-----< MedicationOutlinedIcon/>Get a digital prescription
         </Typography>
        </div>
       
     <Footer />
      </div>

  )
}

export default PatientDashboard;


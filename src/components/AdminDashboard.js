import React from 'react'
import { Link } from 'react-router-dom'
import DoctoPop from './DoctoPop';
import { Button,Box } from '@mui/material';
import Header from './Header';
function AdminDashboard() {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <div style={{backgroundColor:'#F0F0F0',minHeight: '100vh',height:'100%'}}>
      <Header />
      {isOpen?<DoctoPop status={isOpen} hide={hideModal}/>:""}
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'2%'
          }}
        >
          <Box
            sx={{
              width: '50%',
              height: '800px',
              bgcolor: 'white',
              borderRadius: '20px',
              boxShadow: 20,
        
            }}
          >
          <div style={{ display: 'flex', flexDirection:'column', alignItems:'center',marginTop:'5%'}} >
        
            <div >
             <Button style={{width:400 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success"  component={Link} to='/DoctorReg'>Add Doctor</Button> 
            </div>
        
            <div >
              <Button style={{width:400 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success"  onClick={showModal}>Fetch Doctor</Button>
            </div>
         
            <div >
              <Button style={{width:400 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success" >Update Doctor</Button>
            </div>
         
            <div >
              <Button style={{width:400 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success">Delete Doctor</Button>
            </div>
         
            <div >
              <Button style={{width:400 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success" >Fetch Patients</Button>
            </div>
         
      </div>
      </Box>
      </Box>
    </div>
  )
}
export default AdminDashboard;
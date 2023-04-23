import React, { useEffect, useState } from 'react'
import PatientServices from '../services/PatientServices';
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const MedicalRecords = () => {
    
    const [imageSrc, setImageSrc] = useState([]);
    const [enlargedSrc, setEnlargedSrc] = useState(null);
    let jwt=null;
            jwt=localStorage.getItem('patientauthenticate');
            jwt="Bearer "+jwt;
            const config = {
            headers:{
                'Authorization':jwt
            }
            };
    const fetchData = async () => {
        try {
             
            const response = await PatientServices.getImageName(config);
       //     console.log(response.data);
            response.data.map((e) => {
             //   console.log(e);
                let url = "assests/" + e;
             //  console.log(url);
                setImageSrc(current => [...current, url]);
                    
            })
        }
        catch (error) { 
            console.log(error);
        }
    };
    const deleteImg=(e)=>{
        let imgname=e.substr(8);
        console.log(imgname);
    PatientServices.deleteImage(config,imgname).then((response) => {
      console.log(response);
      let l=[...imageSrc]
      let filterL=l.filter(function(elem) { return elem !== e })
      setImageSrc(filterL)

    })
      .catch((error) => {
        console.log(error);
      });

    }
    useEffect(() => {
        
        fetchData();
        
    }, []);
    
    console.log(imageSrc);
    return (

      <>
            <div style={{background: ' linear-gradient(135deg, #FFA07A, #87CEFA)', height: '100%',minHeight:'100vh'}}>
          <h1 style={{ display: 'flex', justifyContent: 'center', margin: '0px' }}>MEDICAL RECORDS</h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Stack spacing={2} style={{ width: '70%' }}>
              {imageSrc.map((e) => (
    
             <div
            
            style={{
              border: '1px solid black',
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor:'lightgray',
              marginTop:'2%'}}>
              
            
          <img  style={{ width: '40%', height: '200px' }} src={e} alt=""/>
    
     <Button  style={{ marginRight:'20%', width: '10%',height:'30%',backgroundColor:'black',color:'white'}} variant="contained" onClick={()=>{deleteImg(e)}}>
        Delete
      </Button>
      
          
    </div>
  ))}
              </Stack>
     </div>       
    </div>     
</>

  )
}

export default MedicalRecords
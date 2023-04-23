import axios from "axios";

const BASE_URL = "http://localhost:8000/patient/register";

class DoctorService {
    logindoctor(doctor) {
        return axios.post("http://localhost:8000/doctor/login", doctor);
    }
    
    forgotpassword(doctor) {
        return axios.post("http://localhost:8000/doctor/forgot_password", doctor);
    }
    updatepassword(doctr) {
        return axios.patch("http://localhost:8000/doctor/reset_password", doctr);
   }
   addToQueue(data, config){
        return axios.post("http://localhost:8000/doctor/add_to_queue", data, config);
   }
   getQueue(id, config){
        return axios.get(`http://localhost:8000/doctor/get_queue/${id}`, config);
   }

   deleteQueue(id, config){
        return axios.delete(`http://localhost:8000/doctor/delete_doctor/${id}`, config);
   }

   addPrescription(data, config){
        return axios.post("http://localhost:8000/doctor/uploadprescription", data, config);
   }
   
}

export default new DoctorService();

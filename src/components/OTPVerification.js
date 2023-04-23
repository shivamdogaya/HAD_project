import React from 'react'
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import OtpInput from 'otp-input-react';
//import OtpInput from 'otp-input-react';
import { useState } from 'react';
import {CgSpinner} from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
const OTPVerification = () => {
   
    const [otp,setOtp] = useState("");
    const [ph,setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
   
         function onCaptchVerify(){
          if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
              'size': 'invisible',
              'callback': (response) => {
                onSignup()
              },
              'expired-callback': () => {}
            }, auth);
          }
         }
   
         function onSignup(){
          setLoading(true)
          onCaptchVerify()
   
          const appVerifier = window.recaptchaVerifier
          const formatph = '+' + ph
          signInWithPhoneNumber(auth, formatph, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
   
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success('OTP sent successfully!');
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
         
          setLoading(false);
        });
         }
   
         
         function onOTPVerify(){
          setLoading(true);
          window.confirmationResult.confirm(otp).then(async(res)=>{
            console.log(res);
            setUser(res.user);
            navigate("/PatientRegistration");
            setLoading(false);
          }).catch(err=>{
            console.log(err);
            setLoading(false);
          })
         }
   

  return (
<>
     <section className='bg-emerald-500 flex items-center justify-center h-screen'>
           <div>
            <Toaster toastOptions={{duration: 4000}} />
            <div id='recaptcha-container'></div>
            {    
              user ?       (      <h2 className='text-center text-white font-medium text-2xl'>
              Login Success
          </h2>   ) :   (
           
            <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
              <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>
                Patient OTP VERIFICATION
              </h1>

           { showOTP ?
           <>
             <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                 <BsFillShieldLockFill size={30} />
             </div>
             <label htmlFor="otp" className='font-bold text-xl text-white text-center'>
              Enter your OTP
             </label>
             <OtpInput value={otp} onChange={setOtp} OTPLength = {6} otpType="number" disabled={false} autoFocus className='opt-container '></OtpInput>
             <button onClick={onOTPVerify} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
              {
                loading &&  <CgSpinner size={20} className='mt-1 animate-spin'/>
              }
             
              <span>Verify OTP</span>
             </button>
             </> :
             
             

             <>
             <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                 <BsTelephoneFill size={30} />
             </div>
             <label htmlFor="" className='font-bold text-xl text-white text-center'>
              Verify your phone number
             </label>
            <PhoneInput country={'in'} value={ph} onChange={setPh} className='' ></PhoneInput> 
             <button onClick={onSignup} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
              {
                loading &&  <CgSpinner size={20} className='mt-1 animate-spin'/>
              }
             
              <span>Send code via SMS</span>
             </button>
             </>

}

            </div>
          )
            }

           </div>
     </section>
     </>
  )
}

export default OTPVerification
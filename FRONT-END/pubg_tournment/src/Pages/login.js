import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'

import ErrorModel from '../UIElements/Error';
import firebase from './firebase.js';
import Card from '../UIElements/Card'
import LoadingSpinner from '../UIElements/LoadingSpinner'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../FormElements/validater'
import Input from '../FormElements/Input'
import Button from '../FormElements/Button'
import {useForm} from '../Hook/Form-hook'
import {useHttpClient} from '../Hook/Http-Hook'
import './login.css'
import { auth } from 'firebase';

const Login=props=>{
    const [isLoading1,setLoading1]=useState(false);
    const {isLoading,error,sendRequest,clearError}=useHttpClient();
    const [otp,setotp]=useState(null);
    const [error1,seterror]=useState();
    const history=useHistory();
    const [formstate,inputHandler,setFormData]=useForm(
        {
        phone:{
            value:'',
            isValid:false
        },
        otp:undefined
        },false);

  const sendOTP=async (event)=>{
      event.preventDefault();
      setLoading1(true);
      setFormData({
          ...formstate.inputs,
          phone:{
              ...formstate.inputs.phone,
              isValid:false
          }
      })
    //   try{
    // var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha',{
    //     size:"invisible",
    //     callback:function (response){
    //         console.log("captcha resolved");
    //     }
    // });
    // var number = '+91'+formstate.inputs.phone.value;
    // firebase.auth().signInWithPhoneNumber(number,recaptcha).then( function(e) {
    //     setotp(e);
    //     setLoading1(false);
    //   })
    //   .catch(function (error) {
    //       seterror("Your internet seems to be slow or Your number is blocked due to too many request, Try again after sometime");
    //       setLoading1(false);
    //   });
    // }catch(err){
    //     setLoading1(false);
    //     seterror("Try again")
    // }



    try {
        console.log("sender "+JSON.stringify({
            phonenumber:'+91'+formstate.inputs.phone.value
        }));
        const responseData= await fetch(`http://localhost:5000/JAI_PUBG/Login`,{
            method: 'POST',
            headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({
            phonenumber:'+91'+formstate.inputs.phone.value
        })});
         //responese handling
         console.log("response is happened");
         const data=responseData.json();
         console.log('response is '+data.Users.phonenumber);
       } catch (err) {
           console.log('error maccha'+err.message);
       }
       setLoading1(false)



    
  }

  const verifyOTP=(event)=>{
    event.preventDefault();
    setLoading1(false);
    otp.confirm(formstate.inputs.otp.value).then(async function (result) {
        
        //send post to backend
        try {
            console.log("sender "+JSON.stringify({
                phonenumber:'+91'+formstate.inputs.phone.value
            }));
            const response= await fetch(`http://localhost:5000/JAI_PUBG/Login`,{
                method: 'POST',
                headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                phonenumber:'+91'+formstate.inputs.phone.value
            })});
             //responese handling
             console.log("response is happened");
            const data=await response.json();
             console.log('response is '+data.phonenumber);
           } catch (err) {
               console.log('error maccha'+err.message);
           }
        //auth.LOGIN(UserID,Phone,Players)

        console.log(result.user);
        history.push('/');
     }).catch(function (error) {
        console.error( error);
        seterror("OTP verification failed");
    });
    setLoading1(false);
  }

    return(
    <React.Fragment>    

    {error1 && <ErrorModel error={error1} onClear={()=>{seterror()}}/>}
    <ErrorModel error={error} onClear={clearError}/>
    {isLoading && <LoadingSpinner asOverlay/>}
    <Card className="authentication">
        
    {isLoading1 && <LoadingSpinner asOverlay/>}
        <h2 className="authentication__header">Continue with your phone</h2>
        <form >
            <Input
                element='input'
                id="phone"
                type="phone"
                label='Enter your valid phone number'
                value=''
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(6)]}
                errorText="Please fill this with valid number"
                onInput={inputHandler}
            />    
            <Button 
                type="submit" 
                onClick={sendOTP}
                disabled={!formstate.isValid}>
                     SEND OTP
            </Button>
            
         <div id="recaptcha"></div>
        </form>
        {!!otp && <form>
            <Input
                element='input'
                id="otp"
                type="text"
                label='Enter OTP you have recieved'
                value=''
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(6)]}
                errorText="Enter the OTP"
                onInput={inputHandler}
            />    
            <Button 
                type="submit" 
                onClick={verifyOTP}>
                     Verify
            </Button>
            
         <div id="recaptcha"></div>
        </form>}
    </Card>
    </React.Fragment>
    )
}

export default Login;

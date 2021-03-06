import React,{useContext, useState} from 'react';
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
import './login.css';
import { AuthContext } from '../context/AuthContext';
// import {auth} from './firebase'

const Login=props=>{
    const [isLoading1,setLoading1]=useState(false);
    const {isLoading,error,sendRequest,clearError}=useHttpClient();
    const [otp,setotp]=useState(null);
    const [error1,seterror]=useState();
    const history=useHistory();
    const authentication=useContext(AuthContext)
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
      try{
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha',{
        size:"invisible",
        callback:function (response){
            console.log("captcha resolved");
        }
    });
    var number = '+91'+formstate.inputs.phone.value;
    firebase.auth().signInWithPhoneNumber(number,recaptcha).then( function(e) {
        setotp(e);
        setLoading1(false);
      })
      .catch(function (error) {
          seterror("Your internet seems to be slow or Your number is blocked due to too many request, Try again after sometime"+error.message);
          setLoading1(false);
      });
    }catch(err){
        setLoading1(false);
        seterror("Try again")
    }


    

    setLoading1(false);
    




    
  }

  const verifyOTP=(event)=>{
    event.preventDefault();
    setLoading1(false);
    otp.confirm(formstate.inputs.otp.value).then(async function (result) {
        
        //send post to backend
        let data;
        try {
            console.log("sender "+JSON.stringify({
                phonenumber:'+91'+formstate.inputs.phone.value
            }));
            data= await sendRequest(`http://localhost:5000/JAI_PUBG/Login`,'POST',{'Content-Type':'application/json'},JSON.stringify({
                phonenumber:'+91'+formstate.inputs.phone.value
            }));
             authentication.LOGIN(data.Users._id,data.Users.phonenumber,data.Users.players)
           } catch (err) {
               console.log('error maccha'+err.message);
           }
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
    {error && <ErrorModel error={error} onClear={clearError}/>}
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

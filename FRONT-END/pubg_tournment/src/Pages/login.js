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
import './login.css'

const Login=props=>{
    const [isLoading,setLoading]=useState(false);
    const [otp,setotp]=useState(null);
    const [error,seterror]=useState();
    const history=useHistory();
    const [formstate,inputHandler,setFormData]=useForm(
        {
        phone:{
            value:'',
            isValid:false
        },
        otp:undefined
        },false);

  const sendOTP=(event)=>{
      event.preventDefault();
      setLoading(true);
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
        setLoading(false);
      })
      .catch(function (error) {
          seterror("Your internet seems to be slow or Your number is blocked due to too many request, Try again after sometime");
          setLoading(false);
      });
    }catch(err){
        setLoading(false);
        seterror("Try again")
    }
    
  }

  const verifyOTP=(event)=>{
    event.preventDefault();
    setLoading(false);
    otp.confirm(formstate.inputs.otp.value).then(function (result) {
        console.log(result.user);
        history.push('/');
     }).catch(function (error) {
        console.error( error);
        seterror("OTP verification failed");
    });
    setLoading(false);
  }

    return(
    <React.Fragment>    

    {error && <ErrorModel error={error} onClear={()=>{seterror()}}/>}
    <Card className="authentication">
        
    {isLoading && <LoadingSpinner asOverlay/>}
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
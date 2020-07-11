import React from 'react'
import {useHistory} from 'react-router-dom'

import ErrorModel from '../UIElements/Error';
import firebase from './firebase.js';
import Card from '../UIElements/Card'
import LoadingSpinner from '../UIElements/LoadingSpinner'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../FormElements/validater'
import Input from '../FormElements/Input'
import Button from '../FormElements/Button'
import {useForm} from '../Hook/Form-hook'

const Signup=props=>{
  return(
    <React.Fragment>
      
      <Card className="authentication">
        <form className="form-control">
        <Input
                element='input'
                id="name"
                type="text"
                label='Enter your name as per PUBG account'
                value=''
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please fill this "
                //onInput={inputHandler}
            />   
        </form>
      </Card>

    </React.Fragment>
  );
}

export default Signup;
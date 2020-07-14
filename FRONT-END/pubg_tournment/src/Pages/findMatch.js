import React, { useState } from 'react'
import Select from 'react-select'
import {useHistory} from 'react-router-dom'

import './findMatch.css'
import Input from '../FormElements/Input'
import {VALIDATOR_REQUIRE} from '../FormElements/validater'
import Card from '../UIElements/Card'
import Button from '../FormElements/Button'
import {useForm} from '../Hook/Form-hook'

import GPayButton from 'react-google-pay-button'

const Signup=props=>{

  const options=[
    {value:'1',label:'One'},
    {value:'2',label:'Two'},
    {value:'3',label:'Three'},
    {value:'4',label:'Four'}
  ];

  const history=useHistory();

  const [selected,setSelected]=useState(null);
  const [localStoring,setLoacalStoring]=useState(false)
  const [formstate,inputHandler]=useForm(
    {
    first:undefined,
    second:undefined,
    third:undefined,
    fourth:undefined
    },false);
  
  const handleSelection=(selectedValue)=>{
    setSelected(selectedValue.value);
  }

  const submitHandler=event=>{
    event.preventDefault();
    setLoacalStoring(true)
    console.log(formstate.inputs);//send selected also
    //backend
    
  }

//GPay code
const loadPaymentDataHandler = paymentData => {
  console.log('App.loadPaymentDataHandler: paymentData', paymentData)
  // const paymentToken = paymentData.paymentMethodData.tokenizationData.token
}

const paymentAuthorizedHandler = paymentData => {
  console.log('App.paymentAuthorizedHandler: paymentData', paymentData)
  // const paymentToken = paymentData.paymentMethodData.tokenizationData.token
  // TODO execute payment
}

const onUserCanceledHandler = paymentRequest => {
  console.log('App.onUserCanceledHandler: paymentRequest', paymentRequest)
}

const paymentDataChangedHandler = paymentData => {
  console.log('App.paymentDataChangedHandler: paymentData', paymentData)
}




  return(
    <React.Fragment>
      
      
        <form className="selector">
          <Select
           theme={theme => ({
            ...theme,
            borderRadius: 10,
            colors: {
              ...theme.colors,
              primary25: 'lightblue',
              primary: 'black',
            },
          })}
          placeholder="Select the number of players,you want to REGISTER"
          defaultValue={selected}
          onChange={handleSelection}
          options={options}/>
        </form>

          {selected && <Card className="authentication">
            <form>
              {selected>0 && <Input
               id="first"
               type="text"
               label='Enter First player name as per PUBG'
               value=''
               element='input'
               validators={[VALIDATOR_REQUIRE()]}
               errorText="Enter the field as per PUBG account, otherwise you won't allow for match"
               onInput={inputHandler}/>}

              {selected>1 && <Input
               id="second"
               type="text"
               element='input'
               label='Enter Second player name as per PUBG'
               value=''
               validators={[VALIDATOR_REQUIRE()]}
               errorText="Enter the field as per PUBG account, otherwise you won't allow for match"
               onInput={inputHandler}/>}

               {selected>2 && <Input
                id="third"
                element='input'
                type="text"
                label='Enter Third player name as per PUBG'
                value=''
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter the field as per PUBG account, otherwise you won't allow for match"
                onInput={inputHandler}/>}

                {selected>3 && <Input
                 id="fourth"
                 type="text"
                 element='input'
                 label='Enter Fourth player name as per PUBG'
                 value=''
                 validators={[VALIDATOR_REQUIRE()]}
                 errorText="Enter the field as per PUBG account, otherwise you won't allow for match"
                 onInput={inputHandler}/>}
                 
                 <Button
                 type="submit"
                 onClick={submitHandler}
                 disabled={!formstate.isValid}>
                    JAI PUBG
                 </Button>
            </form>
            </Card>}
            {localStoring &&
               <Card className="authentication">
                    <GPayButton
                      defaultValue={"Click here to Payment"}
                      totalPriceStatus={'FINAL'}
                      totalPrice={'1.45'}
                      currencyCode={'GBP'}
                      countryCode={'GB'}
                      development={true}
                      onLoadPaymentData={loadPaymentDataHandler}
                      onPaymentAuthorized={paymentAuthorizedHandler}
                      onUserCanceled={onUserCanceledHandler}
                    />
                  
                  </Card>
                }
   </React.Fragment>
  );
}

export default Signup;
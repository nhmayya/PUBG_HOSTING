import React, { useContext, useState,useEffect } from 'react'
import Select from 'react-select'
import { StickyContainer, Sticky } from 'react-sticky';

import './findMatch.css'
import Input from '../FormElements/Input'
import {VALIDATOR_REQUIRE} from '../FormElements/validater'
import Card from '../UIElements/Card'
import Button from '../FormElements/Button'
import {useForm} from '../Hook/Form-hook'
import {AuthContext} from '../context/AuthContext'
import {useHttpClient} from '../Hook/Http-Hook'
import { Link, useHistory } from 'react-router-dom'
import LoadingSpinner from '../UIElements/LoadingSpinner'
import ErrorModal from '../UIElements/Error'

// import GPayButton from 'react-google-pay-button'

const Signup=props=>{
  const history=useHistory();
  const auth=useContext(AuthContext);
  const {isLoading,error,sendRequest,clearError}=useHttpClient();

  
  const [optionsFine,setOPtionsFine]=useState([]);

  const [RRselected,setRRselected]=useState(false);
  const [AVAIL, setAVAIL] = useState();
  const [emptySEAT,setemptySEAT]=useState(false)

  useEffect(() => {
    const send = async () => {
      // document.body.style.backgroundImage="url('https://www.hdwallpapers.in/download/alan_walker_a_ap_rocky_live_fast_pubg_4k-3840x2160.jpg')";
      // document.body.style.backgroundRepeat='no-repeat';
      // document.body.style.backgroundSize='cover';
      
      if(auth.isLogedIn)
      try {
        const options=[
          {value:'1',label:'One'},
          {value:'2',label:'Two'},
          {value:'3',label:'Three'},
          {value:'4',label:'Four'}
        ];
       const responseData= await sendRequest(`http://localhost:5000/JAI_PUBG/${auth.UserId}/SEAT`);
        console.log("response for seat is"+responseData.SEAT);
        setAVAIL(responseData.SEAT);
        console.log('avail is '+AVAIL);
        if(AVAIL===0 ) setemptySEAT(true)
        else if(AVAIL===2){//1-3,2-2,3-1
          if(auth.Players.length>AVAIL){
            setOPtionsFine(options.slice(0,4-(auth.Players.length)));
          }
          else{
            setOPtionsFine(options.slice(0,AVAIL));
          }
        }
      
        else if(AVAIL===1)  setOPtionsFine(options.slice(0,AVAIL));
        else setOPtionsFine(options.slice(0,4-(auth.Players.length)));
    }
       catch (err) {console.log(err);}
    };
    send();

  }, [sendRequest,auth.UserId,AVAIL,auth.Players.length,auth.isLogedIn]);

 
  

  const [selected,setSelected]=useState(0);
  const [formstate,inputHandler]=useForm(
    {
    first:undefined,
    second:undefined,
    third:undefined,
    fourth:undefined
    },false);
  
  const handleSelection=(selectedValue)=>{
    setSelected(selectedValue.value);
    if(selectedValue.value===2){

    }
  }

  const submitHandler=async (event)=>{
    event.preventDefault();
    // setLoacalStoring(true);
    console.log(formstate.inputs.first+' is from state and selected'+selected);
    var PArray=[formstate.inputs.first.value];
    
     try{if(selected>1) PArray.push(formstate.inputs.second.value);
     else if(selected>2) PArray.push(formstate.inputs.third.value);
     else PArray.push(formstate.inputs.fourth.value) }catch(err){}
    
    // const formData=new FormData();
    //   formData.append('phonenumber',auth.Phone);
    //   formData.append('players',PArray);
    //   formData.append('uid',auth.UserID)

    const formData=JSON.stringify({
      phonenumber:auth.Phone,
      players:PArray,
     uid:auth.UserId 

  })
      console.log('form data'+formData);
    try {
      const responseData= await sendRequest(`http://localhost:5000/JAI_PUBG/Register`,'POST',{'Content-Type':'application/json'},formData);
       //responese handling
       console.log(responseData.Users.phonenumber+'\n'+responseData.Users._id+'\n'+responseData.Users.players+' is response of register');
       auth.LOGIN(responseData.Users._id,responseData.Users.phonenumber,responseData.Users.players)
       history.push('/room')
     } catch (err) {}
    
  }

//GPay code
// const loadPaymentDataHandler = paymentData => {
//   console.log('App.loadPaymentDataHandler: paymentData', paymentData)
//   // const paymentToken = paymentData.paymentMethodData.tokenizationData.token
// }

// const paymentAuthorizedHandler = paymentData => {
//   console.log('App.paymentAuthorizedHandler: paymentData', paymentData)
//   // const paymentToken = paymentData.paymentMethodData.tokenizationData.token
//   // TODO execute payment
// }

// const onUserCanceledHandler = paymentRequest => {
//   console.log('App.onUserCanceledHandler: paymentRequest', paymentRequest)
// }

// const paymentDataChangedHandler = paymentData => {
//   console.log('App.paymentDataChangedHandler: paymentData', paymentData)
// }




  return(
    <React.Fragment>

      <ErrorModal error={error} onClear={clearError} />
      
      {isLoading && <LoadingSpinner asOverlay/>
       }
      
            {/* if Not loged in back to login page */}
            {!auth.isLogedIn && !isLoading &&
            <Card className="authentication">
              <h1 className="authentication__header"> YOU ARE NOT LOGED IN</h1>
            <Link to='/login'>
              <Button>Click here</Button>
              </Link>
              </Card>
            }

            {auth.isLogedIn && !isLoading
             && auth.Players.length===4 
            && <Card className="authentication">
              <h1 className="authentication__header"> YOU ALREADY REGISTERED MAX SEAT</h1>
              <hr/>
              <Button to='/room' primary>Click here for ROOM ID</Button>
              {/* add imogy */}
              </Card>}

            {/* SELECT PLAYERS */}
        {!isLoading && auth.isLogedIn && emptySEAT &&  <Card className="authentication">
              <h1 className="authentication__header"> ALL SEATS ARE SALED</h1>
              {/* add imogy */}
              </Card>}
        
        {!isLoading && auth.isLogedIn && !emptySEAT && auth.Players.length!==4 && <form className="selector">
          <div><Select
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
          options={optionsFine}/>
           
           
           {auth.Players.length>0 &&<StickyContainer>
       
        <Sticky>
        {({
            style,
 
            // // the following are also available but unused in this example
           isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight
          }) => (
            <Button to='/room' exact='true'>ROOM ID</Button>
          )}
           </Sticky>
        </StickyContainer>}
         </div>
        </form>}
          
          {selected && 
          <h1>You have to pay {selected * 10}₹ </h1>}
          {selected && <Card className="authentication">
            <form className="authentication">
              {selected>0 && <Input
               id="first"
               type="text"
               label='Enter First player name as per PUBG'
               value=''
               element='input'
               validators={[VALIDATOR_REQUIRE()]}
               errorText="Enter the field as per PUBG account, otherwise you won't allow for match"
               onInput={inputHandler}/> }

               

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
                onInput={inputHandler}/> }

               

                {selected>3 && <Input
                 id="fourth"
                 type="text"
                 element='input'
                 label='Enter Fourth player name as per PUBG'
                 value=''
                 validators={[VALIDATOR_REQUIRE()]}
                 errorText="Enter the field as per PUBG account, otherwise you won't allow for match"
                 onInput={inputHandler}/>}

                <hr/>
                <label>
                 <input type="checkbox"  onChange={()=>{setRRselected(!RRselected)}}/>
                 By clicking this u r dead
                 </label>
                 <hr/>

                 <Button
                 type="submit"
                 onClick={submitHandler}
                 disabled={!RRselected || !formstate.isValid}>
                    JAI PUBG
                 </Button>
            </form>
             </Card>
          }
            {/* {localStoring &&
               <Card className="authentication">
                    <GPayButton
       fi               totalPriceStatus={'FINAL'}
                      totalPrice={'1.45'}
                      currencyCode={'GBP'}
                      countryCode={'GB'}
                      development={true}
                      onLoadPaymentData={loadPaymentDataHandler}
                      onPaymentAuthorized={paymentAuthorizedHandler}
                      onUserCanceled={onUserCanceledHandler}
                    />
                  
                  </Card>
                } */}
   </React.Fragment>
  );
}

export default Signup;
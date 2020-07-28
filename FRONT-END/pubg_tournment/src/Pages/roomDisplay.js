import React,{useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import Button from '../FormElements/Button';
import { useHttpClient } from '../Hook/Http-Hook';
import Card from '../UIElements/Card';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const Display=props=>{
    const [id,setId]=useState(null);
    const {isLoading,error,sendRequest}=useHttpClient();
    const auth=useContext(AuthContext)
    
    useEffect(()=>{
       const getRoomId=async ()=>{
        try{
            const room_id=await sendRequest(`http://localhost:5000/JAI_PUBG/${auth.UserId}/ROOM_ID`);
            setId(room_id.RoomID);
            console.log('dp shetty '+room_id.RoomID+' is room id we got');
            }catch(err){}
    
       }
       getRoomId();
    },[auth.UserId,sendRequest]);

    return(
        <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay/>}

        {/* {error && !isLoading && <ErrorModal error={error} onClear={clearError}/>} */}

        {!isLoading && error && <Card className="authentication">
            <h2>Check your Internet..</h2>
            <hr/>
            <Button to='/' exact="true" danger>Back to homepage</Button>
        </Card>}

        {!isLoading && !error && !!id && <Card className="authentication">
            <h2>Join for Room Id {id}</h2>
            <hr/>
            <Button to='/' exact="true" danger>Okay</Button>
        </Card>}

        {!error && !isLoading && !id && <Card className='authentication'>
                <h2>Soon you will get Room Id, Please wait</h2>
                <hr/>
                <Button to='/' exact="true" primary>Okay</Button>
            </Card>}
        </React.Fragment>
    );
}

export default Display;
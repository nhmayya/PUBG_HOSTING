
import React from 'react'
import firebase from './firebase.js';

const Signup=props=>{
const handleClick=()=>{
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    var number = '+917483048528';
    firebase.auth().signInWithPhoneNumber(number,recaptcha).then( function(e) {
      var code = prompt('Enter the otp', '');     
        if(code === null) return;      
        e.confirm(code).then(function (result) {
            console.log(result.user);
            document.querySelector('label').textContent +=   result.user.phoneNumber + "Number verified";  
        }).catch(function (error) {
            console.error( error);
        });
    })
    .catch(function (error) {
        console.error( error);
    });
  }

    return(
        <div>
        <div id="recaptcha"></div>
        <button onClick={handleClick}>Click</button>
      </div>
    )
}

export default Signup;

//firebase phone authentication

// export class App extends Component {
  
//   render() {
//     return (
      
//     )
//   }
// }
// export default App
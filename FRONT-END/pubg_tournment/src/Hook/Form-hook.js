import {useReducer,useCallback} from 'react';

const formValidation=(state,action)=>{
    switch(action.type){
     case 'INPUT_CHANGE':
         let formIsValid=true;
         for(const inputId in state.inputs){
             if(!state.inputs[inputId]){
                 continue
             }
             if(inputId===action.inputId)
             formIsValid=formIsValid && action.isValid;
             else 
             formIsValid=formIsValid && state.inputs[inputId].isValid
         }

         return{
             ...state,
             inputs:{
                 ...state.inputs,
                 [action.inputId]:{value:action.value, isValid:action.isValid}
             },
             isValid:formIsValid
         }; 
    case 'SET_DATA':return{
        inputs:action.input,
        isValid:action.isValid
    } 
     
     default: return state;
    }
} 

export const useForm=(initialInputValues,initialFormValidation)=>{

    const [formstate,dispatch]=useReducer(formValidation,{
        inputs:initialInputValues,
        isValid:initialFormValidation
    });

    const InputHandler=useCallback((id,value,isValid)=>{
        dispatch({type:'INPUT_CHANGE', value:value,inputId:id,isValid:isValid})
},[]);

    const setData=useCallback((inputs,valid)=>{
        dispatch({type:'SET_DATA', input:inputs, isValid:valid})
    },[]) ;

return [formstate,InputHandler,setData];

}
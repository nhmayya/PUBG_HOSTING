import {createContext} from 'react'
export const AuthContext=createContext({isLogedIn:false,
    UserId:null,
    Phone:null,
    Players:[],
    LOGIN:()=>{}
    });